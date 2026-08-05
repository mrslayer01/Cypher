import {
  DEFAULT_ABILITY_DATA,
  DEFAULT_ARMOR_DATA,
  DEFAULT_ATTACK_DATA,
  DEFAULT_CYPHER_DATA,
  DEFAULT_ITEM_DATA,
  DEFAULT_SKILL_DATA,
  DEFAULT_WEAPON_DATA
} from "../config/default-item-data.js";

export class CypherItem extends Item {
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
  }
}
