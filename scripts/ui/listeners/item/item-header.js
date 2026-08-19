import { getArmorValueFromType } from "../../../utils/helpers.js";

export function ItemHeaderListeners(sheet, html) {
  const item = sheet.item;

  //#region Skill
  html
    .find("input[name='skillLevel']")
    .off("click")
    .on("click", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const choice = ev.currentTarget.dataset.choice;

      await item.update({
        "system.skill.inability.choice": choice === "inability",
        "system.skill.practiced.choice": choice === "practiced",
        "system.skill.trained.choice": choice === "trained",
        "system.skill.specialized.choice": choice === "specialized"
      });

      sheet.render(false);
    });
  //#endregion Skill

  //#region Cypher
  html.find(".cypher-level-roll").click((ev) => {
    ev.preventDefault();
    CypherLevelRollWindow(item);
  });

  html.find(".cypher-depletion-roll").click((ev) => {
    ev.preventDefault();
    ArtifactDepletionRollWindow(item);
  });

  html
    .find(".gm-identify-cypher")
    .off("click")
    .on("click", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const identified = item.system.cypher.identified;

      await item.update({
        "system.cypher.identified": !identified
      });

      sheet.render(false);
    });

  //#endregion

  //#region Armor
  html
    .find(".armor-type")
    .off("change")
    .on("change", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const armorType = getArmorValueFromType(ev.currentTarget.value);

      await item.update({
        "system.armor.type": ev.currentTarget.value,
        "system.armor.armor.base": armorType
      });

      sheet.render(false);
    });
  //#endregion
}

async function CypherLevelRollWindow(item) {
  const level = item.system.cypher.level;

  new Dialog({
    title: `Roll Level (${item.name})`,
    content: `
      <div class="cypher-level-roll-window">
        <label><b>Level Dice</b></label>
        <input type="text" value="1d6" disabled style="width: 100%;" />

        <label><b>Modifier</b></label>
        <input type="number" id="level-mod" value="${level.diceMod}" style="width: 100%;" />
      </div>
    `,
    buttons: {
      roll: {
        label: "Roll Level",
        callback: async (html) => {
          const mod = Number(html.find("#level-mod").val());

          // Roll 1d6 + mod
          const roll = new Roll(`1d6 + ${mod}`);
          await roll.evaluate();

          const result = roll.total;

          // Update item level.current and diceMod
          await item.update({
            "system.cypher.level.current": result,
            "system.cypher.level.diceMod": mod
          });

          // Output to chat
          roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: item.actor }),
            flavor: `
              <b>${item.name} Level Roll</b><br>
              <b>Dice:</b> 1d6<br>
              <b>Modifier:</b> ${mod}<br>
              <b>Final Level:</b> ${result}
            `
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

async function ArtifactDepletionRollWindow(item) {
  const depletion = item.system.cypher.depletion;

  if (item.system.cypher.type !== "Artifact") {
    ui.notifications.warn("Only Artifacts have depletion rolls.");
    return;
  }

  new Dialog({
    title: `Depletion Roll (${item.name})`,
    content: `
      <div class="cypher-level-roll-window">

        <label><b>Depletion Range</b></label>
        <input type="number" id="depletion-amount" value="${depletion.amount}" style="width: 100%;" />

        <label><b>Depletion Dice</b></label>
        <select id="depletion-dice" style="width: 100%;">
          <option value="1d6"   ${depletion.dice === "1d6" ? "selected" : ""}>1d6</option>
          <option value="1d10"  ${depletion.dice === "1d10" ? "selected" : ""}>1d10</option>
          <option value="1d20"  ${depletion.dice === "1d20" ? "selected" : ""}>1d20</option>
          <option value="1d100" ${depletion.dice === "1d100" ? "selected" : ""}>1d100</option>
        </select>

        <label><b>Modifier</b></label>
        <input type="number" id="depletion-mod" value="${depletion.diceMod}" style="width: 100%;" />

      </div>
    `,
    buttons: {
      roll: {
        label: "Roll Depletion",
        callback: async (html) => {
          // Read updated values from popup
          const amount = Number(html.find("#depletion-amount").val());
          const dice = html.find("#depletion-dice").val();
          const mod = Number(html.find("#depletion-mod").val());

          // Update item BEFORE rolling
          await item.update({
            "system.cypher.depletion.amount": amount,
            "system.cypher.depletion.dice": dice,
            "system.cypher.depletion.diceMod": mod
          });

          // Build roll formula
          const formula = `${dice} + ${mod}`;
          const roll = new Roll(formula);
          await roll.evaluate();

          const result = roll.total;

          // Determine depletion
          const isDepleted = result <= amount;

          // Update item depletion state
          await item.update({
            "system.cypher.depleted": isDepleted
          });

          // Chat output
          roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: item.actor }),
            flavor: `
              <b>${item.name} Depletion Roll</b><br>
              <b>Roll:</b> ${formula}<br>
              <b>Result:</b> ${result}<br>
              <b>Depletion Range:</b> 1–${amount}<br>
              <b>Status:</b> ${
                isDepleted
                  ? "<span style='color:red;'>Depleted</span>"
                  : "<span style='color:lightgreen;'>Safe</span>"
              }
            `
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
