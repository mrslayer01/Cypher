export const DEFAULT_ACTOR_DATA = {
  bio: { charatcerDescription: "", notes: "", gmNotes: "", descriptor: "", type: "", focus: "" },
  core: {
    tier: 1,
    effort: { current: 1, temp: 0 },
    experience: { current: 0, miscSpent: 0, advancements: [], arcs: [] },
    damageTrack: "hale",
    recovery: {
      modifier: 0,
      uses: { oneAction: false, tenMinutes: false, oneHour: false, tenHours: false }
    },
    pools: {
      might: {
        current: 10,
        max: 10,
        advancement: 0,
        temp: 0,
        edge: { current: 0, temp: 0 },
        defense: {
          inability: { choice: false, value: -1 },
          practiced: { choice: true, value: 0 },
          trained: { choice: false, value: 1 },
          specialized: { choice: false, value: 2 }
        }
      },
      speed: {
        current: 10,
        max: 10,
        advancement: 0,
        temp: 0,
        edge: { current: 0, temp: 0 },
        defense: {
          inability: { choice: false, value: -1 },
          practiced: { choice: true, value: 0 },
          trained: { choice: false, value: 1 },
          specialized: { choice: false, value: 2 }
        }
      },
      intellect: {
        current: 10,
        max: 10,
        advancement: 0,
        temp: 0,
        edge: { current: 0, temp: 0 },
        defense: {
          inability: { choice: false, value: -1 },
          practiced: { choice: true, value: 0 },
          trained: { choice: false, value: 1 },
          specialized: { choice: false, value: 2 }
        }
      }
    },
    combat: {
      armor: { current: 0 },
      damage: { current: 0, temp: 0 }
    },
    skills: [],
    specialAbilities: [],
    attacks: [],
    cyphers: {
      list: [],
      limit: 2
    },
    equipment: {
      money: 0,
      basic: [],
      armor: [],
      weapons: []
    }
  }
};

export const DEFAULT_NPC_DATA = {
  bio: { npcDescription: "", notes: "", gmNotes: "" },
  core: {
    level: 1,
    cyphers: [],
    specialAbilities: [],
    combat: {
      health: { current: 0, max: 0 },
      armor: 0,
      damage: { value: 0, pool: "speed", ignoreArmor: false },
      initiativeBonus: 0,
      defense: { bonus: 0, pool: "Speed" },
      attack: { bonus: 0 }
    }
  }
};
