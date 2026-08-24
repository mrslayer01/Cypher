import {
  GetTaskDifficulty,
  GetWeaponSkillValue,
  ModifyPool,
  normalizeText
} from "../../utils/helpers.js";

export async function CypherRollWindow(
  actor,
  rollLabel = "Task Roll",
  weapon = null,
  attack = false,
  defend = false,
  armor = 0,
  definedPool = null,
  initiative = false,
  initiativeTN = null
) {
  return new Promise((resolve) => {
    // ------------------------------------------------------------
    // WEAPON DATA
    // ------------------------------------------------------------
    let wepPool = null;
    let wepDamage = null;
    let wepType = null;
    let wepClass = null;
    let wepSkill = null;

    if (weapon) {
      const wep = weapon.system.weapon;
      wepPool = wep.attack.pool.toLowerCase();
      wepDamage = wep.damage.base + wep.damage.bonus;
      wepType = wep.weaponType;
      wepClass = wep.type;
      wepSkill = GetWeaponSkillValue(wep.attack.skill);
    }

    // ------------------------------------------------------------
    // ARMOR DATA
    // ------------------------------------------------------------
    let armorType = null;
    let armorSkill = null;
    let hasShield = false;
    let armorEffortPenalty = 0;
    let armorEffortReduction = 0;

    const equippedArmor = actor.items.filter((i) => i.type === "Armor");

    if (equippedArmor.length > 0) {
      const a = equippedArmor[0].system.armor;
      armorEffortReduction = a.effortReduc;

      armorType = a.type;
      armorSkill = a.skill;
      hasShield = a.shield;

      switch (armorType) {
        case "Light":
          armorEffortPenalty = 1;
          break;
        case "Medium":
          armorEffortPenalty = 2;
          break;
        case "Heavy":
          armorEffortPenalty = 3;
          break;
      }

      switch (armorSkill) {
        case "Practiced":
          armorEffortPenalty += 0;
          break;
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

      armorEffortPenalty -= armorEffortReduction;
    }

    // ------------------------------------------------------------
    // AUTO TARGET NPC VALUES
    // ------------------------------------------------------------
    let autoDifficulty = null;
    let autoDifficultyExpanded = null;
    let autoWeaponSkill = wepSkill || null;
    let autoArmor = null;
    let autoDamage = null;

    const target = game.user.targets.values().next().value;

    if (attack && target?.actor?.type === "NPC") {
      if (wepPool === target.actor.system.core.combat.defense.pool.toLowerCase()) {
        autoDifficulty =
          target.actor.system.core.level + target.actor.system.core.combat.defense.bonus;
      } else {
        autoDifficulty = target.actor.system.core.level;
      }
      autoDifficultyExpanded = GetTaskDifficulty(autoDifficulty);
      autoArmor = target.actor.system.core.combat.armor;
      rollLabel += " - " + target.actor.name;
    }

    if (defend && target?.actor?.type === "NPC") {
      autoDifficulty =
        target.actor.system.core.level + target.actor.system.core.combat.attack.bonus;
      autoDifficultyExpanded = GetTaskDifficulty(autoDifficulty);
      autoDamage = target.actor.system.core.combat.damage;
      rollLabel += " - Defending vs " + target.actor.name;
    }

    const defaultDifficulty = game.settings.get("cypher", "defaultDifficulty");

    // If GM set a default difficulty, override autoDifficulty
    if (defaultDifficulty > 0 && autoDifficulty === null) {
      autoDifficulty = defaultDifficulty;
      console.log(GetTaskDifficulty(autoDifficulty));
      autoDifficultyExpanded = GetTaskDifficulty(autoDifficulty);
    }

    // ------------------------------------------------------------
    // DIALOG HTML
    // ------------------------------------------------------------
    let poolSelector = "";
    if (!attack && !defend && !definedPool) {
      poolSelector = `
        <label><b>Effort Stat Pool</b></label>
        <select id="pool" style="width: 100%;">
          <option value="might">MIGHT</option>
          <option value="speed">SPEED</option>
          <option value="intellect">INTELLECT</option>
        </select>
      `;
    }

    const skillSelector = defend
      ? ""
      : `
      <label><b>Skill Level</b></label>
      <select id="skill" style="width: 100%;">
        <option value="0">Practiced</option>
        <option value="1">Trained (eases 1 step)</option>
        <option value="2">Specialized (eases 2 steps)</option>
        <option value="-1">Inability (hinders 1 step)</option>
      </select>
    `;

    const difficultySelector =
      autoDifficulty !== null
        ? `<label><b>Task Difficulty</b></label>
         <input type="text" id="difficulty" value="${autoDifficultyExpanded}" disabled style="width: 100%;" />`
        : `
         <label><b>Task Difficulty</b></label>
         <select id="difficulty" style="width: 100%;">
           <option value="1">Simple (3)</option>
           <option value="2">Standard (6)</option>
           <option value="3">Demanding (9)</option>
           <option value="4">Difficult (12)</option>
           <option value="5">Challenging (15)</option>
           <option value="6">Intimidating (18)</option>
           <option value="7">Formidable (21)</option>
           <option value="8">Heroic (24)</option>
           <option value="9">Immortal (27)</option>
           <option value="10">Impossible (30)</option>
         </select>
      `;

    const attackFields = attack
      ? `
      <label><b>Target Armor</b></label>
      <input type="number" id="armor" value="${autoArmor ?? armor ?? 0}" min="0" style="width: 100%;" />

      <label><b>Weapon Damage</b></label>
      <input type="number" id="weaponDamage" value="${wepDamage ?? 0}" min="0" style="width: 100%;" />

      ${
        wepType
          ? `<label><b>Weapon Type</b></label>
             <input type="text" id="weaponType" value="${wepType}" disabled style="width: 100%;" />`
          : `<label><b>Weapon Type</b></label>
             <select id="weaponType" style="width: 100%;">
               <option value="">None</option>
               <option value="slashing">Slashing</option>
               <option value="piercing">Piercing</option>
               <option value="crushing">Crushing</option>
               <option value="reaching">Reaching</option>
             </select>`
      }
    `
      : "";

    const gmiRange =
      game.settings.get("cypher", "gmIntrusion") > 1
        ? `<label><b>GM Intrusion Range</b> = 1 - ${game.settings.get("cypher", "gmIntrusion")}</label><br>`
        : `<label><b>GM Intrusion Range</b> = ${game.settings.get("cypher", "gmIntrusion")}</label><br>`;

    const dlg = new Dialog({
      title: rollLabel,
      content: `
        <div class="cypher-roll-window">
          ${gmiRange}
          ${difficultySelector}
          ${skillSelector}
          <label><b>Assets</b> (max 2)</label>
          <input type="number" id="assets" value="0" min="0" max="2" style="width: 100%;" />

          <label><b>Effort</b></label>
          <input type="number" id="effort" value="0" min="0" max="6" style="width: 100%;" />

          ${poolSelector}
          ${attackFields}
        </div>
      `,
      buttons: {
        roll: {
          label: "Roll",
          callback: (html) => {
            let rollPool = attack
              ? wepPool
              : (definedPool?.toLowerCase() ?? html.find("#pool").val());
            const difficulty = autoDifficulty ?? Number(html.find("#difficulty").val());
            const finalArmor = attack
              ? Number(html.find("#armor").val())
              : Number(autoArmor ?? armor ?? 0);

            const defenceSkill = defend
              ? getCurrentDefenceValue(actor, rollPool)
              : Number(html.find("#skill").val());

            const pcEffort = Number(actor.system.core.effort.current);
            const pcEdge = Number(actor.system.core.pools[rollPool].edge.current);
            const pcEffortDamage = actor.system.core.damageTrack.trim().toLowerCase() !== "hale";

            const assets = Math.min(2, Number(html.find("#assets").val()));
            const effort = Math.min(pcEffort, Number(html.find("#effort").val()));

            const baseDamage = attack ? Number(html.find("#weaponDamage").val()) || wepDamage : 0;
            const weaponTypeFinal = attack
              ? (html.find("#weaponType").val() || wepType).toLowerCase()
              : "";

            let modifiedDifficulty = difficulty;

            if (defend && rollPool === "speed" && hasShield) modifiedDifficulty -= 1;
            if (attack && weaponTypeFinal === "reaching") modifiedDifficulty += 1;
            if (attack && wepClass?.toLowerCase() === "light") modifiedDifficulty -= 1;

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

            cypherRoll({
              label: rollLabel,
              difficulty,
              modifiedDifficulty,
              defend,
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
              attack,
              pcEffortDamage,
              finalArmor,
              baseDamage,
              weaponTypeFinal,
              wepClass,
              autoDamage,
              autoArmor,
              armorEffortPenalty,
              hasShield,
              armorType,
              armorSkill
            }).then((rollResult) => resolve(rollResult));
          }
        },
        cancel: { label: "Cancel" }
      },
      default: "roll"
    });

    dlg.render(true);

    if (autoDifficulty !== null) {
      Hooks.once("renderDialog", (app, html) => {
        html.find("#difficulty").val(String(autoDifficultyExpanded));
      });
    }

    if (autoWeaponSkill !== null) {
      Hooks.once("renderDialog", (app, html) => {
        html.find("#skill").val(autoWeaponSkill);
      });
    }
  }); // END PROMISE
} // END CypherRollWindow

async function cypherRoll({
  label,
  difficulty,
  modifiedDifficulty,
  defend,
  skill,
  assets,
  effort,
  rollPool,
  effortCost,
  finalDifficulty,
  targetNumber,
  autoSuccess,
  actor,
  pcEdge,
  attack,
  pcEffortDamage,
  finalArmor,
  baseDamage,
  weaponTypeFinal,
  wepClass,
  autoDamage,
  autoArmor,
  armorEffortPenalty,
  hasShield,
  armorType,
  armorSkill
}) {
  if (autoSuccess) {
    const weaponRules = applyWeaponTypeRules(baseDamage, weaponTypeFinal, finalArmor);
    const effectiveArmor = Math.max(finalArmor - weaponRules.armorIgnore, 0);
    const finalDamage = Math.max(baseDamage + weaponRules.bonus - effectiveArmor, 0);

    await ModifyPool(actor, rollPool, effortCost);

    ChatMessage.create({
      speaker: ChatMessage.getSpeaker(),
      content: `
        <b>${label}</b><br>Difficulty reduced to Routine — automatic success!<br>
        • Base Damage: ${baseDamage}<br>
        • Target Armor: ${effectiveArmor}<br>
        • Final Damage: ${finalDamage}
      `
    });

    return {
      total: 0,
      targetNumber,
      success: true
    };
  }

  const roll = new Roll("1d20");
  await roll.evaluate();
  const total = roll.total;

  const success = total >= targetNumber;
  const effect = getCypherRollEffect(total, attack, pcEffortDamage);

  if (effect.refundEffort) effortCost = 0;

  const baseDif = GetTaskDifficulty(difficulty);
  const finalDif = GetTaskDifficulty(finalDifficulty);

  let effectText = "";
  if (effect.type !== "none") {
    effectText = `<hr><b>Special Roll:</b> ${effect.text}<br>`;
  }

  const difficultyDetails = `
    <details>
      <summary><b>Difficulty Details</b></summary>
      <b>Difficulty Breakdown</b><br>
      • Base Difficulty: ${baseDif}<br>
      ${weaponTypeFinal === "reaching" ? "• Reaching Weapon Hindered: 1 step<br>" : ""}
      ${wepClass?.toLowerCase() === "light" ? "• Light Weapon Eased: 1 step<br>" : ""}
      ${skill >= 0 ? `• Skill Eased: ${skill} step(s)<br>` : `• Skill Hindered: 1 step<br>`}
      ${defend && rollPool === "speed" && hasShield ? "• Shield Eased: 1 step<br>" : ""}
      ${assets > 0 ? `• Asset Eased: ${assets} step(s)<br>` : ""}
      ${effort > 0 ? `• Effort Eased: ${effort} step(s)<br>` : ""}
      ${rollPool === "speed" && armorEffortPenalty > 0 && effort > 0 ? `• Armor Effort Penalty: +${armorEffortPenalty} per level<br>` : ""}
      <b>• Final Difficulty:</b> ${finalDif}<br>
    </details>
  `;

  let finalDamageText = "";
  if (attack && success) {
    const weaponRules = applyWeaponTypeRules(baseDamage, weaponTypeFinal, total, finalArmor);
    const effectiveArmor = Math.max(finalArmor - weaponRules.armorIgnore, 0);
    const finalDamage = Math.max(
      baseDamage + effect.damageBonus + weaponRules.bonus - effectiveArmor,
      0
    );

    finalDamageText = `
      <hr>
      <b>Final Damage:</b> ${finalDamage}<br>
      <details>
        <summary><b>Damage Details</b></summary>
        • Base Damage: ${baseDamage}<br>
        • Special Roll Bonus: ${effect.damageBonus}<br>
        • Weapon Type Bonus: ${weaponRules.bonus}<br>
        • Target Armor: ${finalArmor}<br>
        ${weaponRules.armorIgnore > 0 ? `• Armor Ignored: ${weaponRules.armorIgnore}<br>` : ""}
        • Effective Armor: ${effectiveArmor}<br>
        <b>• Final Damage:</b> ${finalDamage}<br>
      </details>
    `;
  }

  let defenseDamageText = "";
  if (defend && !success) {
    const npcDamage = autoDamage ?? 0;
    const effectiveArmor = Math.max(finalArmor, 0);
    const finalDamage = Math.max(npcDamage - effectiveArmor, 0);

    defenseDamageText = `
      <hr>
      <b>Incoming Damage:</b> ${finalDamage}<br>
      <details>
        <summary><b>Damage Details</b></summary>
        • NPC Base Damage: ${npcDamage}<br>
        • PC Armor: ${finalArmor}<br>
        • Effective Armor: ${effectiveArmor}<br>
        • Armor Type: ${armorType}<br>
        • Armor Skill: ${armorSkill}<br>
        ${hasShield ? `• Shield: ${hasShield}<br>` : ""}
        <b>• Final Damage Taken:</b> ${finalDamage}<br>
      </details>
    `;
  }

  const content = `
    <b>${label}</b><br>
    <hr>
    <b>Original Difficulty:</b> ${baseDif}<br>
    <b>Final Difficulty:</b> ${finalDif}<br>
    ${difficultyDetails}
    <hr>
    <b>Roll:</b> ${total}<br>
    <b>Result:</b> ${success ? `<span style="color:green"><b>Success!</b></span>` : `<span style="color:red"><b>Failure</b></span>`}
    ${effectText}
    ${finalDamageText}
    ${defenseDamageText}
  `;

  roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: content
  });

  await ModifyPool(actor, rollPool, effortCost);

  return {
    total,
    targetNumber,
    success
  };
} // END cypherRoll

function getCypherRollEffect(total, attack, damaged) {
  const gmRange = game.settings.get("cypher", "gmIntrusion");
  if (total <= gmRange) {
    return {
      type: "intrusion",
      text: `<span style="color:red"><b>GM Intrusion!</b></span>`,
      damageBonus: 0,
      refundEffort: false
    };
  }

  if (damaged) {
    if (attack && total >= 17) {
      return {
        type: "bonus",
        text: "Impaired or worse: Damage +1",
        damageBonus: 1,
        refundEffort: false
      };
    }
    return { type: "none", text: "", damageBonus: 0, refundEffort: false };
  }

  switch (total) {
    case 17:
      return {
        type: attack ? "bonus" : "none",
        text: attack ? "Damage +1" : "",
        damageBonus: attack ? 1 : 0,
        refundEffort: false
      };
    case 18:
      return {
        type: attack ? "bonus" : "none",
        text: attack ? "Damage +2" : "",
        damageBonus: attack ? 2 : 0,
        refundEffort: false
      };
    case 19:
      return {
        type: "minor",
        text: attack ? "Minor Effect (or +3 damage)" : "Minor Effect",
        damageBonus: attack ? 3 : 0,
        refundEffort: false
      };
    case 20:
      return {
        type: "major",
        text: attack ? "Major Effect (or +4 damage). Effort cost reduced to 0." : "Major Effect",
        damageBonus: attack ? 4 : 0,
        refundEffort: true
      };
    default:
      return { type: "none", text: "", damageBonus: 0, refundEffort: false };
  }
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

function applyWeaponTypeRules(baseDamage, weaponType, rollTotal, armor) {
  let bonus = 0;
  let armorIgnore = 0;

  switch (weaponType) {
    case "slashing":
      if (armor === 0) bonus += 1;
      break;
    case "piercing":
      if (rollTotal >= 17) bonus += 1;
      break;
    case "crushing":
      armorIgnore = 1;
      break;
  }

  return { bonus, armorIgnore };
}
