export function actorAdvancementListeners(sheet, html) {
  const actor = sheet.actor;

  html.find(".add-advancement").on("click", async (event) => {
    const currentTier = actor.system.core.tier;
    const xpTotal = actor.system.core.experience.total;
    const advancements = actor.system.core.experience.advancements || [];

    // XP requirement
    if (xpTotal < 4) {
      ui.notifications.warn("You need at least 4 XP to purchase an advancement.");
      return;
    }

    // Advancements bought this tier
    const boughtThisTier = advancements.filter((a) => a.tier === currentTier);

    // Determine which advancement types are available
    const available = {
      increaseCapabilities: !boughtThisTier.some((a) => a.increaseCapabilities?.bought),
      moveTowardPerfection: !boughtThisTier.some((a) => a.moveTowardPerfection?.bought),
      extraEffort: !boughtThisTier.some((a) => a.extraEffort?.bought),
      skillTraining: !boughtThisTier.some((a) => a.skillTraining?.bought),

      // Other Options — each individually purchasable
      otherArmor: !boughtThisTier.some((a) => a.other?.armor?.bought),
      otherRecovery: !boughtThisTier.some((a) => a.other?.recovery?.bought),
      otherAbility: !boughtThisTier.some((a) => a.other?.ability?.bought)
    };

    // If nothing is available
    if (!Object.values(available).some((v) => v === true)) {
      ui.notifications.warn("You have already purchased all advancements for this tier.");
      return;
    }

    // Build dialog HTML
    const dialog = new Dialog({
      title: "Add Advancement",
      content: `
      <div class="form-group">
        <label>Choose Advancement (Costs 4 XP)</label>
        <select id="adv-type" style="width:100%;">
          ${available.increaseCapabilities ? `<option value="increaseCapabilities">Increase Capabilities</option>` : ""}
          ${available.moveTowardPerfection ? `<option value="moveTowardPerfection">Move Toward Perfection</option>` : ""}
          ${available.extraEffort ? `<option value="extraEffort">Extra Effort</option>` : ""}
          ${available.skillTraining ? `<option value="skillTraining">Skill Training</option>` : ""}

          ${available.otherArmor ? `<option value="otherArmor">Reduce Armor Cost</option>` : ""}
          ${available.otherRecovery ? `<option value="otherRecovery">+2 Recovery Rolls</option>` : ""}
          ${available.otherAbility ? `<option value="otherAbility">Gain Type Ability</option>` : ""}
        </select>
      </div>

      <div id="adv-extra-fields"></div>

      <div class="form-group">
        <label>Notes</label>
        <textarea id="adv-notes" rows="3" style="width:100%;"></textarea>
      </div>
    `,
      buttons: {
        add: {
          label: "Purchase",
          button: "add",
          callback: async (html) => {
            const type = html.find("#adv-type").val();
            const notes = html.find("#adv-notes").val();

            const updated = foundry.utils.duplicate(advancements);
            const newAdv = foundry.utils.duplicate(DEFAULT_ADVANCEMENT_DATA);

            newAdv.tier = currentTier;
            newAdv.notes = notes;

            // Mark purchased type
            if (type === "increaseCapabilities") {
              const might = Number(html.find("#pool-might").val());
              const speed = Number(html.find("#pool-speed").val());
              const intellect = Number(html.find("#pool-intellect").val());

              newAdv.increaseCapabilities.bought = true;
              newAdv.increaseCapabilities.allocation = [
                { pool: "might", amount: might },
                { pool: "speed", amount: speed },
                { pool: "intellect", amount: intellect }
              ];
            }

            if (type === "moveTowardPerfection") {
              newAdv.moveTowardPerfection.bought = true;
              newAdv.moveTowardPerfection.pool = html.find("#edge-pool").val();
            }

            if (type === "extraEffort") {
              newAdv.extraEffort.bought = true;
            }

            if (type === "skillTraining") {
              newAdv.skillTraining.bought = true;
              newAdv.skillTraining.skill = html.find("#skill-name").val();
            }

            // Other Options
            if (type === "otherArmor") newAdv.other.armor.bought = true;
            if (type === "otherRecovery") newAdv.other.recovery.bought = true;
            if (type === "otherAbility") newAdv.other.ability.bought = true;

            updated.push(newAdv);

            // Apply Advancement
            await actor.update({
              "system.core.experience.advancements": updated
            });

            // Auto-tier advancement
            const count = updated.filter((a) => a.tier === currentTier).length;
            if (count >= 4) {
              await actor.update({ "system.core.tier": currentTier + 1 });
              ui.notifications.info(`Tier advanced to ${currentTier + 1}!`);
            }
          }
        },
        cancel: { label: "Cancel" }
      },
      default: "add",

      // Dynamic field rendering + inline validation
      render: (html) => {
        const advTypeSelect = html.find("#adv-type");
        const extraFields = html.find("#adv-extra-fields");
        const addButton = html.closest(".dialog").find("button[data-button='add']");

        function validateIncreaseCapabilities() {
          const type = advTypeSelect.val();
          if (type !== "increaseCapabilities") {
            addButton.prop("disabled", false);
            return;
          }

          const might = Number(html.find("#pool-might").val() || 0);
          const speed = Number(html.find("#pool-speed").val() || 0);
          const intellect = Number(html.find("#pool-intellect").val() || 0);

          const total = might + speed + intellect;

          addButton.prop("disabled", total !== 4);
        }

        function renderFields(type) {
          switch (type) {
            case "increaseCapabilities":
              extraFields.html(`
              <div class="form-group">
                <label>Allocate 4 Pool Points</label>
                <div>
                  <label>Might</label><input type="number" id="pool-might" value="0" min="0" max="4">
                  <label>Speed</label><input type="number" id="pool-speed" value="0" min="0" max="4">
                  <label>Intellect</label><input type="number" id="pool-intellect" value="0" min="0" max="4">
                </div>
              </div>
            `);

              html.on(
                "input",
                "#pool-might, #pool-speed, #pool-intellect",
                validateIncreaseCapabilities
              );
              break;

            case "moveTowardPerfection":
              extraFields.html(`
              <div class="form-group">
                <label>Select Edge to Increase</label>
                <select id="edge-pool" style="width:100%;">
                  <option value="might">Might Edge</option>
                  <option value="speed">Speed Edge</option>
                  <option value="intellect">Intellect Edge</option>
                </select>
              </div>
            `);
              addButton.prop("disabled", false);
              break;

            case "skillTraining":
              extraFields.html(`
              <div class="form-group">
                <label>Enter Skill Name</label>
                <input type="text" id="skill-name" placeholder="e.g., Stealth, Persuasion, Geology">
              </div>
            `);
              addButton.prop("disabled", false);
              break;

            case "otherArmor":
            case "otherRecovery":
            case "otherAbility":
              extraFields.html(`<p>This option will be applied automatically.</p>`);
              addButton.prop("disabled", false);
              break;

            default:
              extraFields.html("");
              addButton.prop("disabled", false);
          }
        }

        advTypeSelect.on("change", (ev) => {
          renderFields(ev.target.value);
          validateIncreaseCapabilities();
        });

        renderFields(advTypeSelect.val());
        validateIncreaseCapabilities();
      }
    });

    dialog.render(true);
  });

  html.find(".advancement-row").on("click", async (event) => {
    const index = Number(event.currentTarget.dataset.index);
    const adv = actor.system.core.experience.advancements[index];

    showAdvancementDetails(actor, adv, index);
  });

  html.find(".delete-advancement").on("click", async (event) => {
    event.preventDefault();

    const index = Number(event.currentTarget.dataset.index);

    const advancements = actor.system.core.experience.advancements || [];
    const xpCurrent = actor.system.core.experience.current;

    const adv = advancements[index];
    if (!adv) return ui.notifications.error("Advancement not found.");

    // Build advancement type label for confirmation dialog
    let type = "";
    if (adv.increaseCapabilities.bought) type = "Increase Capabilities";
    if (adv.moveTowardPerfection.bought) type = "Move Toward Perfection";
    if (adv.extraEffort.bought) type = "Extra Effort";
    if (adv.skillTraining.bought) type = "Skill Training";
    if (adv.other?.armor?.bought) type = "Other: Armor Cost Reduction";
    if (adv.other?.recovery?.bought) type = "Other: +2 Recovery Rolls";
    if (adv.other?.ability?.bought) type = "Other: Extra Ability";

    // Confirm deletion
    new Dialog({
      title: "Delete Advancement",
      content: `
      <p>Are you sure you want to delete this advancement?</p>
      <p><strong>${type}</strong> (Tier ${adv.tier})</p>
      <p>This will remove it permanently.</p>
    `,
      buttons: {
        yes: {
          label: "Delete",
          callback: async () => {
            const updated = foundry.utils.duplicate(advancements);

            // Remove advancement
            updated.splice(index, 1);

            await actor.update({
              "system.core.experience.advancements": updated
            });

            ui.notifications.info("Advancement deleted.");
          }
        },
        no: {
          label: "Cancel"
        }
      }
    }).render(true);
  });
}

const DEFAULT_ADVANCEMENT_DATA = {
  tier: 0,
  notes: "",
  increaseCapabilities: {
    description:
      "You gain 4 new points to add to your stat Pools. You can allocate the points among your Pools however you wish.",
    allocation: [{ pool: "", amount: 0 }],
    bought: false
  },
  moveTowardPerfection: {
    description:
      "You add 1 to your Might Edge, your Speed Edge, or your Intellect Edge (your choice).",
    pool: "",
    bought: false
  },
  extraEffort: { description: "Your Effort score increases by 1.", bought: false },
  skillTraining: {
    description:
      "Choose one skill other than attacks or defense, such as climbing, jumping, persuading, sneaking, or history. You become trained in that skill. Training an already trained skill makes it specialized.",
    skill: "",
    bought: false
  },
  other: {
    armor: { bought: false },
    recovery: { bought: false },
    ability: { bought: false }
  }
};

async function showAdvancementDetails(actor, adv, index) {
  // Determine advancement type
  let type = "";
  if (adv.increaseCapabilities.bought) type = "Increase Capabilities";
  if (adv.moveTowardPerfection.bought) type = "Move Toward Perfection";
  if (adv.extraEffort.bought) type = "Extra Effort";
  if (adv.skillTraining.bought) type = "Skill Training";
  if (adv.other.armor.bought) type = "Other: Armor Cost Reduction";
  if (adv.other.recovery.bought) type = "Other: +2 Recovery Rolls";
  if (adv.other.ability.bought) type = "Other: Extra Ability";

  // Build details HTML
  let details = `
    <p><strong>Tier:</strong> ${adv.tier}</p>
    <p><strong>Type:</strong> ${type}</p>
  `;

  // Extra fields based on type
  if (adv.increaseCapabilities.bought) {
    details += `
      <h4>Pool Allocation</h4>
      <ul>
        ${adv.increaseCapabilities.allocation
          .map(
            (a) => `
          <li>${a.pool}: ${a.amount}</li>
        `
          )
          .join("")}
      </ul>
    `;
  }

  if (adv.moveTowardPerfection.bought) {
    details += `
      <h4>Edge Increased</h4>
      <p>${adv.moveTowardPerfection.pool}</p>
    `;
  }

  if (adv.skillTraining.bought) {
    details += `
      <h4>Skill Trained</h4>
      <p>${adv.skillTraining.skill}</p>
    `;
  }

  if (adv.other.armor.bought) {
    details += `
      <h4>Armor Option</h4>
      <p>Reduce Speed cost for wearing armor by 1.</p>
    `;
  }

  if (adv.other.recovery.bought) {
    details += `
      <h4>Recovery Option</h4>
      <p>Add +2 to recovery rolls.</p>
    `;
  }

  if (adv.other.ability.bought) {
    details += `
      <h4>Ability Option</h4>
      <p>Gain a type ability from your tier or lower.</p>
    `;
  }

  // Editable Notes Section
  details += `
    <h4>Notes</h4>
    <textarea id="adv-notes-edit" rows="4" style="width:100%;">${adv.notes ?? ""}</textarea>
  `;

  // Show dialog
  new Dialog({
    title: `Advancement Details`,
    content: `<div>${details}</div>`,
    buttons: {
      save: {
        label: "Save Notes",
        callback: async (html) => {
          const newNotes = html.find("#adv-notes-edit").val();

          // Duplicate advancements array
          const updated = foundry.utils.duplicate(actor.system.core.experience.advancements);

          // Update notes
          updated[index].notes = newNotes;

          // Save to actor
          await actor.update({
            "system.core.experience.advancements": updated
          });

          ui.notifications.info("Advancement notes updated.");
        }
      },
      close: { label: "Close" }
    }
  }).render(true);
}
