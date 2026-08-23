export function XpDerivedData(actor) {
  if (actor.actorType !== "Character" && actor.type !== "Character") return;
  const system = actor.system;
  const exp = system.core.experience;

  //init xp values
  if (exp.total === undefined) exp.total = 0;
  if (exp.spentAdvancements === undefined) exp.spentAdvancements = 0;
  if (exp.remaining === undefined) exp.remaining = 0;
  if (exp.tooltip === undefined) exp.tooltip = "";

  xpRemaining(system);
  characterTier(system);
  characterEffort(system);
  characterRecoveryBonus(system);
}

function characterRecoveryBonus(system) {
  const exp = system.core.experience;
  const advancements = exp.advancements || [];

  let recoveryBonus = 0;

  for (const adv of advancements) {
    if (adv.other?.recovery?.bought) recoveryBonus++;
  }

  system.core.recovery.modifier = recoveryBonus * 2;
}

function characterEffort(system) {
  const exp = system.core.experience;
  const advancements = exp.advancements || [];

  let effort = 0;

  for (const adv of advancements) {
    if (adv.extraEffort?.bought) effort++;
  }

  system.core.effort.current = effort + 1;
}

function characterTier(system) {
  const exp = system.core.experience;
  const advancements = exp.advancements || [];

  // Count purchased advancements
  let purchasedCount = 0;

  for (const adv of advancements) {
    if (adv.increaseCapabilities?.bought) purchasedCount++;
    if (adv.moveTowardPerfection?.bought) purchasedCount++;
    if (adv.extraEffort?.bought) purchasedCount++;
    if (adv.skillTraining?.bought) purchasedCount++;

    // Other options — each individually purchasable
    if (adv.other?.armor?.bought) purchasedCount++;
    if (adv.other?.recovery?.bought) purchasedCount++;
    if (adv.other?.ability?.bought) purchasedCount++;
  }

  // RAW: Every 4 advancements = +1 tier
  let derivedTier = Math.floor(purchasedCount / 4) + 1;

  // Cap at Tier 6
  if (derivedTier > 6) derivedTier = 6;

  system.core.tier = derivedTier;
}

function xpRemaining(system) {
  const exp = system.core.experience;
  const advancements = exp.advancements || [];

  // Ensure fields exist
  exp.miscSpent ??= 0;
  exp.total ??= 0;

  // Count purchased advancements
  let purchasedCount = 0;

  for (const adv of advancements) {
    if (adv.increaseCapabilities?.bought) purchasedCount++;
    if (adv.moveTowardPerfection?.bought) purchasedCount++;
    if (adv.extraEffort?.bought) purchasedCount++;
    if (adv.skillTraining?.bought) purchasedCount++;

    if (adv.other?.armor?.bought) purchasedCount++;
    if (adv.other?.recovery?.bought) purchasedCount++;
    if (adv.other?.ability?.bought) purchasedCount++;
  }

  // RAW: Each advancement costs 4 XP
  const spentAdvancements = purchasedCount * 4;

  // Derived values
  exp.spentAdvancements = spentAdvancements;
  exp.remaining = Math.max(exp.total - spentAdvancements, 0);
  exp.current = Math.max(exp.total - (spentAdvancements + exp.miscSpent), 0);

  exp.tooltip = `
    Total XP: ${exp.total}<br>
    Spent on Advancements: ${exp.spentAdvancements}<br>
    Spent on Misc (Player Intrusion, etc): ${exp.miscSpent}
  `.trim();
}
