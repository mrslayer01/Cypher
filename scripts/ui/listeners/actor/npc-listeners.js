import { DEFAULT_CYPHER_DATA, DEFAULT_ITEM_DATA } from "../../../config/default-item-data.js";

export function NpcListeners(sheet, html) {
  const actor = sheet.actor;
  // Cypher
  html.find(".add-cypher-npc").on("click", async (ev) => {
    ev.preventDefault();

    console.log("add");

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
    const cypher = foundry.utils.duplicate(actor.system.core.cyphers ?? []);
    cypher.push(item.id);

    await actor.update({ "system.core.cyphers": cypher });

    ui.notifications.info("Blank cypher added.");

    // Optional: immediately open the cypher sheet
    item.sheet.render(true);
  });

  html.find(".delete-cypher-npc").on("click", async (ev) => {
    ev.preventDefault();

    const itemId = ev.currentTarget.dataset.itemId;

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete Armor",
      content: `<p>Are you sure you want to remove ${actor.items.get(itemId).name}?</p>`
    });

    if (!confirmed) return;

    // Remove from cyphers array
    const cypher = foundry.utils.duplicate(actor.system.core.cyphers ?? []);
    const index = cypher.indexOf(itemId);
    if (index !== -1) cypher.splice(index, 1);

    await actor.update({ "system.core.cyphers": cypher });

    // Delete the actual item
    await actor.deleteEmbeddedDocuments("Item", [itemId]);

    ui.notifications.info("Cypher removed.");
  });

  html.find(".hp-relative-input").on("change", async (ev) => {
    const input = ev.currentTarget;
    const raw = String(input.value).trim();

    // Always pull fresh numeric values from actor
    const current = Number(actor.system.core.combat.health.current) || 0;
    const max = Number(actor.system.core.combat.health.max) || 0;

    // If empty → revert
    if (!raw) {
      input.value = current;
      return;
    }

    // Detect relative input (+5 / -3)
    const isRelative = raw.startsWith("+") || raw.startsWith("-");

    // Convert raw to number safely
    let numeric = Number(raw);

    // If conversion failed → revert
    if (Number.isNaN(numeric)) {
      input.value = current;
      return;
    }

    // Compute new value
    let newValue = isRelative ? current + numeric : numeric;

    // Guard rails: force number type
    newValue = Number(newValue);

    // If still NaN → revert
    if (Number.isNaN(newValue)) {
      input.value = current;
      return;
    }

    // Clamp
    if (newValue < 0) newValue = 0;
    if (newValue > max) newValue = max;

    // Update actor with guaranteed number
    await actor.update({
      "system.core.combat.health.current": Number(newValue)
    });

    // Update field visually
    input.value = newValue;
  });

  html.find(".hp-relative-input").on("focus", (ev) => {
    // Select the entire value when the field is focused
    ev.currentTarget.select();
  });
}
