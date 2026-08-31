export const DEFAULT_ITEM_DATA = {
  itemDescription: "",
  notes: "",
  gmNotes: "",
  price: { category: "None", cost: 0 },
  quantity: 1
};

export const DEFAULT_SKILL_DATA = {
  skill: {
    inability: { choice: false, value: -1 },
    practiced: { choice: true, value: 0 },
    trained: { choice: false, value: 1 },
    specialized: { choice: false, value: 2 },
    favorite: false
  }
};

export const DEFAULT_ABILITY_DATA = {
  ability: {
    tier: 1,
    cost: { pool: "None", amount: 0 },
    type: "Enabler",
    characterType: "",
    canUseEffort: false,
    favorite: false,
    active: false
  }
};

export const DEFAULT_ATTACK_DATA = {
  attack: {
    cost: { pool: "might", amount: 0 },
    damage: { base: 0, bonus: 0 }
  }
};

export const DEFAULT_CYPHER_DATA = {
  cypher: {
    type: "Cypher",
    level: { current: 0, dice: "1d6", diceMod: 0 },
    depletion: { amount: 1, dice: "1d20", diceMod: 0 },
    identified: true,
    favorite: false,
    depleted: false,
    active: false
  }
};

export const DEFAULT_WEAPON_DATA = {
  weapon: {
    type: "Light",
    attack: { skill: "Practiced", pool: "Speed" },
    damage: { base: 2, bonus: 0 },
    equipped: false,
    weaponType: "Slashing"
  }
};

export const DEFAULT_ARMOR_DATA = {
  armor: {
    type: "Light",
    skill: "Practiced",
    shield: false,
    effortReduc: 0,
    armor: { base: 1, bonus: 0 },
    equipped: false
  }
};

export const DEFAULT_CHARACTER_ARC = {
  arc: {
    opening: { text: "", status: "Not Started" },
    steps: [] /* step object { text: "", status: "" } */,
    climax: { text: "", status: "Not Started" },
    resolution: { text: "", status: "Not Started" },
    xp: 0,
    status: "Not Started",
    arcDescription: ""
  }
};
