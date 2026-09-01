export async function RegisterGameSettings() {
  game.settings.register("cypher", "showRulerGridless", {
    name: game.i18n.localize("CYPHERSYSTEM.SettingShowRulerGridless"),
    hint: game.i18n.localize("CYPHERSYSTEM.SettingShowRulerGridlessHint"),
    scope: "world",
    type: Number,
    default: 1,
    requiresReload: true,
    choices: {
      0: game.i18n.localize("CYPHERSYSTEM.SettingShowRulerGridlessHide"),
      1: game.i18n.localize("CYPHERSYSTEM.SettingShowRulerGridlessInCombat"),
      2: game.i18n.localize("CYPHERSYSTEM.SettingShowRulerGridlessAlways")
    },
    config: true
  });

  game.settings.register("cypher", "disableRulerTypes", {
    name: game.i18n.localize("CYPHERSYSTEM.SettingsDisableRulerTypes"),
    hint: game.i18n.localize("CYPHERSYSTEM.SettingsDisableRulerTypesHint"),
    scope: "world",
    config: true,
    type: String,
    default: "marker",
    requiresReload: true
  });

  game.settings.register("cypher", "tokenSpeed", {
    name: game.i18n.localize("CYPHERSYSTEM.SettingTokenSpeed"),
    hint: game.i18n.localize("CYPHERSYSTEM.SettingTokenSpeedHint"),
    scope: "world",
    type: new foundry.data.fields.NumberField({
      min: 0.5,
      max: 5,
      step: 0.5,
      initial: 1,
      nullable: false
    }),
    requiresReload: true,
    config: true
  });

  game.settings.register("cypher", "defaultDifficulty", {
    name: "Default Roll Difficulty",
    scope: "world",
    config: false,
    type: Number,
    default: 0
  });

  game.settings.register("cypher", "gmIntrusion", {
    name: "Default GM Intrusion Range",
    scope: "world",
    config: false,
    type: Number,
    default: 1
  });
}
