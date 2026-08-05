export class CypherItemSheet extends foundry.appv1.sheets.ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["cypher-item-sheet", "cypher", "sheet", "item"],
      template: "systems/cypher/templates/item/item-sheet.hbs",
      width: 650,
      height: "auto"
    });
  }
}
