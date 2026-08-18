import { DEFAULT_ACTOR_DATA, DEFAULT_NPC_DATA } from "../config/default-actor-data.js";
import { DEFAULT_NPC_DESCRIPTIONS } from "../utils/lookup.js";
import { AdvancementDerivedData } from "./derived/actor/advancements.js";
import { EquipmentDerivedData } from "./derived/actor/equipment.js";

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

  async _onCreate(data, options, userId) {
    await super._onCreate(data, options, userId);

    const characterType = this.type;
    const currentDesc = this.system.bio.npcDescription;

    console.log(characterType, this);

    if (!currentDesc || currentDesc.trim() === "") {
      const template = DEFAULT_NPC_DESCRIPTIONS[characterType];
      if (template) {
        await this.update({ "system.bio.npcDescription": template.trim() });
      }
    }
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    const system = this.system;

    AdvancementDerivedData(system);
    EquipmentDerivedData(this);
  }
}
