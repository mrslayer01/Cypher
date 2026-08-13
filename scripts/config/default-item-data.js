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
    specialized: { choice: false, value: 2 }
  }
};

export const DEFAULT_ABILITY_DATA = {
  ability: {
    cost: { pool: "None", amount: 0 },
    type: "Enabler",
    canUseEffort: false
  }
};

export const DEFAULT_ATTACK_DATA = {
  attack: { cost: { pool: "might", amount: 0 }, damage: { base: 0, bonus: 0 } }
};

export const DEFAULT_CYPHER_DATA = {
  cypher: {
    type: "Cypher",
    level: { current: 0, dice: "1d6", diceMod: 0 },
    depletion: { amount: 1, dice: "1d20", diceMod: 0 },
    identified: false
  }
};

export const DEFAULT_WEAPON_DATA = {
  weapon: {
    type: "Light",
    attack: { eased: { amount: 0 }, pool: "might" },
    damage: { base: 0, bonus: 0 },
    equipped: false
  }
};

export const DEFAULT_ARMOR_DATA = {
  armor: {
    type: "Light",
    shield: false,
    mod: { pool: "Speed", extraEffort: 0 },
    armor: { base: 0, bonus: 0 },
    equipped: false
  }
};

export const DEFAULT_ADVANCEMENT_DATA = {
  tier: 0,
  notes: "",
  increaseCapabilities: {
    description:
      "You gain 4 new points to add to your stat Pools. You can allocate the points among your Pools however you wish.",
    allocation: [{ pool: "", amount: 0 }],
    bought: false
  },
  moveTowardPerfection: {
    description:
      "You add 1 to your Might Edge, your Speed Edge, or your Intellect Edge (your choice).",
    pool: "",
    bought: false
  },
  extraEffort: { description: "Your Effort score increases by 1.", bought: false },
  skillTraining: {
    description:
      "Choose one skill other than attacks or defense, such as climbing, jumping, persuading, sneaking, or history. You become trained in that skill. Training an already trained skill makes it specialized.",
    skill: "",
    bought: false
  },
  other: { type: [{ name: "" }], bought: false }
};
