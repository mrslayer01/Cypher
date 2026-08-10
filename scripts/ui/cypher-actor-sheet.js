import { RegisterItemSheetListeners, RegisterSheetListeners } from "./listeners.js";

export class CypherActorSheet extends foundry.appv1.sheets.ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["cypher-character-sheet", "cypher", "sheet", "actor"],
      template: "systems/cypher/templates/actor/character-sheet.hbs",
      width: 910,
      height: 930,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "main"
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
    RegisterItemSheetListeners(this, html);
  }

  getData(options) {
    const data = super.getData(options);
    data.system = this.actor.system;

    return data;
  }
}
