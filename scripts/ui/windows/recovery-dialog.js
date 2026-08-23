import { normalizeText } from "../../utils/helpers.js";

export async function OpenRecoveryDialog(actor) {
  const pools = actor.system.core.pools;

  const poolOptions = Object.keys(pools)
    .map((p) => `<option value="${p}">${p.toUpperCase()}</option>`)
    .join("");

  new Dialog({
    title: "Recovery Roll",
    content: `
      <div class="recovery-dialog">
        <p>Recovery is 1d6 + tier + recovery bonus.</p>

        <p>Select a pool to recover:</p>
        <select id="recovery-pool">${poolOptions}</select>

        <p>Recovery Bonus (modifier):</p>
        <input id="recovery-mod" type="number" value="${actor.system.core.recovery.modifier}" />

      </div>
    `,
    buttons: {
      roll: {
        label: "Roll",
        callback: async (html) => {
          const poolName = html.find("#recovery-pool").val();
          const tier = Number(actor.system.core.tier || 0);
          const mod = Number(html.find("#recovery-mod").val()) || 0;

          const formula = `1d6 + ${tier} + ${mod}`;
          const roll = new Roll(formula);
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
            flavor: `Recovery Roll applied to <strong>${normalizeText(poolName)}</strong>`
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
