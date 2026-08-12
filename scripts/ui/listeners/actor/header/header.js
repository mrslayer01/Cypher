import {
  FullRest,
  normalizeText,
  ResetAllRecoveryUses,
  ResetDamageTrack,
  ResetPool
} from "../../../../utils/helpers.js";
import { OpenRecoveryDialog } from "../../../windows/recovery-dialog.js";
import { CypherRollWindow } from "../../../windows/roll-window.js";

export function HeaderListeners(sheet, html) {
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

      await CypherRollWindow(actor, `${normalizeText(pool)} Roll`, pool);

      sheet.render(false);
    });

  html
    .find(".defence-roll")
    .off("click")
    .on("click", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const pool = ev.currentTarget.dataset.pool;

      await CypherRollWindow(actor, `${normalizeText(pool)} Defense Roll`, pool, false, true);

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
}
