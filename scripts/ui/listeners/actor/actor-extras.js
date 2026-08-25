import { DEFAULT_CHARACTER_ARC, DEFAULT_ITEM_DATA } from "../../../config/default-item-data.js";

export function actorExtrasListeners(sheet, html) {
  const actor = sheet.actor;
  //#region Weapon
  html.find(".add-arc").on("click", async (ev) => {
    ev.preventDefault();

    // Build item data using your templates
    const itemData = {
      name: "New Arc",
      type: "Character Arc",
      system: {
        ...DEFAULT_ITEM_DATA,
        ...DEFAULT_CHARACTER_ARC
      }
    };

    // Create the item
    const created = await actor.createEmbeddedDocuments("Item", [itemData]);
    const item = created[0];

    // Store the item ID in system.core.skills
    const arcs = foundry.utils.duplicate(actor.system.core.experience.arcs ?? []);
    arcs.push(item.id);

    await actor.update({ "system.core.experience.arcs": arcs });

    ui.notifications.info("Blank arcs added.");

    item.sheet.render(true);
  });

  html.find(".delete-arc").on("click", async (ev) => {
    ev.preventDefault();

    const itemId = ev.currentTarget.dataset.itemId;

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete Arc",
      content: `<p>Are you sure you want to remove ${actor.items.get(itemId).name}?</p>`
    });

    if (!confirmed) return;

    // Remove from specialAbilities array
    const arcs = foundry.utils.duplicate(actor.system.core.experience.arcs ?? []);
    const index = arcs.indexOf(itemId);
    if (index !== -1) arcs.splice(index, 1);

    await actor.update({ "system.core.experience.arcs": arcs });

    // Delete the actual item
    await actor.deleteEmbeddedDocuments("Item", [itemId]);

    ui.notifications.info("Arc removed.");
  });
  //#endregion
}
