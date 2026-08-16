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

  const spentMisc = exp.spentMisc ?? 0;
  const total = exp.total ?? 0;

  const newSpentMisc = spentMisc + amount;

  // Prevent negative or overspending
  if (newSpentMisc < 0) {
    ui.notifications.error("XP amount cannot be negative.");
    return false;
  }

  if (newSpentMisc > total) {
    ui.notifications.error("Not enough XP.");
    return false;
  }

  await actor.update({
    "system.core.experience.spentMisc": newSpentMisc
  });

  return true;
}
