import { ActorListeners } from "./listeners/actor/actor-listeners.js";
import { ItemHeaderListeners } from "./listeners/item/item-header.js";

export function RegisterSheetListeners(sheet, html) {
  ActorListeners(sheet, html);
}

export function RegisterItemSheetListeners(sheet, html) {
  ItemHeaderListeners(sheet, html);
}
