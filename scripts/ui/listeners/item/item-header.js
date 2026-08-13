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
