import { RegisterItemSheetListeners, RegisterSheetListeners } from "./listeners.js";

export class CypherActorSheet extends foundry.appv1.sheets.ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["cypher-character-sheet", "cypher", "sheet", "actor"],
      template: "systems/cypher/templates/actor/character-sheet.hbs",
      width: 915,
      height: 930,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "main"
        }
      ],
      dragDrop: [
        {
          dragSelector: ".item",
          dropSelector: "[data-table]"
        }
      ]
    });
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Global Listeners
    html.find("input.no-negative").on("change", (ev) => {
      const input = ev.currentTarget;
      const value = Number(input.value);

      if (value < 0) {
        input.value = 0;
      }
    });

    html.find("input[type='number']").on("change", (ev) => {
      const input = ev.currentTarget;

      // Raw value from the field
      const raw = input.value;

      // Convert to number
      const numeric = Number(raw);

      // If empty, null, undefined, or NaN → force to 0
      if (raw === "" || Number.isNaN(numeric)) {
        input.value = 0;
      }
    });

    RegisterSheetListeners(this, html);
  }

  async _onDropItem(event, data) {
    const item = await Item.fromDropData(data);
    if (!item) return;

    const dropArea = event.target.closest("[data-table]");
    if (!dropArea) return;

    const tableName = dropArea.dataset.table;

    const allowed = {
      weapons: ["Weapon"],
      armor: ["Armor"],
      skills: ["Skill"],
      cyphers: ["Cypher"],
      equipment: ["Equipment"]
    };

    const allowedTypes = allowed[tableName];
    if (!allowedTypes || !allowedTypes.includes(item.type)) {
      return ui.notifications.warn(`That item cannot go in the ${tableName} table.`);
    }

    // Create the item on the actor
    const created = await this.actor.createEmbeddedDocuments("Item", [item.toObject()]);
    const newItem = created[0];

    // Now update the correct tracking array
    switch (tableName) {
      case "equipment": {
        const list = foundry.utils.duplicate(this.actor.system.core.equipment.basic ?? []);
        list.push(newItem.id);
        await this.actor.update({ "system.core.equipment.basic": list });
        break;
      }

      case "weapons": {
        const list = foundry.utils.duplicate(this.actor.system.core.equipment.weapons ?? []);
        list.push(newItem.id);
        await this.actor.update({ "system.core.equipment.weapons": list });
        break;
      }

      case "armor": {
        const list = foundry.utils.duplicate(this.actor.system.core.equipment.armor ?? []);
        list.push(newItem.id);
        await this.actor.update({ "system.core.equipment.armor": list });
        break;
      }

      case "cyphers": {
        const list = foundry.utils.duplicate(this.actor.system.core.cyphers.list ?? []);
        list.push(newItem.id);
        await this.actor.update({ "system.core.cyphers.list": list });
        break;
      }

      case "skills": {
        const list = foundry.utils.duplicate(this.actor.system.core.skills ?? []);
        list.push(newItem.id);
        await this.actor.update({ "system.core.skills": list });
        break;
      }
    }

    return newItem;
  }

  getData(options) {
    const data = super.getData(options);
    data.system = this.actor.system;

    data.isGM = game.user.isGM;

    data.specialAbilities = this.actor.system.core.specialAbilities.map((id) => {
      return this.actor.items.get(id);
    });

    data.equipment = this.actor.system.core.equipment.basic.map((id) => {
      return this.actor.items.get(id);
    });
    data.armor = this.actor.system.core.equipment.armor.map((id) => {
      return this.actor.items.get(id);
    });
    data.weapon = this.actor.system.core.equipment.weapons.map((id) => {
      return this.actor.items.get(id);
    });

    data.cyphers = this.actor.system.core.cyphers.list.map((id) => {
      return this.actor.items.get(id);
    });
    data.skills = this.actor.system.core.skills.map((id) => {
      return this.actor.items.get(id);
    });

    return data;
  }
}
