import { DEFAULT_ITEM_DATA, DEFAULT_SKILL_DATA } from "../../../config/default-item-data.js";

export function actorSkillsListeners(sheet, html) {
  const actor = sheet.actor;

  html.find(".add-skill").on("click", async (ev) => {
    ev.preventDefault();

    // Build item data using your templates
    const itemData = {
      name: "New Skill",
      type: "Skill",
      system: {
        ...DEFAULT_ITEM_DATA,
        ...DEFAULT_SKILL_DATA
      }
    };

    // Create the item
    const created = await actor.createEmbeddedDocuments("Item", [itemData]);
    const item = created[0];

    // Store the item ID in system.core.skills
    const skills = foundry.utils.duplicate(actor.system.core.skills ?? []);
    skills.push(item.id);

    await actor.update({ "system.core.skills": skills });

    ui.notifications.info("Blank skill added.");

    // Optional: immediately open the skill sheet
    item.sheet.render(true);
  });

  html.find(".delete-skill").on("click", async (ev) => {
    ev.preventDefault();

    const itemId = ev.currentTarget.dataset.itemId;

    console.log(actor.items.get(itemId));

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete Skill",
      content: `<p>Are you sure you want to remove ${actor.items.get(itemId).name}?</p>`
    });

    if (!confirmed) return;

    // Remove from specialAbilities array
    const skills = foundry.utils.duplicate(actor.system.core.skills ?? []);
    const index = skills.indexOf(itemId);
    if (index !== -1) skills.splice(index, 1);

    await actor.update({ "system.core.skills": skills });

    // Delete the actual item
    await actor.deleteEmbeddedDocuments("Item", [itemId]);

    ui.notifications.info("Skill removed.");
  });

  html.find(".view-skill").on("click", (ev) => {
    ev.preventDefault();

    const itemId = ev.currentTarget.dataset.itemId;
    const item = actor.items.get(itemId);

    if (!item) {
      ui.notifications.error("Skill item not found.");
      return;
    }

    item.sheet.render(true);
  });
}
