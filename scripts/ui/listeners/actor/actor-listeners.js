import { normalizeText } from "../../../utils/helpers.js";
import { CypherRollWindow } from "../../windows/roll-window.js";
import { actorAbilitiesListeners } from "./actor-abilities.js";
import { actorAdvancementListeners } from "./actor-advancements.js";
import { actorExtrasListeners } from "./actor-extras.js";
import { actorHeaderListeners } from "./actor-header.js";
import { actorInventoryListeners } from "./actor-inventory.js";
import { actorSkillsListeners } from "./actor-skills.js";

export function ActorListeners(sheet, html) {
  actorHeaderListeners(sheet, html);
  actorAdvancementListeners(sheet, html);
  actorAbilitiesListeners(sheet, html);
  actorInventoryListeners(sheet, html);
  actorSkillsListeners(sheet, html);
  actorExtrasListeners(sheet, html);

  // Global Listeners

  html.find("input[type='checkbox'][data-item-id]").on("change", async (ev) => {
    const itemId = ev.currentTarget.dataset.itemId;
    const field = ev.currentTarget.dataset.field;
    const value = ev.currentTarget.checked;

    const item = sheet.actor.items.get(itemId);
    if (!item) return;

    // Route based on item type
    if (item.type === "Special Ability") {
      await item.update({ [`system.ability.${field}`]: value });
    }

    if (item.type === "Skill") {
      await item.update({ [`system.skill.${field}`]: value });
    }

    if (item.type === "Weapon") {
      await item.update({ [`system.weapon.${field}`]: value });
    }

    if (item.type === "Armor") {
      await item.update({ [`system.armor.${field}`]: value });
    }

    if (item.type === "Cypher") {
      await item.update({ [`system.cypher.${field}`]: value });
    }
  });

  html.find(".view-item").on("click", (ev) => {
    ev.preventDefault();

    const itemId = ev.currentTarget.dataset.itemId;
    const item = sheet.actor.items.get(itemId);

    if (!item) {
      ui.notifications.error("Item not found.");
      return;
    }

    item.sheet.render(true);
  });

  html
    .find(".weapon-attack-roll")
    .off("click")
    .on("click", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const item = ev.currentTarget.dataset.item;
      const weapon = sheet.actor.items.get(item);

      await CypherRollWindow(
        sheet.actor,
        `${normalizeText(weapon.system.weapon.attack.pool)} Attack Roll`,
        weapon,
        true,
        false,
        0,
        null
      );

      sheet.render(false);
    });
}
