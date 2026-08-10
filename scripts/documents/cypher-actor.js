import { DEFAULT_ACTOR_DATA, DEFAULT_NPC_DATA } from "../config/default-actor-data.js";
import { FINAL_RULES, INIT_RULES, MOD_RULES } from "../data/rules/rules.js";

export class CypherActor extends Actor {
  prepareBaseData() {
    super.prepareBaseData();
    const isNew = !this._id;
    if (isNew) this._needsInit = true;

    if (this.type === "Character") {
      foundry.utils.mergeObject(this.system, DEFAULT_ACTOR_DATA, {
        insertKeys: true,
        overwrite: false
      });
    }

    if (this.type === "NPC") {
      foundry.utils.mergeObject(this.system, DEFAULT_NPC_DATA, {
        insertKeys: true,
        overwrite: false
      });
    }
  }

  prepareData() {
    super.prepareData();

    if (!this.system?.core) return;

    // Mark that we need initialization
    if (!this._initialized) {
      this._needsInit = true;
    }
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    if (!this.system?.core) return;

    const system = this.system;

    // Run initialization rules ONCE
    if (this._needsInit) {
      for (const rule of INIT_RULES) {
        rule.Initialize?.(system, this);
        rule.Derived(system, this);
      }

      for (const rule of MOD_RULES) {
        rule.Derived(system);
      }

      for (const rule of FINAL_RULES) {
        rule.Derived(system, this);
      }

      this._needsInit = false;
      this._initialized = true;
      return; // Initialization complete
    }

    // Normal derived pass
    for (const rule of INIT_RULES) {
      rule.Derived(system, this);
    }

    for (const rule of MOD_RULES) {
      rule.Derived(system);
    }

    for (const rule of FINAL_RULES) {
      rule.Derived(system, this);
    }
  }
}
