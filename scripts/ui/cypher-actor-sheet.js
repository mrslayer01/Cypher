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

    html.find(".trade-cypher").on("click", (ev) => {
      const itemId = ev.currentTarget.dataset.itemId;
      this._tradeCypherToAnotherPC(itemId);
    });

    RegisterSheetListeners(this, html);
  }

  async _tradeCypherToAnotherPC(itemId) {
    const cypherItem = this.actor.items.get(itemId);
    if (!cypherItem) return ui.notifications.error("Cypher not found.");

    // Get all other player characters
    const pcs = game.actors.filter(
      (a) => a.type === "Character" && a.id !== this.actor.id && a.isOwner
    );

    if (!pcs.length) {
      return ui.notifications.warn("No other player characters available.");
    }

    const options = pcs.map((pc) => `<option value="${pc.id}">${pc.name}</option>`).join("");

    new Dialog({
      title: "Trade Cypher",
      content: `
      <p>Select a character to trade this cypher to:</p>
      <select id="pc-select" style="width:100%;">${options}</select>
    `,
      buttons: {
        trade: {
          label: "Trade",
          callback: async (html) => {
            const pcId = html.find("#pc-select").val();
            const pcActor = game.actors.get(pcId);

            if (!pcActor) return ui.notifications.error("Invalid PC selected.");

            await this._moveCypherBetweenPCs(cypherItem, pcActor);
          }
        },
        cancel: { label: "Cancel" }
      }
    }).render(true);
  }

  async _moveCypherBetweenPCs(cypherItem, pcActor) {
    const sourceActor = this.actor;

    // 1. Remove from source PC tracking list
    const sourceList = foundry.utils.duplicate(sourceActor.system.core.cyphers.list ?? []);
    const index = sourceList.indexOf(cypherItem.id);
    if (index !== -1) sourceList.splice(index, 1);

    await sourceActor.update({ "system.core.cyphers.list": sourceList });

    // 2. Clone item data (do NOT change identified status)
    const itemData = cypherItem.toObject();
    itemData.system.cypher.favorite = false;
    itemData.system.cypher.active = false;

    // 3. Create item on target PC
    const created = await pcActor.createEmbeddedDocuments("Item", [itemData]);
    const newItem = created[0];

    // 4. Add to target PC tracking list
    const targetList = foundry.utils.duplicate(pcActor.system.core.cyphers.list ?? []);
    targetList.push(newItem.id);

    await pcActor.update({ "system.core.cyphers.list": targetList });

    // 5. Delete from source PC
    await cypherItem.delete();

    ui.notifications.info(`Cypher traded to ${pcActor.name}.`);
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
      equipment: ["Equipment"],
      arcs: ["Character Arc"]
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

      case "arcs": {
        const list = foundry.utils.duplicate(this.actor.system.core.experience.arcs ?? []);
        list.push(newItem.id);
        await this.actor.update({ "system.core.experience.arcs": list });
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

    data.arcs = this.actor.system.core.experience.arcs.map((id) => {
      return this.actor.items.get(id);
    });

    return data;
  }
}
