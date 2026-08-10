export async function OpenRecoveryDialog(actor) {
  const pools = actor.system.core.pools;
  const mod = actor.system.core.recovery.modifier;

  const poolOptions = Object.keys(pools)
    .map((p) => `<option value="${p}">${p.toUpperCase()}</option>`)
    .join("");

  new Dialog({
    title: "Recovery Roll",
    content: `
      <div class="recovery-dialog">
        <p>Select a pool to recover:</p>
        <select id="recovery-pool">${poolOptions}</select>

        <p>Roll: <strong>1d6 + ${mod}</strong></p>
      </div>
    `,
    buttons: {
      roll: {
        label: "Roll",
        callback: async (html) => {
          const poolName = html.find("#recovery-pool").val();

          // Modifier MUST be numeric for evaluateSync
          const bonus = Number(actor.system.core.recovery.modifier) || 0;

          // Roll 1d6 + modifier (V14-safe)
          const roll = new Roll(`1d6 + ${bonus}`);
          await roll.evaluate();

          const total = roll.total;

          // Apply recovery
          await applyRecoveryToPool(actor, poolName, total);

          // Mark recovery use
          const nextUse = getNextRecoveryUse(actor);
          if (nextUse) {
            await actor.update({
              [`system.core.recovery.uses.${nextUse}`]: true
            });
          } else {
            ui.notifications.warn("All recovery rolls have been used.");
            return;
          }

          // Chat message
          roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor }),
            flavor: `Recovery Roll applied to <strong>${poolName.toUpperCase()}</strong>`
          });
        }
      },
      cancel: {
        label: "Cancel"
      }
    },
    default: "roll"
  }).render(true);
}

function getNextRecoveryUse(actor) {
  const uses = actor.system.core.recovery.uses;

  const order = ["oneAction", "tenMinutes", "oneHour", "tenHours"];

  for (const key of order) {
    if (!uses[key]) return key;
  }

  return null; // all used
}

function applyRecoveryToPool(actor, poolName, rollTotal) {
  const pool = actor.system.core.pools[poolName];

  const newValue = Math.min(pool.current + rollTotal, pool.max);

  return actor.update({
    [`system.core.pools.${poolName}.current`]: newValue
  });
}
