import { CypherActor } from "./documents/cypher-actor.js";
import { CypherItem } from "./documents/cypher-item.js";
import { InitalizeAllActorPartials } from "./templates/initialize-actor-partials.js";
import { InitalizeAllItemPartials } from "./templates/initialize-item-partials.js";
import { CypherActorSheet } from "./ui/cypher-actor-sheet.js";
import { CypherItemSheet } from "./ui/cypher-item-sheet.js";
import { CypherNPCSheet } from "./ui/cypher-npc-sheet.js";
import { loadAllActorHandlerbarsHelpers } from "./ui/handlebars-helpers.js";
import { CypherCombat } from "./utils/cypher-combat.js";
import { RegisterGameSettings } from "./utils/game-settings.js";
import { OpenAwardXPDialog, OpenGMIntrusionDialog } from "./utils/gm-macros.js";
import { FullRest, spendMiscXP } from "./utils/helpers.js";
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
    types: ["Character"],
    makeDefault: true
  });

  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet("cypher", CypherNPCSheet, {
    types: ["NPC"],
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

  // Override combat system
  CONFIG.Combat.documentClass = CypherCombat;

  game.settings.register("cypher", "defaultDifficulty", {
    name: "Default Roll Difficulty",
    scope: "world",
    config: false,
    type: Number,
    default: 0
  });

  game.settings.register("cypher", "gmIntrusion", {
    name: "Default GM Intrusion Range",
    scope: "world",
    config: false,
    type: Number,
    default: 1
  });

  game.cypher = game.cypher || {};
  game.cypher.FullRest = FullRest;
});

Hooks.on("getSceneControlButtons", (controls) => {
  if (game.user.isGM) {
    controls.tokens.tools.fullRest = {
      name: "fullRest",
      title: "Full Rest All Characters",
      icon: "fas fa-bed",
      onChange: (event, active) => {
        new Dialog({
          title: "Confirm Full Rest",
          content: `<p>Apply a <strong>Full Rest</strong> to all characters?</p>`,
          buttons: {
            yes: {
              label: "Yes, Full Rest All",
              callback: async () => {
                // Perform the full rest
                for (const actor of game.actors.contents) {
                  if (actor.type === "Character") {
                    await game.cypher.FullRest(actor);
                  }
                }

                ui.notifications.info("All characters have taken a full rest.");

                // Chat card (no type field!)
                const content = `
                <div class="cypher-chat-card">
                  <h4>Full Rest Completed</h4>
                  <p>All characters have taken a full rest.</p>
                </div>
              `;

                await ChatMessage.create({
                  user: game.user.id,
                  speaker: { alias: "System" },
                  content
                });
              }
            },
            no: {
              label: "Cancel"
            }
          },
          default: "no"
        }).render(true);
      },
      button: true
    };
  }

  if (game.user.isGM) {
    controls.tokens.tools.rollDifficulty = {
      name: "rollDifficulty",
      title: "Difficulty Control Panel",
      icon: "fa-solid fa-crosshairs-simple",
      onChange: (event, active) => {
        new Dialog({
          title: "Set Default Difficulty",
          content: `
    <label><b>Default Difficulty</b></label>
    <input type="number" id="defaultDifficulty" 
           value="${game.settings.get("cypher", "defaultDifficulty")}" 
           min="0" max="10" style="width:100%;" />`,
          buttons: {
            save: {
              label: "Save",
              callback: (html) => {
                let value = Number(html.find("#defaultDifficulty").val());
                if (value > 10) value = 10;
                game.settings.set("cypher", "defaultDifficulty", value);
                ui.notifications.info(`Default difficulty set to ${value}`);
              }
            },
            cancel: {
              label: "Cancel"
            }
          },
          default: "save"
        }).render(true);
      },
      button: true
    };
  }

  if (game.user.isGM) {
    controls.tokens.tools.proposeGMI = {
      name: "proposeGMI",
      title: "Propose Intrusion",
      icon: "fas fa-bolt",
      onChange: (event, active) => {
        OpenGMIntrusionDialog();
      },
      button: true
    };
  }

  if (game.user.isGM) {
    controls.tokens.tools.xp = {
      name: "xp",
      title: "Character XP",
      icon: "fas fa-award",
      onChange: (event, active) => {
        OpenAwardXPDialog();
      },
      button: true
    };
  }

  if (game.user.isGM) {
    controls.tokens.tools.gmiRange = {
      name: "gmiRange",
      title: "GM Intrusion Range",
      icon: "fas fa-exclamation-triangle",
      onChange: (event, active) => {
        new Dialog({
          title: "Set GM Intrusion Rane",
          content: `
    <label><b>GM Intrusion Range</b></label>
    <input type="number" id="defaultDifficulty" 
           value="${game.settings.get("cypher", "gmIntrusion")}" 
           min="0" max="10" style="width:100%;" />`,
          buttons: {
            save: {
              label: "Save",
              callback: (html) => {
                let value = Number(html.find("#defaultDifficulty").val());
                if (value > 20) value = 20;
                if (value < 1) value = 1;
                game.settings.set("cypher", "gmIntrusion", value);
                ui.notifications.info(`GM Intrusion Range set to ${value}`);
              }
            },
            cancel: {
              label: "Cancel"
            }
          },
          default: "save"
        }).render(true);
      },
      button: true
    };
  }
});

Hooks.once("ready", () => {
  game.socket.on("system.cypher", async (data) => {
    if (!game.user.isGM) return;

    // Delete the intrusion message
    const msg = game.messages.get(data.messageId);
    if (msg) await msg.delete();

    // If skipBonus is set, do not show bonus XP popup
    if (data.skipBonus) return;

    // GM-only bonus XP popup
    const actor = game.actors.get(data.actorId);
    if (!actor) return;

    const others = game.actors.filter((a) => a.type === "Character" && a.id !== actor.id);
    if (!others.length) {
      ui.notifications.warn("No other characters available to receive bonus XP.");
      return;
    }

    const options = others.map((a) => `<option value="${a.id}">${a.name}</option>`).join("");

    new Dialog({
      title: "Award Bonus XP",
      content: `
        <p>${actor.name} must award 1 XP to another character.</p>
        <select id="bonus-target" style="width:100%;">${options}</select>
      `,
      buttons: {
        award: {
          label: "Award XP",
          callback: async (html) => {
            const bonusId = html.find("#bonus-target").val();
            const bonusActor = game.actors.get(bonusId);
            if (!bonusActor) return;

            const total = bonusActor.system.core.experience.total || 0;
            await bonusActor.update({ "system.core.experience.total": total + 1 });

            ui.notifications.info(`${bonusActor.name} receives 1 XP from ${actor.name}.`);
          }
        }
      }
    }).render(true);
  });
});

Hooks.on("renderChatMessageHTML", (message, html) => {
  const flags = message.flags?.gmIntrusion;
  if (!flags) return;

  const actorId = flags.actorId;
  const actor = game.actors.get(actorId);
  if (!actor) return;

  // ACCEPT INTRUSION → +1 XP (earned)
  const acceptBtn = html.querySelector(".gm-intrusion-accept");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", async () => {
      const total = actor.system.core.experience.total ?? 0;

      await actor.update({
        "system.core.experience.total": total + 1
      });

      ui.notifications.info(`${actor.name} accepts the intrusion and gains 1 XP.`);

      // Tell GM to open bonus XP popup + delete message
      game.socket.emit("system.cypher", {
        type: "gmIntrusionBonusXP",
        actorId,
        messageId: message.id
      });
    });
  }

  // REFUSE INTRUSION → -1 XP (spent)
  const refuseBtn = html.querySelector(".gm-intrusion-refuse");
  if (refuseBtn) {
    refuseBtn.addEventListener("click", async () => {
      const success = await spendMiscXP(actor, 1);
      if (!success) return;

      ui.notifications.info(`${actor.name} refuses the intrusion and loses 1 XP.`);

      // Tell GM to delete message but skip bonus popup
      game.socket.emit("system.cypher", {
        type: "gmIntrusionBonusXP",
        actorId,
        messageId: message.id,
        skipBonus: true
      });
    });
  }
});

Hooks.on("renderApplication", () => {
  document.addEventListener("focusin", (ev) => {
    if (ev.target.tagName === "INPUT" && ev.target.type === "number") {
      ev.target.select();
    }
  });
});
