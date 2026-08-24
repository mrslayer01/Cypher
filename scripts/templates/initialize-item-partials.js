import { ItemMainPartials } from "./item-partials/body-partials.js";
import { ItemHeaderPartials } from "./item-partials/header-partials.js";

export function InitalizeAllItemPartials() {
  ItemHeaderPartials();
  ItemMainPartials();
}
