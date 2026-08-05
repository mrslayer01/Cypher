import { ActorHeaderPartials } from "./actor-partials/header-partials.js";

export async function InitalizeAllActorPartials() {
  await ActorHeaderPartials();
}
