import { DEFAULT_ABILITY_DATA, DEFAULT_ITEM_DATA } from "../../../config/default-item-data.js";
import { AbilityBrowser } from "../../windows/ability-browser.js";

export function actorAbilitiesListeners(sheet, html) {
  const actor = sheet.actor;

  html.find(".browse-abilities").on("click", async (ev) => {
    ev.preventDefault();
    new AbilityBrowser({ actorId: actor.id }).render(true);
  });

  html.find(".add-blank-ability").on("click", async (ev) => {
    ev.preventDefault();

    // Build item data using your templates
    const itemData = {
      name: "New Ability",
      type: "Special Ability",
      system: {
        ...DEFAULT_ITEM_DATA,
        ...DEFAULT_ABILITY_DATA
      }
    };

    // Create the item
    const created = await actor.createEmbeddedDocuments("Item", [itemData]);
    const item = created[0];

    // Store the item ID in system.core.skills
    const abilities = foundry.utils.duplicate(actor.system.core.specialAbilities ?? []);
    abilities.push(item.id);

    await actor.update({ "system.core.specialAbilities": abilities });

    ui.notifications.info("Blank ability added.");

    // Optional: immediately open the skill sheet
    item.sheet.render(true);
  });

  html.find(".delete-ability").on("click", async (ev) => {
    ev.preventDefault();

    const itemId = ev.currentTarget.dataset.itemId;

    console.log(actor.items.get(itemId));

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete Ability",
      content: `<p>Are you sure you want to remove ${actor.items.get(itemId).name}?</p>`
    });

    if (!confirmed) return;

    // Remove from specialAbilities array
    const abilities = foundry.utils.duplicate(actor.system.core.specialAbilities ?? []);
    const index = abilities.indexOf(itemId);
    if (index !== -1) abilities.splice(index, 1);

    await actor.update({ "system.core.specialAbilities": abilities });

    // Delete the actual item
    await actor.deleteEmbeddedDocuments("Item", [itemId]);

    ui.notifications.info("Ability removed.");
  });
}
