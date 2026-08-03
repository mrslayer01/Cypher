export class CypherActorSheet extends foundry.appv1.sheets.ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["cypher-character-sheet", "cypher", "sheet", "actor"],
      template: "systems/cypher/templates/actor/character-sheet.hbs",
      width: 800,
      height: 600
    });
  }
}
