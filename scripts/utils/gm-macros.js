//#region Controls
export function fullRestControl(controls) {
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

export function rollDifficultyControl(controls) {
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

export function proposeGMIControl(controls) {
  controls.tokens.tools.proposeGMI = {
    name: "proposeGMI",
    title: "Propose Intrusion",
    icon: "fas fa-bolt",
    onChange: (event, active) => {
      openGMIntrusionDialog();
    },
    button: true
  };
}

export function characterXPControl(controls) {
  controls.tokens.tools.xp = {
    name: "xp",
    title: "Character XP",
    icon: "fas fa-award",
    onChange: (event, active) => {
      openAwardXPDialog();
    },
    button: true
  };
}

export function setGMIRangeControl(controls) {
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

//#endregion

//#region XP
function openAwardXPDialog() {
  const actors = game.actors.filter((a) => a.type === "Character" && a.isOwner);

  if (!actors.length) {
    ui.notifications.warn("No player characters found.");
    return;
  }

  const actorOptions = actors.map((a) => `<option value="${a.id}">${a.name}</option>`).join("");

  new Dialog({
    title: "XP Manager",
    content: `
      <style>
        .xp-tabs { display: flex; margin-bottom: 10px; }
        .xp-tab { flex: 1; padding: 6px; text-align: center; cursor: pointer; border: 1px solid #666; }
        .xp-tab.active { background: #444; color: white; }
        .xp-pane { display: none; }
        .xp-pane.active { display: block; }
      </style>

      <div class="xp-tabs">
        <div class="xp-tab active" data-tab="award">Award XP</div>
        <div class="xp-tab" data-tab="manage">Manage XP</div>
      </div>

      <!-- Award XP Pane -->
      <div class="xp-pane active" id="xp-pane-award">
        <div class="form-group">
          <label>XP Amount</label>
          <input type="number" id="xp-amount" value="1" min="1" style="width:100%;">
        </div>

        <div class="form-group">
          <label>Target</label>
          <select id="xp-target" style="width:100%;">
            <option value="all">All Characters</option>
            ${actorOptions}
          </select>
        </div>
      </div>

      <!-- Manage XP Pane -->
      <div class="xp-pane" id="xp-pane-manage">
        <div class="form-group">
          <label>Character</label>
          <select id="xp-manage-target" style="width:100%;">
            ${actorOptions}
          </select>
        </div>

        <div id="xp-manage-fields"></div>
      </div>
    `,
    buttons: {
      save: {
        label: "Apply",
        callback: async (html) => {
          const activeTab = html.find(".xp-tab.active").data("tab");

          if (activeTab === "award") {
            await handleAwardXP(html, actors);
          } else {
            await handleManageXP(html);
          }
        }
      },
      cancel: { label: "Cancel" }
    },
    default: "save",
    render: (html) => {
      setupXPTabs(html);
      autoExpandDialog(ui.activeWindow, html);
      html.find("#xp-manage-target").change(() => {
        loadManageXPFields(html);
        autoExpandDialog(ui.activeWindow, html);
      });
    }
  }).render(true);
}

function setupXPTabs(html) {
  html.find(".xp-tab").click((ev) => {
    const tab = ev.currentTarget.dataset.tab;

    html.find(".xp-tab").removeClass("active");
    html.find(ev.currentTarget).addClass("active");

    html.find(".xp-pane").removeClass("active");
    html.find(`#xp-pane-${tab}`).addClass("active");

    if (tab === "manage") {
      loadManageXPFields(html);
    }

    autoExpandDialog(ui.activeWindow, html);
  });
}

async function handleAwardXP(html, actors) {
  const amount = Number(html.find("#xp-amount").val());
  const target = html.find("#xp-target").val();

  if (amount <= 0) {
    ui.notifications.error("XP amount must be greater than zero.");
    return;
  }

  if (target === "all") {
    for (const actor of actors) {
      const currentTotal = actor.system.core.experience.total || 0;
      await actor.update({ "system.core.experience.total": currentTotal + amount });
    }
    ui.notifications.info(`Awarded ${amount} XP to ALL characters.`);
    return;
  }

  const actor = game.actors.get(target);
  if (!actor) {
    ui.notifications.error("Actor not found.");
    return;
  }

  const currentTotal = actor.system.core.experience.total || 0;
  await actor.update({ "system.core.experience.total": currentTotal + amount });

  ui.notifications.info(`Awarded ${amount} XP to ${actor.name}.`);
}

function loadManageXPFields(html) {
  const actorId = html.find("#xp-manage-target").val();
  const actor = game.actors.get(actorId);
  const exp = actor.system.core.experience;

  html.find("#xp-manage-fields").html(`
    <div class="form-group">
      <label>Total XP</label>
      <input type="number" id="xp-total" value="${exp.total}" min="0" style="width:100%;">
    </div>

    <div class="form-group">
      <label>Misc Spent XP</label>
      <input type="number" id="xp-misc" value="${exp.miscSpent || 0}" min="0" style="width:100%;">
    </div>

    <div class="form-group">
      <label>Advancement XP Spent</label>
      <input type="number" id="xp-adv" value="${exp.spentAdvancements}" min="0" disabled style="width:100%;">
    </div>

    <div class="form-group">
      <label>Remaining XP</label>
      <input type="number" id="xp-remaining" value="${exp.remaining}" disabled style="width:100%;">
    </div>

    <div class="form-group">
      <label>XP Tooltip</label>
      <textarea id="xp-tooltip" style="width:100%; height:80px;" disabled>${exp.tooltip}</textarea>
    </div>
  `);
}

async function handleManageXP(html) {
  const actorId = html.find("#xp-manage-target").val();
  const actor = game.actors.get(actorId);

  const total = Number(html.find("#xp-total").val());
  const misc = Number(html.find("#xp-misc").val());

  await actor.update({
    "system.core.experience.total": total,
    "system.core.experience.miscSpent": misc
  });

  ui.notifications.info(`XP updated for ${actor.name}.`);
}
//#endregion

function openGMIntrusionDialog() {
  const actors = game.actors.filter((a) => a.type === "Character" && a.isOwner);
  if (!actors.length) {
    ui.notifications.warn("No player characters found.");
    return;
  }

  const actorOptions = actors.map((a) => `<option value="${a.id}">${a.name}</option>`).join("");

  new Dialog({
    title: "GM Intrusion",
    content: `
      <div class="form-group">
        <label>Select the character affected by the intrusion</label>
        <select id="intrusion-target" style="width:100%;">${actorOptions}</select>
      </div>
    `,
    buttons: {
      whisper: {
        label: "Whisper Intrusion",
        callback: async (html) => {
          const actorId = html.find("#intrusion-target").val();
          const actor = game.actors.get(actorId);

          const ownerUser =
            game.users.find((u) => u.character?.id === actor.id) ||
            game.users.find((u) => actor.isOwner && u.active);

          if (!ownerUser) {
            ui.notifications.error("No active user owns this character.");
            return;
          }

          await ChatMessage.create({
            user: game.user.id,
            whisper: [ownerUser.id],
            content: `
              <p><strong>GM Intrusion!</strong></p>
              <p>A complication affects <strong>${actor.name}</strong>.</p>
              <p>Do you accept the intrusion?</p>
              <button class="gm-intrusion-accept">Accept Intrusion (+1 XP)</button>
              <button class="gm-intrusion-refuse">Refuse Intrusion (-1 XP)</button>
            `,
            flags: {
              gmIntrusion: { actorId }
            }
          });
        }
      },
      cancel: { label: "Cancel" }
    },
    default: "whisper"
  }).render(true);
}

function autoExpandDialog(app, html) {
  // Wait for Foundry to finish layout
  setTimeout(() => {
    const activePane = html.find(".xp-pane.active");
    if (!activePane.length) return;

    const height = activePane.outerHeight() + 155; // padding for header/buttons

    app.setPosition({ height });
  }, 10);
}
