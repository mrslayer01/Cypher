import {
  DEFAULT_ABILITY_DATA,
  DEFAULT_ARMOR_DATA,
  DEFAULT_ATTACK_DATA,
  DEFAULT_CHARACTER_ARC,
  DEFAULT_CYPHER_DATA,
  DEFAULT_ITEM_DATA,
  DEFAULT_SKILL_DATA,
  DEFAULT_WEAPON_DATA
} from "../config/default-item-data.js";
import { DEFAULT_ITEM_DESCRIPTIONS } from "../utils/lookup.js";

export class CypherItem extends Item {
  async _onCreate(data, options, userId) {
    await super._onCreate(data, options, userId);

    const itemType = this.type;
    const currentDesc = this.system.itemDescription;

    if (!currentDesc || currentDesc.trim() === "") {
      const template = DEFAULT_ITEM_DESCRIPTIONS[itemType];
      if (template) {
        await this.update({ "system.itemDescription": template.trim() });
      }
    }
  }

  prepareData() {
    super.prepareData();

    foundry.utils.mergeObject(this.system, DEFAULT_ITEM_DATA, {
      insertKeys: true,
      overwrite: false
    });

    if (this.type === "Skill") {
      foundry.utils.mergeObject(this.system, DEFAULT_SKILL_DATA, {
        insertKeys: true,
        overwrite: false
      });
    }

    if (this.type === "Special Ability") {
      foundry.utils.mergeObject(this.system, DEFAULT_ABILITY_DATA, {
        insertKeys: true,
        overwrite: false
      });
    }

    if (this.type === "Attack") {
      foundry.utils.mergeObject(this.system, DEFAULT_ATTACK_DATA, {
        insertKeys: true,
        overwrite: false
      });
    }

    if (this.type === "Cypher") {
      foundry.utils.mergeObject(this.system, DEFAULT_CYPHER_DATA, {
        insertKeys: true,
        overwrite: false
      });
    }

    if (this.type === "Weapon") {
      foundry.utils.mergeObject(this.system, DEFAULT_WEAPON_DATA, {
        insertKeys: true,
        overwrite: false
      });
    }

    if (this.type === "Armor") {
      foundry.utils.mergeObject(this.system, DEFAULT_ARMOR_DATA, {
        insertKeys: true,
        overwrite: false
      });
    }

    if (this.type === "Character Arc") {
      foundry.utils.mergeObject(this.system, DEFAULT_CHARACTER_ARC, {
        insertKeys: true,
        overwrite: false
      });
    }
  }
}
