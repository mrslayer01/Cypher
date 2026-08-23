import {
  FullRest,
  normalizeText,
  ResetAllRecoveryUses,
  ResetDamageTrack,
  ResetPool,
  spendMiscXP
} from "../../../utils/helpers.js";
import { OpenRecoveryDialog } from "../../windows/recovery-dialog.js";
import { CypherRollWindow } from "../../windows/roll-window.js";

export function actorHeaderListeners(sheet, html) {
  const actor = sheet.actor;

  //#region Stat Listeners
  html
    .find("input[name='mightDefense']")
    .off("click")
    .on("click", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const choice = ev.currentTarget.dataset.choice; // "inability", "practiced", "trained", "specialized"

      await actor.update({
        "system.core.pools.might.defense.inability.choice": choice === "inability",
        "system.core.pools.might.defense.practiced.choice": choice === "practiced",
        "system.core.pools.might.defense.trained.choice": choice === "trained",
        "system.core.pools.might.defense.specialized.choice": choice === "specialized"
      });

      sheet.render(false);
    });

  html
    .find("input[name='speedDefense']")
    .off("click")
    .on("click", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const choice = ev.currentTarget.dataset.choice; // "inability", "practiced", "trained", "specialized"

      await actor.update({
        "system.core.pools.speed.defense.inability.choice": choice === "inability",
        "system.core.pools.speed.defense.practiced.choice": choice === "practiced",
        "system.core.pools.speed.defense.trained.choice": choice === "trained",
        "system.core.pools.speed.defense.specialized.choice": choice === "specialized"
      });

      sheet.render(false);
    });

  html
    .find("input[name='intellectDefense']")
    .off("click")
    .on("click", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const choice = ev.currentTarget.dataset.choice; // "inability", "practiced", "trained", "specialized"

      await actor.update({
        "system.core.pools.intellect.defense.inability.choice": choice === "inability",
        "system.core.pools.intellect.defense.practiced.choice": choice === "practiced",
        "system.core.pools.intellect.defense.trained.choice": choice === "trained",
        "system.core.pools.intellect.defense.specialized.choice": choice === "specialized"
      });

      sheet.render(false);
    });

  html
    .find(".pool-reset")
    .off("click")
    .on("click", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const pool = ev.currentTarget.dataset.pool;

      const confirmed = await Dialog.confirm({
        title: "Confirm Pool Reset",
        content:
          "<p>Are you sure you want to reset this pool's current value back to it's maximum?</p>"
      });

      if (!confirmed) return;

      await ResetPool(actor, pool);
      //await FullRest(actor); // for testing
      sheet.render(false);
    });

  html
    .find(".stat-roll")
    .off("click")
    .on("click", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const pool = ev.currentTarget.dataset.pool;

      await CypherRollWindow(
        actor,
        `${normalizeText(pool)} Roll`,
        null,
        false,
        false,
        0,
        `${normalizeText(pool)}`
      );

      sheet.render(false);
    });

  html
    .find(".defence-roll")
    .off("click")
    .on("click", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const pool = ev.currentTarget.dataset.pool;
      const armor = ev.currentTarget.dataset.armor;

      await CypherRollWindow(
        actor,
        `${normalizeText(pool)} Defense `,
        null,
        false,
        true,
        armor,
        `${normalizeText(pool)}`
      );

      sheet.render(false);
    });

  //#endregion

  //#region Recovery Listeners

  html
    .find(".recovery-reset")
    .off("click")
    .on("click", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const confirmed = await Dialog.confirm({
        title: "Confirm Recovery Reset",
        content: "<p>Are you sure you want to reset the recovery track?</p>"
      });

      if (!confirmed) return;

      await ResetAllRecoveryUses(actor);
      sheet.render(false);
    });

  html
    .find(".recovery-roll")
    .off("click")
    .on("click", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      OpenRecoveryDialog(actor);
    });

  //#endregion

  //#region Damage Track Listeners

  html.find("input[name='damageTrack']").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.stopImmediatePropagation();

    const value = ev.currentTarget.value;

    await actor.update({
      "system.core.damageTrack": value
    });

    sheet.render(false);
  });

  html
    .find(".damage-reset")
    .off("click")
    .on("click", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const confirmed = await Dialog.confirm({
        title: "Confirm Damage Reset",
        content: "<p>Are you sure you want to reset the damage track back to Hale?</p>"
      });

      if (!confirmed) return;

      await ResetDamageTrack(actor);
      sheet.render(false);
    });

  //#endregion

  html.find(".spend-xp").on("click", () => spendXPDialog(actor));
}

async function spendXPDialog(actor) {
  const exp = actor.system.core.experience;
  const currentXP = exp.current ?? 0;

  const dlg = new Dialog({
    title: "Spend XP",
    content: `
      <div class="form-group">
        <label>Choose XP Spend Type:</label>
        <select id="xp-type" style="width:100%;">
          <option value="reroll">Re-roll and Take Higher (1 XP)</option>
          <option value="intrusion">Player Intrusion (1 XP)</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div id="custom-fields" style="display:none; margin-top:10px;">
        <div class="form-group">
          <label>Description:</label>
          <textarea id="custom-desc" rows="3" style="width:100%;"></textarea>
        </div>

        <div class="form-group">
          <label>XP Amount:</label>
          <input id="custom-amount" type="number" min="0" value="0" style="width:100%;">
        </div>
      </div>
    `,
    buttons: {
      spend: {
        label: "Spend XP",
        callback: async (html) => {
          const type = html.find("#xp-type").val();

          let xpCost = 1;
          let description = "";

          if (type === "custom") {
            xpCost = Number(html.find("#custom-amount").val());
            description = html.find("#custom-desc").val().trim();

            if (xpCost < 0) {
              ui.notifications.error("XP amount cannot be negative.");
              return;
            }
          }

          if (xpCost > currentXP) {
            ui.notifications.error("Not enough XP.");
            return;
          }

          const success = await spendMiscXP(actor, xpCost);
          if (!success) return;

          // Build chat card
          let title = "";
          let body = "";

          if (type === "reroll") {
            title = "XP Spent: Re-roll and Take Higher";
            body = `${actor.name} spends <strong>1 XP</strong> to re-roll and take the higher result.`;
          } else if (type === "intrusion") {
            title = "XP Spent: Player Intrusion";
            body = `${actor.name} spends <strong>1 XP</strong> to trigger a Player Intrusion.`;
          } else {
            title = "XP Spent: Custom";
            body = `
              ${actor.name} spends <strong>${xpCost} XP</strong>.<br>
              <strong>Description:</strong> ${description || "No description provided."}
            `;
          }

          ChatMessage.create({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor }),
            content: `
              <div class="cypher-chat-card xp-spend">
                <p>${body}</p>
              </div>
            `
          });

          ui.notifications.info(`Spent ${xpCost} XP.`);
        }
      },
      cancel: { label: "Cancel" }
    },

    render: (html) => {
      const xpType = html.find("#xp-type");
      const customFields = html.find("#custom-fields");

      xpType.on("change", () => {
        const isCustom = xpType.val() === "custom";
        customFields.toggle(isCustom);

        // Resize dialog
        dlg.setPosition({ height: "auto" });
      });
    }
  });

  dlg.render(true);
}
