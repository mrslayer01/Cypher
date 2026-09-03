import {
  GetTaskDifficulty,
  GetWeaponSkillValue,
  ModifyPool,
  normalizeText
} from "../../utils/helpers.js";
import { cypherRoll } from "./roll-window.js";

export class RollWindow extends Application {
  constructor(actor, options = {}) {
    super(options);

    // Store the actor reference
    this.actor = actor;

    // Store roll options
    this.rollLabel = options.rollLabel ?? "Task Roll";
    this.weapon = options.weapon ?? null;
    this.attack = options.attack ?? false;
    this.defend = options.defend ?? false;
    this.armor = options.armor ?? 0;
    this.definedPool = options.definedPool ?? null;
    this.initiative = options.initiative ?? false;
    this.initiativeTN = options.initiativeTN ?? null;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "roll-window",
      title: "Roll Window",
      template: "systems/cypher/templates/actor/apps/roll-window.hbs",
      width: 600,
      height: "auto",
      resizable: true
    });
  }

  /** Data passed to the template */
  getData() {
    return {
      actor: this.actor,
      rollLabel: this.rollLabel,
      weapon: this.weapon,
      attack: this.attack,
      defend: this.defend,
      armor: this.armor,
      definedPool: this.definedPool,
      initiative: this.initiative,
      initiativeTN: this.initiativeTN,
      showSkill: this.shouldShowSkillField(),
      gmIntrusionRange: this.getGMIntrusionRange()
    };
  }

  /** Attach listeners after render */
  activateListeners(html) {
    super.activateListeners(html);

    html.find("#effort").on("focus", (ev) => {
      ev.target.dataset.previous = ev.target.value;
    });

    html.find("#assets").on("focus", (ev) => {
      ev.target.dataset.previous = ev.target.value;
    });

    html.find("#assets").on("change", (ev) => {
      const input = ev.target;
      const value = Number(input.value);

      if (!this.assetInputValidator(value)) {
        ui.notifications.warn("Assets cannot exceed 2.");
        input.value = input.dataset.previous; // revert
        return;
      }

      this.updateDifficulty(html);
    });

    html.find("#effort").on("change", (ev) => {
      const input = ev.target;
      const value = Number(input.value);

      if (!this.effortInputValidator(value)) {
        ui.notifications.warn("Effort cannot exceed your current Effort pool.");
        input.value = input.dataset.previous; // revert
        return;
      }

      this.updateDifficulty(html);
    });

    html.find("#skill").on("change", () => this.updateDifficulty(html));

    html.find("#difficulty").on("change", () => this.updateDifficulty(html));

    html.find("#roll-button").on("click", (ev) => this._onRoll(ev, html));

    this.updateDifficulty(html);
  }

  /** Roll handler */
  async _onRoll(ev, html) {
    const actor = this.actor;

    const { wepPool, wepDamage, wepType, wepClass, wepSkill } = this.prepareWeaponData();

    const { armorType, armorSkill, hasShield, armorEffortPenalty } = this.prepareArmorData();

    const {
      autoDifficulty,
      autoDifficultyExpanded,
      autoArmor,
      autoDamage,
      autoDamagePool,
      autoDamageIgnoreArmor
    } = this.prepareAutoDifficulty(wepPool);

    const rollPool = this.attack
      ? wepPool
      : (this.definedPool?.toLowerCase() ?? html.find("#pool").val());

    const difficulty = autoDifficulty ?? Number(html.find("#difficulty").val());
    let finalArmor;

    if (this.attack) {
      // NPC target → use autoArmor
      if (autoArmor !== null && autoArmor !== undefined) {
        finalArmor = Number(autoArmor);
      }
      // PC target → use actor's armor
      else if (actor.type === "PC") {
        finalArmor = Number(actor.system.core.combat.armor ?? 0);
      }
      // No target → assume 0 armor
      else {
        finalArmor = 0;
      }
    } else {
      // Defense rolls already use autoArmor or provided armor
      finalArmor = Number(autoArmor ?? this.armor ?? 0);
    }

    const defenceSkill = this.defend
      ? getCurrentDefenceValue(actor, rollPool)
      : this.attack
        ? wepSkill
        : Number(html.find("#skill").val()) || 0;

    const pcEffort = Number(actor.system.core.effort.current);
    const pcEdge = Number(actor.system.core.pools[rollPool].edge.current);
    const pcEffortDamage = actor.system.core.damageTrack.trim().toLowerCase() !== "hale";

    const assets = Math.min(2, Number(html.find("#assets").val()));
    const effort = Math.min(pcEffort, Number(html.find("#effort").val()));

    const baseDamage = this.attack ? Number(html.find("#weaponDamage").val()) || wepDamage : 0;
    const weaponTypeFinal = this.attack
      ? (html.find("#weaponType").val() || wepType).toLowerCase()
      : "";

    let modifiedDifficulty = difficulty;

    if (this.defend && rollPool === "speed" && hasShield) modifiedDifficulty -= 1;
    if (this.attack && weaponTypeFinal === "reaching") modifiedDifficulty += 1;
    if (this.attack && wepClass?.toLowerCase() === "light") modifiedDifficulty -= 1;

    const skillReduction = Math.max(-1, Math.min(defenceSkill, 2));
    const assetReduction = Math.min(assets, 2);
    const totalReduction = skillReduction + assetReduction + effort;

    const finalDifficulty = Math.max(0, modifiedDifficulty - totalReduction);
    const targetNumber = finalDifficulty * 3;

    let effortCost = 0;
    if (effort > 0) {
      effortCost = 3 + (effort - 1) * 2;

      if (rollPool === "speed") {
        effortCost += armorEffortPenalty * effort;
      }

      if (pcEffortDamage) effortCost += 1;

      effortCost -= pcEdge;
      effortCost = Math.max(0, effortCost);
    }

    if (!validatePoolRemaining(actor, effortCost, rollPool)) {
      ui.notifications.warn(
        `Not enough in current pool: ${normalizeText(rollPool)} to apply effort. Effort Cost: ${effortCost}`
      );
      return;
    }

    const autoSuccess = finalDifficulty === 0;

    const result = await cypherRoll({
      label: this.rollLabel,
      difficulty,
      modifiedDifficulty,
      defend: this.defend,
      skill: defenceSkill,
      assets,
      effort,
      rollPool,
      effortCost,
      finalDifficulty,
      targetNumber,
      autoSuccess,
      actor,
      pcEdge,
      attack: this.attack,
      pcEffortDamage,
      finalArmor,
      baseDamage,
      weaponTypeFinal,
      wepClass,
      autoDamage,
      autoDamagePool,
      autoDamageIgnoreArmor,
      autoArmor,
      armorEffortPenalty,
      hasShield,
      armorType,
      armorSkill
    });

    this.close();
  }

  updateDifficulty(html) {
    const { wepPool, wepType, wepClass, wepSkill } = this.prepareWeaponData();
    const { hasShield, armorEffortPenalty } = this.prepareArmorData();
    const { autoDifficulty, autoDifficultyExpanded } = this.prepareAutoDifficulty(wepPool);

    // Lock + update difficulty if autoDifficulty is present
    const difficultyField = html.find("#difficulty");

    // NPC targeted → auto difficulty
    if (autoDifficulty !== null) {
      difficultyField.val(autoDifficulty);
      difficultyField.prop("disabled", true);
    }

    // No NPC targeted → use GM default difficulty
    else {
      const gmDefault = game.settings.get("cypher", "defaultDifficulty") ?? 0;
      if (gmDefault > 0) {
        difficultyField.val(gmDefault);
        difficultyField.prop("disabled", true);
      }
    }

    const rollPool = this.attack
      ? wepPool
      : (this.definedPool?.toLowerCase() ?? html.find("#pool").val());

    const skill = this.defend
      ? getCurrentDefenceValue(this.actor, rollPool)
      : this.attack
        ? wepSkill
        : Number(html.find("#skill").val()) || 0;

    const assets = Number(html.find("#assets").val()) || 0;
    const effort = Number(html.find("#effort").val()) || 0;

    const difficulty = autoDifficulty ?? Number(html.find("#difficulty").val());
    const baseDifficultyText = GetTaskDifficulty(difficulty);

    let modifiedDifficulty = difficulty;

    // Apply modifiers
    if (this.defend && rollPool === "speed" && hasShield) modifiedDifficulty -= 1;
    if (this.attack && (html.find("#weaponType").val() || wepType)?.toLowerCase() === "reaching")
      modifiedDifficulty += 1;
    if (this.attack && wepClass?.toLowerCase() === "light") modifiedDifficulty -= 1;

    const skillReduction = Math.max(-1, Math.min(skill, 2));
    const assetReduction = Math.min(assets, 2);
    const totalReduction = skillReduction + assetReduction + effort;

    const finalDifficulty = Math.max(0, modifiedDifficulty - totalReduction);
    const finalDifficultyText = GetTaskDifficulty(finalDifficulty);
    const targetNumber = finalDifficulty * 3;

    // Update UI
    html.find("#liveDifficulty").html(`
    <b>Live Difficulty:</b> ${finalDifficultyText}<br>
  `);

    html.find("#liveBreakdownContent").html(`
    • Base Difficulty: ${baseDifficultyText}<br>
    ${
      this.attack && (html.find("#weaponType").val() || wepType)?.toLowerCase() === "reaching"
        ? "• Reaching Weapon Hindered: 1 step<br>"
        : ""
    }
    ${this.attack && wepClass?.toLowerCase() === "light" ? "• Light Weapon Eased: 1 step<br>" : ""}
    ${skill >= 0 ? `• Skill Eased: ${skill} step(s)<br>` : `• Skill Hindered: 1 step<br>`}
    ${this.defend && rollPool === "speed" && hasShield ? "• Shield Eased: 1 step<br>" : ""}
    ${assets > 0 ? `• Asset Eased: ${assets} step(s)<br>` : ""}
    ${effort > 0 ? `• Effort Eased: ${effort} step(s)<br>` : ""}
    <b>• Final Difficulty:</b> ${finalDifficultyText}<br>
  `);
    this.autoExpand(html);
  }

  autoExpand(html) {
    setTimeout(() => {
      const appWindow = html.closest(".app")[0]?.parentElement;
      if (!appWindow) return;

      const contentHeight = html.outerHeight();
      const height = contentHeight + 50; // padding for header/buttons

      this.setPosition({ height });
    }, 10);
  }

  //#region Logic Functions

  getGMIntrusionRange() {
    const range = Number(game.settings.get("cypher", "gmIntrusion"));
    let text = "GM Intrusion Range = 1";

    if (range > 1) text = `GM Intrusion Range = 1 - ${range}`;

    return text;
  }

  effortInputValidator(value) {
    // caps field at current effort value
    const actor = this.actor;
    const effort = Number(actor.system.core.effort.current);

    return value <= effort;
  }

  assetInputValidator(value) {
    // caps field at 2

    return value <= 2;
  }

  /* ============================================================
   PREPARATION METHODS
   ============================================================ */

  prepareWeaponData() {
    const weapon = this.weapon;
    if (!weapon) return {};

    const wep = weapon.system.weapon;

    return {
      wepPool: wep.attack.pool.toLowerCase(),
      wepDamage: wep.damage.base + wep.damage.bonus,
      wepType: wep.weaponType,
      wepClass: wep.type,
      wepSkill: GetWeaponSkillValue(wep.attack.skill)
    };
  }

  prepareArmorData() {
    const actor = this.actor;

    let armorType = [];
    let armorSkill = [];
    let hasShield = false;
    let armorEffortPenalty = 0;
    let armorEffortReduction = 0;

    const equippedArmor = actor.items.filter(
      (i) => i.type === "Armor" && i.system.armor?.equipped === true
    );

    for (const item of equippedArmor) {
      const a = item.system.armor;

      if (a.type !== "Shield" && a.type !== "Extra") {
        armorType.push(a.type);
        armorSkill.push(a.skill);
      }

      if (a.type === "Shield") hasShield = true;

      armorEffortReduction += a.effortReduc ?? 0;

      switch (a.type) {
        case "Light":
          armorEffortPenalty += 1;
          break;
        case "Medium":
          armorEffortPenalty += 2;
          break;
        case "Heavy":
          armorEffortPenalty += 3;
          break;
      }

      switch (a.skill) {
        case "Trained":
          armorEffortPenalty -= 1;
          break;
        case "Specialized":
          armorEffortPenalty -= 2;
          break;
        case "Inability":
          armorEffortPenalty += 1;
          break;
      }
    }

    armorEffortPenalty -= armorEffortReduction;

    return {
      armorType,
      armorSkill,
      hasShield,
      armorEffortPenalty
    };
  }

  prepareAutoDifficulty(wepPool) {
    const target = game.user.targets.values().next().value;

    let autoDifficulty = null;
    let autoDifficultyExpanded = null;
    let autoArmor = null;
    let autoDamage = null;
    let autoDamagePool = null;
    let autoDamageIgnoreArmor = null;

    if (!target?.actor) {
      return {
        autoDifficulty: null,
        autoDifficultyExpanded: null,
        autoArmor: null,
        autoDamage: null,
        autoDamagePool: null,
        autoDamageIgnoreArmor: null
      };
    }

    const npc = target.actor;

    // ATTACK MODE
    if (this.attack && npc.type === "NPC") {
      const poolMatchesDefense = wepPool === npc.system.core.combat.defense.pool.toLowerCase();

      autoDifficulty = poolMatchesDefense
        ? npc.system.core.level + npc.system.core.combat.defense.bonus
        : npc.system.core.level;

      autoDifficultyExpanded = GetTaskDifficulty(autoDifficulty);
      autoArmor = npc.system.core.combat.armor;
    }

    // DEFEND MODE
    if (this.defend && npc.type === "NPC") {
      autoDifficulty = npc.system.core.level + npc.system.core.combat.attack.bonus;

      autoDifficultyExpanded = GetTaskDifficulty(autoDifficulty);

      autoDamage = npc.system.core.combat.damage.value;
      autoDamagePool = npc.system.core.combat.damage.pool;
      autoDamageIgnoreArmor = npc.system.core.combat.damage.ignoreArmor;
    }

    return {
      autoDifficulty,
      autoDifficultyExpanded,
      autoArmor,
      autoDamage,
      autoDamagePool,
      autoDamageIgnoreArmor
    };
  }

  shouldShowSkillField() {
    // Hide when defending (skill comes from actor sheet)
    if (this.defend) return false;

    // Hide when attacking with a weapon (skill comes from weapon)
    if (this.attack && this.weapon) return false;

    // Otherwise show it (generic task roll)
    return true;
  }

  //#endregion
}

function validatePoolRemaining(actor, amt, pool) {
  const current = Number(actor.system.core.pools[pool].current);
  return current - amt >= 0;
}

function getCurrentDefenceValue(actor, pool) {
  const skillNames = Object.keys(actor.system.core.pools[pool].defense);
  for (const defense of skillNames) {
    if (actor.system.core.pools[pool].defense[defense].choice) {
      return Number(actor.system.core.pools[pool].defense[defense].value);
    }
  }
  return 0;
}
