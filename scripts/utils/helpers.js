export function normalizeText(text) {
  if (!text || typeof text !== "string") return "";

  // Trim and collapse whitespace
  let cleaned = text.trim().replace(/\s+/g, " ");

  // Lowercase everything first
  cleaned = cleaned.toLowerCase();

  // Capitalize standalone "i"
  cleaned = cleaned.replace(/\bi\b/g, "I");

  // Capitalize the first letter of each sentence
  cleaned = cleaned.replace(/(^\s*[a-z])|([.!?]\s*[a-z])/g, (match) => {
    return match.toUpperCase();
  });

  return cleaned;
}

export async function FullRest(actor) {
  // Reset Pools to their max values
  const poolNames = Object.keys(actor.system.core.pools);

  for (const pool of poolNames) {
    await ResetPool(actor, pool);
  }

  // Reset Recovery uses to false.
  await ResetAllRecoveryUses(actor);

  // Reset Damage Track
  await ResetDamageTrack(actor);
}

export async function ResetPool(actor, pool) {
  // Get the max value
  const maximum = actor.system.core.pools[pool].max;

  // Set the current value to the maximum value.
  return actor.update({
    [`system.core.pools.${pool}.current`]: maximum
  });
}

export async function ModifyPool(actor, pool, amt) {
  // Get the current value
  const current = Number(actor.system.core.pools[pool].current);

  const newTotal = current - amt;

  // Set the current value to the the new total.
  return actor.update({
    [`system.core.pools.${pool}.current`]: newTotal
  });
}

export async function ResetAllRecoveryUses(actor) {
  // Get the list of all recoverery uses
  const recoveryUses = Object.keys(actor.system.core.recovery.uses);

  for (const use of recoveryUses) {
    ResetRecoveryUse(actor, use);
  }
}

async function ResetRecoveryUse(actor, use) {
  return actor.update({
    [`system.core.recovery.uses.${use}`]: false
  });
}

export async function ResetDamageTrack(actor) {
  await actor.update({
    "system.core.damageTrack": "hale"
  });
}

export async function spendMiscXP(actor, amount) {
  const exp = actor.system.core.experience;

  const newSpent = (exp.miscSpent ?? 0) + amount;

  if (newSpent < 0) {
    ui.notifications.error("XP amount cannot be negative.");
    return false;
  }

  if (newSpent > exp.total) {
    ui.notifications.error("Not enough XP.");
    return false;
  }

  await actor.update({
    "system.core.experience.miscSpent": newSpent
  });

  return true;
}

export function GetTaskDifficulty(difficulty) {
  let difficultyDesc = "";

  switch (difficulty) {
    case 0:
      difficultyDesc = "Routine";
      break;
    case 1:
      difficultyDesc = "Simple (Target: 3)";
      break;
    case 2:
      difficultyDesc = "Standard (Target: 6)";
      break;
    case 3:
      difficultyDesc = "Demanding (Target: 9)";
      break;
    case 4:
      difficultyDesc = "Difficult (Target: 12)";
      break;
    case 5:
      difficultyDesc = "Challenging (Target: 15)";
      break;
    case 6:
      difficultyDesc = "Intimidating (Target: 18)";
      break;
    case 7:
      difficultyDesc = "Formidable (Target: 21)";
      break;
    case 8:
      difficultyDesc = "Heroic (Target: 24)";
      break;
    case 9:
      difficultyDesc = "Immortal (Target: 27)";
      break;
    case 10:
      difficultyDesc = "Impossible (Target: 30)";
      break;
  }

  return difficultyDesc;
}

export function GetWeaponSkillValue(skill) {
  let weaponSkillValue = 0;

  switch (skill) {
    case "Practiced":
      weaponSkillValue = 0;
      break;
    case "Trained":
      weaponSkillValue = 1;
      break;
    case "Specialized":
      weaponSkillValue = 2;
      break;
    case "Inability":
      weaponSkillValue = -1;
      break;
  }

  return weaponSkillValue;
}

export function getArmorValueFromType(type) {
  switch (type) {
    case "Light":
      return 1;
    case "Medium":
      return 2;
    case "Heavy":
      return 3;
    default:
      return 0;
  }
}

export function getWeaponDamageFromType(type) {
  switch (type) {
    case "Light":
      return 2;
    case "Medium":
      return 4;
    case "Heavy":
      return 6;
  }
}
