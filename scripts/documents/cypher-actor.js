import { DEFAULT_ACTOR_DATA, DEFAULT_NPC_DATA } from "../config/default-actor-data.js";

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
}
