import { CypherActor } from "./documents/cypher-actor.js";
import { CypherItem } from "./documents/cypher-item.js";
import { InitalizeAllActorPartials } from "./templates/initialize-actor-partials.js";
import { InitalizeAllItemPartials } from "./templates/initialize-item-partials.js";
import { CypherActorSheet } from "./ui/cypher-actor-sheet.js";
import { CypherItemSheet } from "./ui/cypher-item-sheet.js";
import { loadAllActorHandlerbarsHelpers } from "./ui/handlebars-helpers.js";
import { RegisterGameSettings } from "./utils/game-settings.js";
import { CypherSystemToken, CypherSystemTokenRuler } from "./utils/token-ruler.js";

Hooks.once("init", async function () {
  console.log("Cypher System | Initializing cypher system");
  CONFIG.debug.compatibility = false;

  CONFIG.Actor.documentClass = CypherActor;
  CONFIG.Item.documentClass = CypherItem;

  // Registers
  await RegisterGameSettings();
  loadAllActorHandlerbarsHelpers();
  await InitalizeAllActorPartials();
  InitalizeAllItemPartials();

  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet("cypher", CypherActorSheet, {
    makeDefault: true
  });

  foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
  foundry.documents.collections.Items.registerSheet("cypher", CypherItemSheet, {
    makeDefault: true
  });

  // Token Ruler Override

  // Override token ruler class
  CONFIG.Token.rulerClass = CypherSystemTokenRuler;
  CONFIG.Token.objectClass = CypherSystemToken;

  // Config token movement speed
  let tokenSpeed = CONFIG.Token.movement.defaultSpeed;
  let factor = game.settings.get("cypher", "tokenSpeed");
  CONFIG.Token.movement.defaultSpeed = tokenSpeed * factor;
});
