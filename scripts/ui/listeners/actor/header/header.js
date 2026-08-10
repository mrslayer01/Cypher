import { FullRest, ResetAllRecoveryUses, ResetPool } from "../../../../utils/helpers.js";
import { OpenRecoveryDialog } from "../../../windows/recovery-dialog.js";

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
        "system.core.pools.might.defense.inability": choice === "inability",
        "system.core.pools.might.defense.practiced": choice === "practiced",
        "system.core.pools.might.defense.trained": choice === "trained",
        "system.core.pools.might.defense.specialized": choice === "specialized"
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
        "system.core.pools.speed.defense.inability": choice === "inability",
        "system.core.pools.speed.defense.practiced": choice === "practiced",
        "system.core.pools.speed.defense.trained": choice === "trained",
        "system.core.pools.speed.defense.specialized": choice === "specialized"
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
        "system.core.pools.intellect.defense.inability": choice === "inability",
        "system.core.pools.intellect.defense.practiced": choice === "practiced",
        "system.core.pools.intellect.defense.trained": choice === "trained",
        "system.core.pools.intellect.defense.specialized": choice === "specialized"
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

      await ResetPool(actor, pool);
      //await FullRest(actor); // for testing
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
}
