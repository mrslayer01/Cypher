import { CYPHER_ABILITIES } from "../../config/abilities.js";
import { DEFAULT_ABILITY_DATA, DEFAULT_ITEM_DATA } from "../../config/default-item-data.js";

export class AbilityBrowser extends Application {
  constructor(options = {}) {
    super(options);
    this.actorId = options.actorId;
    this.filters = {
      name: "",
      tier: "",
      characterType: ""
    };
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "ability-browser",
      title: "Ability Browser",
      template: "systems/cypher/templates/actor/apps/ability-browser.hbs", //templates\actor\apps\ability-browser.hbs
      width: 800,
      height: 1000,
      resizable: true
    });
  }

  getData() {
    const actor = game.actors.get(this.actorId);

    // Get names of abilities the actor already has
    const chosenAbilityNames = actor.items
      .filter((i) => i.type === "Special Ability")
      .map((i) => i.name.toLowerCase());

    // Build ability list from config
    const abilities = Object.entries(CYPHER_ABILITIES).map(([key, ability]) => ({
      id: key,
      ...ability
    }));

    // Apply filters + remove already chosen abilities
    const filtered = abilities.filter((a) => {
      // Skip abilities already chosen
      if (chosenAbilityNames.includes(a.name.toLowerCase())) return false;

      const matchesName =
        !this.filters.name || a.name.toLowerCase().includes(this.filters.name.toLowerCase());

      const matchesTier = !this.filters.tier || a.tier === Number(this.filters.tier);

      const matchesType =
        !this.filters.characterType ||
        a.characterType.toLowerCase() === this.filters.characterType.toLowerCase();

      return matchesName && matchesTier && matchesType;
    });

    return {
      abilities: filtered,
      filters: this.filters
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Filter: name
    html.find("input[name='filter-name']").on("change", (ev) => {
      this.filters.name = ev.target.value;
      this.render();
    });

    // Filter: tier
    html.find("select[name='filter-tier']").on("change", (ev) => {
      this.filters.tier = ev.target.value;
      this.render();
    });

    // Filter: characterType
    html.find("select[name='filter-type']").on("change", (ev) => {
      this.filters.characterType = ev.target.value;
      this.render();
    });

    // Add ability to actor
    html.find(".add-ability").on("click", async (ev) => {
      const abilityId = ev.currentTarget.dataset.id;
      const ability = CYPHER_ABILITIES[abilityId];

      const actor = game.actors.get(this.actorId);

      // Build item data using your templates
      const itemData = {
        name: ability.name,
        type: "Special Ability",
        system: {
          ...DEFAULT_ITEM_DATA,
          ...DEFAULT_ABILITY_DATA,
          ability: {
            tier: ability.tier,
            cost: {
              pool: ability.pool,
              amount: ability.amount
            },
            type: ability.type,
            characterType: ability.characterType,
            canUseEffort: ability.canUseEffort,
            favorite: ability.favorite ?? false,
            active: ability.active ?? false
          },
          itemDescription: ability.description
        }
      };

      // Create the item on the actor
      const createdItem = await actor.createEmbeddedDocuments("Item", [itemData]);

      // Store the item ID in system.core.specialAbilities
      const abilities = foundry.utils.duplicate(actor.system.core.specialAbilities ?? []);
      abilities.push(createdItem[0].id);

      await actor.update({ "system.core.specialAbilities": abilities });

      ui.notifications.info(`Added ability: ${ability.name}`);
      this.render();
    });
  }
}
