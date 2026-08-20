import {
  DEFAULT_ARMOR_DATA,
  DEFAULT_CYPHER_DATA,
  DEFAULT_ITEM_DATA,
  DEFAULT_WEAPON_DATA
} from "../../../config/default-item-data.js";

export function actorInventoryListeners(sheet, html) {
  const actor = sheet.actor;

  //#region Equipment
  html.find(".add-equipment").on("click", async (ev) => {
    ev.preventDefault();

    // Build item data using your templates
    const itemData = {
      name: "New Equipment",
      type: "Equipment",
      system: {
        ...DEFAULT_ITEM_DATA
      }
    };

    // Create the item
    const created = await actor.createEmbeddedDocuments("Item", [itemData]);
    const item = created[0];

    // Store the item ID in system.core.skills
    const equipment = foundry.utils.duplicate(actor.system.core.equipment.basic ?? []);
    equipment.push(item.id);

    await actor.update({ "system.core.equipment.basic": equipment });

    ui.notifications.info("Blank weapon added.");

    // Optional: immediately open the weapon sheet
    item.sheet.render(true);
  });

  html.find(".delete-equipment").on("click", async (ev) => {
    ev.preventDefault();

    const itemId = ev.currentTarget.dataset.itemId;

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete Equipment",
      content: `<p>Are you sure you want to remove ${actor.items.get(itemId).name}?</p>`
    });

    if (!confirmed) return;

    // Remove from specialAbilities array
    const equipment = foundry.utils.duplicate(actor.system.core.equipment.basic ?? []);
    const index = equipment.indexOf(itemId);
    if (index !== -1) equipment.splice(index, 1);

    await actor.update({ "system.core.equipment.basic": equipment });

    // Delete the actual item
    await actor.deleteEmbeddedDocuments("Item", [itemId]);

    ui.notifications.info("Equipment removed.");
  });
  //#endregion

  //#region Weapon
  html.find(".add-weapon").on("click", async (ev) => {
    ev.preventDefault();

    // Build item data using your templates
    const itemData = {
      name: "New Weapon",
      type: "Weapon",
      system: {
        ...DEFAULT_ITEM_DATA,
        ...DEFAULT_WEAPON_DATA
      }
    };

    // Create the item
    const created = await actor.createEmbeddedDocuments("Item", [itemData]);
    const item = created[0];

    // Store the item ID in system.core.skills
    const weapons = foundry.utils.duplicate(actor.system.core.equipment.weapons ?? []);
    weapons.push(item.id);

    await actor.update({ "system.core.equipment.weapons": weapons });

    ui.notifications.info("Blank weapon added.");

    // Optional: immediately open the weapon sheet
    item.sheet.render(true);
  });

  html.find(".delete-weapon").on("click", async (ev) => {
    ev.preventDefault();

    const itemId = ev.currentTarget.dataset.itemId;

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete Weapon",
      content: `<p>Are you sure you want to remove ${actor.items.get(itemId).name}?</p>`
    });

    if (!confirmed) return;

    // Remove from specialAbilities array
    const weapons = foundry.utils.duplicate(actor.system.core.equipment.weapons ?? []);
    const index = weapons.indexOf(itemId);
    if (index !== -1) weapons.splice(index, 1);

    await actor.update({ "system.core.equipment.weapons": weapons });

    // Delete the actual item
    await actor.deleteEmbeddedDocuments("Item", [itemId]);

    ui.notifications.info("Weapon removed.");
  });
  //#endregion

  //#region Armor
  html.find(".add-armor").on("click", async (ev) => {
    ev.preventDefault();

    // Build item data using your templates
    const itemData = {
      name: "New Armor",
      type: "Armor",
      system: {
        ...DEFAULT_ITEM_DATA,
        ...DEFAULT_ARMOR_DATA
      }
    };

    // Create the item
    const created = await actor.createEmbeddedDocuments("Item", [itemData]);
    const item = created[0];

    // Store the item ID in system.core.skills
    const armor = foundry.utils.duplicate(actor.system.core.equipment.armor ?? []);
    armor.push(item.id);

    await actor.update({ "system.core.equipment.armor": armor });

    ui.notifications.info("Blank armor added.");

    // Optional: immediately open the armor sheet
    item.sheet.render(true);
  });

  html.find(".delete-armor").on("click", async (ev) => {
    ev.preventDefault();

    const itemId = ev.currentTarget.dataset.itemId;

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete Armor",
      content: `<p>Are you sure you want to remove ${actor.items.get(itemId).name}?</p>`
    });

    if (!confirmed) return;

    // Remove from specialAbilities array
    const armor = foundry.utils.duplicate(actor.system.core.equipment.armor ?? []);
    const index = armor.indexOf(itemId);
    if (index !== -1) armor.splice(index, 1);

    await actor.update({ "system.core.equipment.armor": armor });

    // Delete the actual item
    await actor.deleteEmbeddedDocuments("Item", [itemId]);

    ui.notifications.info("Armor removed.");
  });
  //#endregion

  //#region Cypher
  html.find(".add-cypher").on("click", async (ev) => {
    ev.preventDefault();

    // Build item data using your templates
    const itemData = {
      name: "New Cypher",
      type: "Cypher",
      system: {
        ...DEFAULT_ITEM_DATA,
        ...DEFAULT_CYPHER_DATA
      }
    };

    // Create the item
    const created = await actor.createEmbeddedDocuments("Item", [itemData]);
    const item = created[0];

    // Store the item ID
    const cypher = foundry.utils.duplicate(actor.system.core.cyphers.list ?? []);
    cypher.push(item.id);

    await actor.update({ "system.core.cyphers.list": cypher });

    ui.notifications.info("Blank cypher added.");

    // Optional: immediately open the cypher sheet
    item.sheet.render(true);
  });

  html.find(".delete-cypher").on("click", async (ev) => {
    ev.preventDefault();

    const itemId = ev.currentTarget.dataset.itemId;

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete Cypher",
      content: `<p>Are you sure you want to remove this item?</p>`
    });

    if (!confirmed) return;

    // Remove from specialAbilities array
    const cypher = foundry.utils.duplicate(actor.system.core.cyphers.list ?? []);
    const index = cypher.indexOf(itemId);
    if (index !== -1) cypher.splice(index, 1);

    await actor.update({ "system.core.cyphers.list": cypher });

    // Delete the actual item
    await actor.deleteEmbeddedDocuments("Item", [itemId]);

    ui.notifications.info("Cypher removed.");
  });

  //#endregion
}
