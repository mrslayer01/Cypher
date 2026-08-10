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
