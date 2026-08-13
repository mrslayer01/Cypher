import { HeaderListeners } from "./listeners/actor/header/actor-header.js";
import { ItemHeaderListeners } from "./listeners/item/item-header.js";

export function RegisterSheetListeners(sheet, html) {
  HeaderListeners(sheet, html);
}

export function RegisterItemSheetListeners(sheet, html) {
  ItemHeaderListeners(sheet, html);
}
