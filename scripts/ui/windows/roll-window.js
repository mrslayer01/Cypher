import { ModifyPool, normalizeText } from "../../utils/helpers.js";

export async function CypherRollWindow(
  actor,
  rollLabel = "Task Roll",
  pool,
  attack = false,
  defend = false
) {
  const poolSelector =
    typeof pool === "string"
      ? "" // no dropdown
      : `
      <label><b>Effort Stat Pool</b></label>
      <select id="pool" style="width: 100%;">
        <option value="might">MIGHT</option>
        <option value="speed">SPEED</option>
        <option value="intellect">INTELLECT</option>
      </select>
    `;

  const skillSelector =
    defend === true
      ? ""
      : `<label><b>Skill Level</b></label>
        <select id="skill" style="width: 100%;">
          <option value="0">None</option>
          <option value="1">Trained (eases 1 step)</option>
          <option value="2">Specialized (eases 2 steps)</option>
          <option value="-1">Inability (hinders 1 step)</option>
        </select>`;

  new Dialog({
    title: rollLabel,
    content: `
      <div class="cypher-roll-window">

        <label><b>Task Difficulty</b></label>
        <select id="difficulty" style="width: 100%;">
          <option value="1">Simple (Target Number: 3)</option>
          <option value="2">Standard (Target Number: 6)</option>
          <option value="3">Demanding (Target Number: 9)</option>
          <option value="4">Difficult (Target Number: 12)</option>
          <option value="5">Challenging (Target Number: 15)</option>
          <option value="6">Intimidating (Target Number: 18)</option>
          <option value="7">Formidable (Target Number: 21)</option>
          <option value="8">Heroic (Target Number: 24)</option>
          <option value="9">Immortal (Target Number: 27)</option>
          <option value="10">Impossible (Target Number: 30)</option>
        </select>

        ${skillSelector}

        <label><b>Assets</b> (max 2)</label>
        <input type="number" id="assets" value="0" min="0" max="2" style="width: 100%;" />

        <label><b>Effort</b></label>
        <input type="number" id="effort" value="0" min="0" max="6" style="width: 100%;" />

        ${poolSelector}

      </div>
    `,
    buttons: {
      roll: {
        label: "Roll",
        callback: (html) => {
          const rollPool = pool || html.find("#pool").val();
          let defenceSkill = 0;

          // Get Defence Skill value if defending
          if (defend) {
            defenceSkill = getCurrentDefenceValue(actor, rollPool);
          } else {
            defenceSkill = Number(html.find("#skill").val());
          }

          // PC Values
          const pcEffort = Number(actor.system.core.effort.current);
          const pcEdge = Number(actor.system.core.pools[rollPool].edge.current);
          const damageTrack = actor.system.core.damageTrack;
          const pcEffortDamage = damageTrack.trim().toLowerCase() !== "hale";

          // Inputs
          const difficulty = Number(html.find("#difficulty").val());
          const skill = defenceSkill;
          const assets = Math.min(2, Number(html.find("#assets").val()));
          const effort = Math.min(pcEffort, Number(html.find("#effort").val()));

          // Step 1: Apply skill (cap 2 steps)
          const skillReduction = Math.max(-1, Math.min(skill, 2)) || 0;

          // Step 2: Apply assets (cap 2 steps)
          const assetReduction = Math.min(assets, 2);

          // Total easing/hindering
          const totalReduction = skillReduction + assetReduction + effort;

          // Final difficulty (cannot go below 0)
          const finalDifficulty = Math.max(0, difficulty - totalReduction);

          // Target number (difficulty × 3)
          const targetNumber = finalDifficulty * 3;

          // Effort cost calculation
          let effortCost = 0;
          if (effort > 0) {
            if (!pcEffortDamage) {
              effortCost = 3 + (effort - 1) * 2 - pcEdge + pcEffortDamage;
            } else {
              effortCost = 3 + (effort - 1) * 2 - pcEdge + 1;
            }
          }

          // Validate the pool has enough to spend from
          if (!validatePoolRemaining(actor, effortCost, rollPool)) {
            ui.notifications.warn(
              "Not enough in current pool: " +
                normalizeText(rollPool) +
                " to apply effort. Effort Cost: " +
                effortCost
            );
            return;
          }

          // Auto success if difficulty reduced to 0
          const autoSuccess = finalDifficulty === 0;

          // Hand off to your roll logic
          cypherRoll({
            label: rollLabel,
            difficulty,
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
            pcEffortDamage
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
async function cypherRoll({
  label,
  difficulty,
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
  pcEffortDamage
}) {
  // Auto success case
  if (autoSuccess) {
    await ModifyPool(actor, rollPool, effortCost);
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker(),
      content: `
        <b>${label}</b><br>
        Difficulty reduced to <b>0</b> — automatic success!
      `
    });
    return;
  }

  // Roll 1d20
  const roll = new Roll("1d20");
  await roll.evaluate();

  const total = roll.total;

  // Success?
  const success = total >= targetNumber;

  // Cypher special roll effects
  const effect = getCypherRollEffect(total, attack, pcEffortDamage);

  // Refund effort on natural 20
  if (effect.refundEffort) {
    effortCost = 0;
  }

  let effectText = "";
  if (effect.type !== "none") {
    effectText = `
    <hr>
    <b>Special Roll:</b> ${effect.text}<br>
  `;
  }

  // Build chat output
  const content = `
  <b>${label}</b><br>
  <hr>
  <b>Original Difficulty:</b> ${difficulty}<br>
  <b>Final Difficulty:</b> ${finalDifficulty}<br>
  <b>Target Number:</b> ${targetNumber}<br>
  <hr>
  <b>Roll:</b> ${total}<br>
  <b>Result:</b> 
    ${
      success
        ? `<span style="color:green"><b>Success!</b></span>`
        : `<span style="color:red"><b>Failure</b></span>`
    }
  ${effectText}
  <hr>
  ${pcEffortDamage && effortCost > 0 ? `<span style="color:red"><b>Damage penalty: 1</b></span><br>` : ``}
  <b>Skill:</b> ${skill} step(s)<br>
  <b>Assets:</b> ${assets} step(s)<br>
  <b>Edge:</b> ${pcEdge} Effort cost reduction<br>
  <b>Effort:</b> ${effort} (Cost: ${effortCost} ${rollPool})<br>
`;

  roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: content
  });

  await ModifyPool(actor, rollPool, effortCost);
}

function getCypherRollEffect(total, attack, damaged) {
  if (total === 1) {
    return {
      type: "intrusion",
      text: `<span style="color:red"><b>GM Intrusion!</b></span>`,
      damageBonus: 0,
      refundEffort: false
    };
  }

  // If character is impaired/damaged, override all special effects
  if (damaged) {
    // Impaired characters ignore minor/major effects
    // Damage rolls of 17+ only give +1 damage
    if (attack && total >= 17) {
      return {
        type: "bonus",
        text: "Impaired or worse: Damage +1",
        damageBonus: 1,
        refundEffort: false
      };
    }

    // Non-damage rolls: no special effects at all
    return {
      type: "none",
      text: "",
      damageBonus: 0,
      refundEffort: false
    };
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
        text: attack ? "Major Effect (or +4 damage)" : "Major Effect",
        damageBonus: attack ? 4 : 0,
        refundEffort: true
      };

    default:
      return {
        type: "none",
        text: "",
        damageBonus: 0,
        refundEffort: false
      };
  }
}

function validatePoolRemaining(actor, amt, pool) {
  const current = Number(actor.system.core.pools[pool].current);

  return current - amt >= 0;
}

function getCurrentDefenceValue(actor, pool) {
  // Reset Pools to their max values
  const skillNames = Object.keys(actor.system.core.pools[pool].defense);

  for (const defense of skillNames) {
    if (actor.system.core.pools[pool].defense[defense].choice) {
      return Number(actor.system.core.pools[pool].defense[defense].value);
    }
  }

  return 0;
}
