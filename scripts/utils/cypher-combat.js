export class CypherCombat extends Combat {
  async rollInitiative(ids, options = {}) {
    ids = typeof ids === "string" ? [ids] : ids;

    const updates = [];

    for (let id of ids) {
      const combatant = this.combatants.get(id);
      if (!combatant?.actor) continue;

      const actor = combatant.actor;

      // NPCs: static initiative
      if (actor.type === "NPC") {
        const lvl = actor.system.core.level;
        const bonus = actor.system.core.combat.initiativeBonus ?? 0;

        updates.push({
          _id: id,
          initiative: lvl + bonus
        });

        continue;
      }

      // PCs: roll 1d20
      const roll = await new Roll("1d20").evaluate();

      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor }),
        flavor: `<b>Initiative Roll</b><br>(${roll.total})</b>`
      });

      updates.push({
        _id: id,
        initiative: roll.total
      });
    }

    await this.updateEmbeddedDocuments("Combatant", updates);

    return this;
  }
}
