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
  }

  getData(options) {
    const data = super.getData(options);
    data.system = this.actor.system;

    // NPC-specific data mapping
    data.isGM = game.user.isGM;

    // NPCs don’t use item tracking arrays like Characters
    data.cyphers = this.actor.items.filter((i) => i.type === "Cypher");
    data.specialAbilities = this.actor.items.filter((i) => i.type === "Special Ability");

    return data;
  }
}
