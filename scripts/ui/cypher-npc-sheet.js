import { NpcListeners } from "./listeners/actor/npc-listeners.js";

export class CypherNPCSheet extends foundry.appv1.sheets.ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["cypher-character-sheet", "cypher", "sheet", "actor"],
      template: "systems/cypher/templates/actor/npc-sheet.hbs",
      width: 915,
      height: 930,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }

  activateListeners(html) {
    super.activateListeners(html);

    // NPC-specific listeners
    html.find("input[type='number']").on("change", (ev) => {
      const input = ev.currentTarget;
      const raw = input.value;
      const numeric = Number(raw);

      if (raw === "" || Number.isNaN(numeric)) {
        input.value = 0;
      }
    });

    html.find(".view-item").on("click", (ev) => {
      ev.preventDefault();

      const itemId = ev.currentTarget.dataset.itemId;
      const item = this.actor.items.get(itemId);

      if (!item) {
        ui.notifications.error("Item not found.");
        return;
      }

      item.sheet.render(true);
    });

    html.find(".transfer-cypher-npc").on("click", async (ev) => {
      const itemId = ev.currentTarget.dataset.itemId;
      this._transferCypherToPC(itemId);
    });

    NpcListeners(this, html);
  }

  getData(options) {
    const data = super.getData(options);
    data.system = this.actor.system;

    // NPC-specific data mapping
    data.isGM = game.user.isGM;

    data.cyphers = this.actor.system.core.cyphers.map((id) => {
      return this.actor.items.get(id);
    });

    return data;
  }

  async _transferCypherToPC(itemId) {
    const cypherItem = this.actor.items.get(itemId);
    if (!cypherItem) return ui.notifications.error("Cypher not found.");

    // Get all player characters
    const pcs = game.actors.filter((a) => a.type === "Character" && a.isOwner);

    if (pcs.length === 0) {
      return ui.notifications.warn("No player characters available.");
    }

    // Build dialog options
    const options = pcs.map((pc) => `<option value="${pc.id}">${pc.name}</option>`).join("");

    new Dialog({
      title: "Transfer Cypher",
      content: `
      <p>Select a character to receive this cypher:</p>
      <select id="pc-select" style="width:100%;">${options}</select>
    `,
      buttons: {
        transfer: {
          label: "Transfer",
          callback: async (html) => {
            const pcId = html.find("#pc-select").val();
            const pcActor = game.actors.get(pcId);

            if (!pcActor) return ui.notifications.error("Invalid PC selected.");

            await this._moveCypherToActor(cypherItem, pcActor);
          }
        },
        cancel: { label: "Cancel" }
      }
    }).render(true);
  }

  async _moveCypherToActor(cypherItem, pcActor) {
    // 1. Remove from NPC tracking list
    const npcList = foundry.utils.duplicate(this.actor.system.core.cyphers);

    await this.actor.update({ "system.core.cyphers": npcList });

    // 2. Clone item data and force unidentified
    const itemData = cypherItem.toObject();
    itemData.system.cypher.identified = false;

    // 3. Create item on PC
    const created = await pcActor.createEmbeddedDocuments("Item", [itemData]);
    const newItem = created[0];

    // 4. Add to PC tracking list
    const pcList = foundry.utils.duplicate(pcActor.system.core.cyphers.list ?? []);
    pcList.push(newItem.id);

    await pcActor.update({ "system.core.cyphers.list": pcList });

    ui.notifications.info(`Transferred cypher to ${pcActor.name}.`);
  }
}
