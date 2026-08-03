import { DEFAULT_ITEM_DATA } from "../config/default-item-data.js";

export class CypherItem extends Item {
  prepareBaseData() {
    super.prepareBaseData();
    foundry.utils.mergeObject(this.system, DEFAULT_ITEM_DATA, {
      insertKeys: true,
      overwrite: false
    });
  }
}
