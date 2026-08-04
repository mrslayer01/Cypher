export const DEFAULT_ITEM_DATA = {
  description: "",
  notes: "",
  gmNotes: ""
};

export const DEFAULT_EQUIPMENT_DATA = {
  equipment: {
    price: { category: "None", cost: 0 }
  }
};

export const DEFAULT_SKILL_DATA = {
  skill: {
    level: "Trained"
  }
};

export const DEFAULT_ABILITY_DATA = {
  ability: {
    category: "Attack",
    tier: "Low",
    cost: { pool: "None", amount: 0 },
    type: "Enabler"
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
