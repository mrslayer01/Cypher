import { RegisterItemSheetListeners } from "./listeners.js";

export class CypherItemSheet extends foundry.appv1.sheets.ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["cypher-item-sheet", "cypher", "sheet", "item"],
      template: "systems/cypher/templates/item/item-sheet.hbs",
      width: 700,
      height: "auto",
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

    RegisterItemSheetListeners(this, html);
  }

  getData(options) {
    const data = super.getData(options);
    data.system = this.item.system;

    return data;
  }
}
