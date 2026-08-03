export const DEFAULT_ACTOR_DATA = {
  bio: { name: "", description: "", notes: "", gmNotes: "" },
  core: {
    descriptor: "",
    type: "",
    focus: "",
    tier: 1,
    effort: { current: 1, temp: 0 },
    experience: { current: 0, temp: 0, total: 0 },
    pools: {
      might: { current: 10, max: 10, temp: 0, edge: { current: 0, temp: 0 } },
      speed: { current: 10, max: 10, temp: 0, edge: { current: 0, temp: 0 } },
      intellect: { current: 10, max: 10, temp: 0, edge: { current: 0, temp: 0 } }
    }
  }
};
