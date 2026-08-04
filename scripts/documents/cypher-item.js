import { DEFAULT_EQUIPMENT_DATA, DEFAULT_ITEM_DATA } from "../config/default-item-data.js";

export class CypherItem extends Item {
  prepareData() {
    super.prepareData();

    foundry.utils.mergeObject(this.system, DEFAULT_ITEM_DATA, {
      insertKeys: true,
      overwrite: false
    });

    if (this.type === "Equipment") {
      foundry.utils.mergeObject(this.system, DEFAULT_EQUIPMENT_DATA, {
        insertKeys: true,
        overwrite: false
      });
    }
  }
}
