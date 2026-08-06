import { RegisterItemSheetListeners, RegisterSheetListeners } from "./listeners.js";

export class CypherActorSheet extends foundry.appv1.sheets.ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["cypher-character-sheet", "cypher", "sheet", "actor"],
      template: "systems/cypher/templates/actor/character-sheet.hbs",
      width: 800,
      height: 600
    });
  }

  activateListeners(html) {
    super.activateListeners(html);

    RegisterSheetListeners(this, html);
    RegisterItemSheetListeners(this, html);
  }

  getData(options) {
    const data = super.getData(options);
    data.system = this.actor.system;

    return data;
  }
}
