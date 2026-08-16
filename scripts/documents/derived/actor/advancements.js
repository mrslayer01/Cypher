export function AdvancementDerivedData(system) {
  xpRemaining(system);
  characterTier(system);
  characterEffort(system);
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
  exp.spentAdvancements ??= 0;
  exp.spentMisc ??= 0;
  exp.remaining ??= 0;
  exp.current ??= 0;

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
  exp.spentAdvancements = purchasedCount * 4;

  // XP remaining for advancements only
  exp.remaining = Math.max(exp.total - exp.spentAdvancements, 0);

  // XP available for ANY purpose
  exp.current = Math.max(exp.total - (exp.spentAdvancements + exp.spentMisc), 0);
}
