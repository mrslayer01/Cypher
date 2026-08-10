export const DEFAULT_ACTOR_DATA = {
  bio: { charatcerDescription: "", notes: "", gmNotes: "", descriptor: "", type: "", focus: "" },
  core: {
    tier: 1,
    effort: { current: 1, temp: 0 },
    experience: { current: 0, temp: 0, total: 0, advancements: [] },
    damageTrack: { hale: false, impared: false, debilitated: false },
    recovery: {
      modifier: 0,
      uses: { oneAction: false, tenMinutes: false, oneHour: false, tenHours: false }
    },
    pools: {
      might: {
        current: 10,
        max: 10,
        temp: 0,
        edge: { current: 0, temp: 0 },
        defense: { inability: false, practiced: true, trained: false, specialized: false }
      },
      speed: {
        current: 10,
        max: 10,
        temp: 0,
        edge: { current: 0, temp: 0 },
        defense: { inability: false, practiced: true, trained: false, specialized: false }
      },
      intellect: {
        current: 10,
        max: 10,
        temp: 0,
        edge: { current: 0, temp: 0 },
        defense: { inability: false, practiced: true, trained: false, specialized: false }
      }
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
  bio: { name: "", description: "", notes: "", gmNotes: "" },
  core: {
    level: 1
  }
};
