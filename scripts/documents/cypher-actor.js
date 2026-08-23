import { DEFAULT_ACTOR_DATA, DEFAULT_NPC_DATA } from "../config/default-actor-data.js";
import { DEFAULT_NPC_DESCRIPTIONS } from "../utils/lookup.js";
import { XpDerivedData } from "./derived/actor/xp.js";
import { EquipmentDerivedData } from "./derived/actor/equipment.js";

export class CypherActor extends Actor {
  prepareBaseData() {
    super.prepareBaseData();
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

    if (this.type === "Character") {
      await this.update({
        "prototypeToken.actorLink": true,
        "prototypeToken.vision": true,
        "prototypeToken.sight.enabled": true,
        "prototypeToken.sight.range": 60,
        "prototypeToken.sight.visionMode": "basic",
        "prototypeToken.disposition": CONST.TOKEN_DISPOSITIONS.FRIENDLY,
        "prototypeToken.displayName": CONST.TOKEN_DISPLAY_MODES.ALWAYS
      });
    }

    const characterType = this.type;
    const currentDesc = this.system.bio.npcDescription;

    if (!currentDesc || currentDesc.trim() === "") {
      const template = DEFAULT_NPC_DESCRIPTIONS[characterType];
      if (template) {
        await this.update({
          "system.bio.npcDescription": template.trim(),
          "prototypeToken.displayName": CONST.TOKEN_DISPLAY_MODES.OWNER
        });
      }
    }
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    XpDerivedData(this);
    EquipmentDerivedData(this);
  }
}
