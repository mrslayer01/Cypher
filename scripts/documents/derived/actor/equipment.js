export function EquipmentDerivedData(actor) {
  if (actor.actorType !== "Character" && actor.type !== "Character") return;
  ArmorEquipped(actor);
}

async function ArmorEquipped(actor) {
  // Populate current armor as well as the type of armor equipped.
  let equippedArmorValue = 0;
  let equippedArmorType = "";
  let hasShield = false;
  const armorItems = actor.items.filter((i) => i.type === "Armor");

  for (const armor of armorItems) {
    const data = armor.system?.armor;
    if (!data) continue;

    // Only count equipped armor
    if (data.equipped) {
      const base = Number(data.armor?.base || 0);
      const bonus = Number(data.armor?.bonus || 0);
      equippedArmorValue += base + bonus;
    }
  }

  actor.system.core.combat.armor.current = equippedArmorValue;
}
