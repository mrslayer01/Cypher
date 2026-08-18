export function EquipmentDerivedData(actor) {
  if (actor.actorType !== "Character" && actor.type !== "Character") return;
  ArmorEquipped(actor);
}

async function ArmorEquipped(actor) {
  let equippedArmorValue = 0;
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

  await actor.update({
    "system.core.combat.armor.current": equippedArmorValue
  });
}
