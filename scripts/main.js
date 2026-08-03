import { CypherActor } from "./documents/cypher-actor.js";
import { CypherItem } from "./documents/cypher-item.js";
import { InitalizeAllActorPartials } from "./templates/initialize-actor-partials.js";
import { InitalizeAllItemPartials } from "./templates/initialize-item-partials.js";
import { CypherActorSheet } from "./ui/cypher-actor-sheet.js";
import { CypherItemSheet } from "./ui/cypher-item-sheet.js";
import { loadAllActorHandlerbarsHelpers } from "./ui/handlebars-helpers.js";

Hooks.once("init", function () {
  console.log("Cypher System | Initializing cypher system");
  CONFIG.debug.compatibility = false;

  CONFIG.Actor.documentClass = CypherActor;
  CONFIG.Item.documentClass = CypherItem;

  loadAllActorHandlerbarsHelpers();
  InitalizeAllActorPartials();
  InitalizeAllItemPartials();

  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet("cypher", CypherActorSheet, {
    makeDefault: true
  });

  foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
  foundry.documents.collections.Items.registerSheet("cypher", CypherItemSheet, {
    makeDefault: true
  });
});
