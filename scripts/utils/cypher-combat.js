import { GetTaskDifficulty } from "./helpers.js";

export class CypherCombat extends Combat {
  async rollInitiative(ids, options = {}) {
    ids = typeof ids === "string" ? [ids] : ids;

    const updates = [];

    // ------------------------------------------------------------
    // 1. Gather all NPC initiative TNs
    // ------------------------------------------------------------
    const npcCombatants = this.combatants.filter((c) => c.actor?.type === "NPC");

    const npcTN = npcCombatants.map((c) => {
      const lvl = c.actor.system.core.level;
      const bonus = c.actor.system.core.combat.initiativeBonus ?? 0;
      return (lvl + bonus) * 3;
    });

    // Highest NPC TN (or 0 if none)
    const highestTN = npcTN.length ? Math.max(...npcTN) : 0;

    // Convert TN → Cypher difficulty (TN / 3)
    const difficulty = highestTN / 3;
    const difficultyText = GetTaskDifficulty(difficulty);

    // ------------------------------------------------------------
    // 2. Post a single chat message showing initiative difficulty
    // ------------------------------------------------------------
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker(),
      content: `
        <b>Initiative Difficulty</b><br>
        <b>Highest NPC Target Number:</b> ${highestTN}<br>
        <b>Difficulty:</b> ${difficultyText}<br>
      `
    });

    // ------------------------------------------------------------
    // 3. Set all combatants (NPC + PC) to initiative 0
    // ------------------------------------------------------------
    for (let id of ids) {
      const combatant = this.combatants.get(id);
      if (!combatant?.actor) continue;

      updates.push({
        _id: id,
        initiative: 0
      });
    }

    await this.updateEmbeddedDocuments("Combatant", updates);

    return this;
  }
}
