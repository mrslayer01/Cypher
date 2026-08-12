export const DEFAULT_ITEM_DATA = {
  itemDescription: "",
  notes: "",
  gmNotes: "",
  price: { category: "None", cost: 0 },
  quantity: 1
};

export const DEFAULT_SKILL_DATA = {
  skill: {
    inability: false,
    practiced: false,
    trained: false,
    specialized: false
  }
};

export const DEFAULT_ABILITY_DATA = {
  ability: {
    category: "Attack",
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
    level: { current: 0, roll: "1d6" },
    effect: "",
    table: "",
    Form: "",
    depletion: { amount: 1, formula: "1d20" }
  }
};

export const DEFAULT_WEAPON_DATA = {
  weapon: {
    type: "Light",
    attack: { eased: { amount: 0 }, pool: "might" },
    damage: { base: 0, bonus: 0 }
  }
};

export const DEFAULT_ARMOR_DATA = {
  armor: {
    type: "Light",
    shield: false,
    mod: { pool: "Speed", extraEffort: 0 },
    armor: { base: 0, bonus: 0 }
  }
};

export const DEFAULT_ADVANCEMENT_DATA = {
  tier: 0,
  increaseCapabilities: {
    description:
      "You gain 4 new points to add to your stat Pools. You can allocate the points among your Pools however you wish.",
    allocation: [{ pool: "", amount: 0 }],
    notes: "",
    bought: false
  },
  moveTowardPerfection: {
    description:
      "You add 1 to your Might Edge, your Speed Edge, or your Intellect Edge (your choice).",
    pool: "",
    notes: "",
    bought: false
  },
  extraEffort: { description: "Your Effort score increases by 1.", bought: false },
  skillTraining: {
    description:
      "Choose one skill other than attacks or defense, such as climbing, jumping, persuading, sneaking, or history. You become trained in that skill. Training an ",
    skill: "",
    notes: "",
    bought: false
  },
  other: { type: [{ name: "", notes: "" }], bought: false }
};
