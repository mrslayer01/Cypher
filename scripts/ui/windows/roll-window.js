import { GetTaskDifficulty, ModifyPool } from "../../utils/helpers.js";
import { RollWindow } from "./roll.js";

export function CypherRollWindow(actor, rollLabel, weapon, attack, defend, armor, definedPool) {
  const app = new RollWindow(actor, {
    rollLabel,
    weapon,
    attack,
    defend,
    armor,
    definedPool
  });

  app.render(true);
}

export async function cypherRoll({
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
  autoDamagePool,
  autoDamageIgnoreArmor,
  autoArmor,
  armorEffortPenalty,
  hasShield,
  armorType,
  armorSkill
}) {
  if (autoSuccess) {
    const baseDif = GetTaskDifficulty(difficulty);
    const finalDif = GetTaskDifficulty(finalDifficulty);

    const weaponRules = applyWeaponTypeRules(baseDamage, weaponTypeFinal, finalArmor);
    const effectiveArmor = Math.max(finalArmor - weaponRules.armorIgnore, 0);
    const finalDamage = Math.max(baseDamage + weaponRules.bonus - effectiveArmor, 0);

    // Build difficulty breakdown (same as normal roll)
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
      ${
        rollPool === "speed" && armorEffortPenalty > 0 && effort > 0
          ? `• Armor Effort Penalty: +${armorEffortPenalty} per level<br>`
          : ""
      }
      • Final Difficulty: ${finalDif}<br>
    </details>
  `;

    await ModifyPool(actor, rollPool, effortCost);

    const attackDamage = `
      <hr>
      • Base Damage: ${baseDamage}<br>
      • Target Armor: ${effectiveArmor}<br>
      • Final Damage: ${finalDamage}
    `;

    ChatMessage.create({
      speaker: ChatMessage.getSpeaker(),
      content: `
      <b>${label}</b><br>
      <hr>
      <b>Difficulty reduced to Routine — automatic success!</b><br>
      ${difficultyDetails}
      ${attack ? `${attackDamage}` : ""}
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
  console.log(finalDifficulty);
  const finalDif = GetTaskDifficulty(finalDifficulty);

  let effectText = "";
  if (effect.type !== "none" && success) {
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
    const poolDamaged = autoDamagePool ?? "Speed";
    const ignoreArmor = autoDamageIgnoreArmor ?? false;
    const effectiveArmor = getEffectiveArmor(finalArmor, ignoreArmor);
    const finalDamage = Math.max(npcDamage - effectiveArmor, 0);

    defenseDamageText = `
      <hr>
      <b>Incoming Damage:</b> ${finalDamage}<br>
      <details>
        <summary><b>Damage Details</b></summary>
        • NPC Base Damage: ${npcDamage} ${poolDamaged != "None" ? `to pool: ${poolDamaged}` : ""}<br>
        • PC Armor: ${finalArmor}<br>
        • Effective Armor: ${effectiveArmor} ${ignoreArmor ? `- Armor ignored` : ""} <br>
        ${armorType && finalArmor > 0 ? `• Armor Type: ${armorType}<br>` : ""}
        ${armorSkill && finalArmor > 0 ? `• Armor Skill: ${armorSkill}<br>` : ""}
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

function getEffectiveArmor(armor, ignoreArmor) {
  let finalArmor = 0;
  if (!ignoreArmor) {
    finalArmor = Math.max(armor, 0);
  }

  return finalArmor;
}

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
