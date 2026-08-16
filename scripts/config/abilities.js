export function createAbility(abilInput) {
  const {
    name = "",
    cost = 0,
    pool = "",
    amount = 0,
    type = "Enabler",
    canUseEffort = false,
    description = "",
    characterType = "",
    tier = 0,
    favorite = false,
    active = false
  } = abilInput;

  return {
    name,
    cost,
    pool,
    amount,
    type,
    canUseEffort,
    description,
    characterType,
    tier,
    favorite,
    active
  };
}

export const CYPHER_ABILITIES = {
  //#region Glaive
  Glaive_CombatProwess: createAbility({
    name: "Combat Prowess",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    characterType: "Glaive",
    tier: 1,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "You add +1 damage to one type of attack of your choice: melee attacks or ranged attacks."
  }),
  Glaive_Aggression: createAbility({
    name: "Aggression",
    cost: 2,
    pool: "Might",
    amount: 2,
    type: "Enabler",
    characterType: "Glaive",
    tier: 1,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "You focus on making attacks to such an extent that you leave yourself vulnerable to your opponents. While this ability is active, you gain an asset on your melee attacks, and your Speed defense rolls against melee and ranged attacks are hindered. This effect lasts for as long as you wish, but it ends if no combat is taking place within range of your senses. Enabler."
  }),
  Glaive_FleetOfFoot: createAbility({
    name: "Fleet of Foot",
    cost: 1,
    pool: "Speed",
    amount: 1,
    type: "Enabler",
    characterType: "Glaive",
    tier: 1,
    canUseEffort: true,
    favorite: false,
    active: false,
    description:
      "You can move a short distance as part of another action. You can move a long distance as your entire action for a turn. If you apply a level of Effort to this ability, you can move a long distance and make an attack as your entire action for a turn, but the attack is hindered. Enabler."
  }),
  Glaive_ImpressiveDisplay: createAbility({
    name: "Impressive Display",
    cost: 2,
    pool: "Might",
    amount: 2,
    type: "Action",
    characterType: "Glaive",
    tier: 1,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "You perform a feat of strength, speed, or combat, impressing those nearby. For the next minute you gain an asset in all interaction tasks with people who saw you use this ability."
  }),
  Glaive_Misdirect: createAbility({
    name: "Misdirect",
    cost: 3,
    pool: "Speed",
    amount: 3,
    type: "Enabler",
    characterType: "Glaive",
    tier: 1,
    canUseEffort: true,
    favorite: false,
    active: false,
    description:
      "When an opponent misses you, you can redirect their attack to another target (a creature or object) of your choosing that’s within immediate range of you. Make an unmodified attack roll against the new target (do not use any of your or the opponent’s modifiers to the attack roll, but you can apply Effort for accuracy). If the attack hits, the target takes damage from your opponent’s attack."
  }),
  Glaive_NoNeedForWeapons: createAbility({
    name: "No Need for Weapons",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    characterType: "Glaive",
    tier: 1,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "When you make an unarmed attack (such as a punch or kick), it counts as a medium weapon instead of a light weapon."
  }),
  Glaive_TrainedWithoutArmor: createAbility({
    name: "Trained Without Armor",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    characterType: "Glaive",
    tier: 1,
    canUseEffort: false,
    favorite: false,
    active: false,
    description: "You are trained in Speed defense actions when not wearing armor."
  }),
  Glaive_DangerSense: createAbility({
    name: "Danger Sense",
    cost: 1,
    pool: "Speed",
    amount: 1,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 1,
    description: "The difficulty of your initiative roll is reduced by one step."
  }),
  Glaive_Goad: createAbility({
    name: "Goad",
    cost: 2,
    pool: "Might",
    amount: 2,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 1,
    description:
      "After you successfully attack a creature, the difficulty of Speed defense rolls made by all others against attacks by that creature is decreased by one step until the end of the next round."
  }),
  Glaive_MusclesOfIron: createAbility({
    name: "Muscles of Iron",
    cost: 2,
    pool: "Might",
    amount: 2,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 1,
    description:
      "For the next ten minutes, all Might-based actions other than attack rolls that you attempt have their difficulty reduced by one step."
  }),
  Glaive_Opportunist: createAbility({
    name: "Opportunist",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 1,
    description:
      "You have an asset on any attack roll you make against a creature that has been attacked at some point during the round and is within immediate range."
  }),
  Glaive_Overwatch: createAbility({
    name: "Overwatch",
    cost: 1,
    pool: "Intellect",
    amount: 1,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 1,
    description:
      "You use a ranged weapon to target a limited area and make an attack against the next viable target to enter that area. This works like a wait action, but you also negate any benefit the target would have from cover, position, surprise, range, illumination, or visibility. Further, you inflict 1 additional point of damage with the attack. You can remain on overwatch as long as you wish, within reason."
  }),
  Glaive_QuickDraw: createAbility({
    name: "Quick Draw",
    cost: 2,
    pool: "Speed",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 1,
    description:
      "You use an action to make an attack with a thrown light weapon. You then draw another light weapon and make another thrown attack against the same target or a different one."
  }),
  Glaive_SurgingConfidence: createAbility({
    name: "Surging Confidence",
    cost: 1,
    pool: "Might",
    amount: 1,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 1,
    description:
      "When you use an action to make your first recovery roll of the day, you immediately gain another action."
  }),
  Glaive_CrushingBlow: createAbility({
    name: "Crushing Blow",
    cost: 2,
    pool: "Might",
    amount: 2,
    type: "Action",
    characterType: "Glaive",
    tier: 2,
    canUseEffort: true,
    favorite: false,
    active: false,
    description:
      "When you use a bashing or bladed weapon in both hands and apply Effort on the attack, you get a free level of Effort on the damage. If fighting unarmed, this attack is made with both fists or both feet together."
  }),
  Glaive_Hemorrhage: createAbility({
    name: "Hemorrhage",
    cost: 2,
    pool: "Might",
    amount: 2,
    type: "Action",
    characterType: "Glaive",
    tier: 2,
    canUseEffort: true,
    favorite: false,
    active: false,
    description:
      "You make a powerful and precise strike that inflicts additional damage later. On your next turn, the target of this attack takes an additional 3 points of damage (this ignores Armor). The target can prevent this additional damage by making a recovery roll, using any ability that heals it, or using its action to attend to the injury. In addition to the normal options for using Effort, you can choose to use Effort to increase this duration by one round."
  }),
  Glaive_Reload: createAbility({
    name: "Reload",
    cost: 1,
    pool: "Speed",
    amount: 1,
    type: "Enabler",
    characterType: "Glaive",
    tier: 2,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "When using a weapon that normally requires an action to reload, such as a heavy crossbow, you can reload and fire (or fire and reload) in the same action."
  }),
  Glaive_SkillWithDefense: createAbility({
    name: "Skill With Defense",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    characterType: "Glaive",
    tier: 2,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "Choose one type of defense task in which you are not already trained: Might, Speed, or Intellect. You are trained in defense tasks of that type. Unlike most fighting moves, you can select this move up to three times. Each time you select it, you must choose a different type of defense task."
  }),
  Glaive_SuccessiveAttack: createAbility({
    name: "Successive Attack",
    cost: 2,
    pool: "Speed",
    amount: 2,
    type: "Enabler",
    characterType: "Glaive",
    tier: 2,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "If you take down a foe, you can immediately make another attack on that same turn against a new foe within your reach. The second attack is part of the same action. You can use this fighting move with melee attacks and ranged attacks."
  }),
  Glaive_Avalanche: createAbility({
    name: "Avalanche",
    cost: 2,
    pool: "Might",
    amount: 2,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 2,
    description:
      "When you get a minor effect or a major effect for an attack using a weapon you wield in two hands, you deal the extra damage and you knock the creature down."
  }),
  Glaive_Block: createAbility({
    name: "Block",
    cost: 3,
    pool: "Speed",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 2,
    description:
      "You automatically block the next melee attack made against you within the next minute."
  }),
  Glaive_Bloodlust: createAbility({
    name: "Bloodlust",
    cost: 3,
    pool: "Might",
    amount: 3,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 2,
    description:
      "If you take down a foe, you can move a short distance, but only if you move toward another foe. You don’t need to spend the points until you know that the foe is down."
  }),
  Glaive_FindAnOpening: createAbility({
    name: "Find an Opening",
    cost: 1,
    pool: "Intellect",
    amount: 1,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 2,
    description:
      "You use trickery to find an opening in your foe’s defenses. Make a Speed roll against one creature within immediate range. On a success, the difficulty of your next attack against that creature before the end of the next round is reduced by one step."
  }),
  Glaive_GuardedAttack: createAbility({
    name: "Guarded Attack",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 2,
    description:
      "While you’re using a shield when you make an attack with a melee weapon, you can choose to increase the difficulty of the roll by one step. You then decrease the difficulty of all Speed defense rolls you make by one step until the end of the round."
  }),
  Glaive_MightyBlow: createAbility({
    name: "Mighty Blow",
    cost: 2,
    pool: "Might",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 2,
    description:
      "You strike two foes with a single blow. Make separate attack rolls for each foe, but both attacks count as a single action in a single round. You remain limited by the amount of Effort you can apply on one action. Anything that modifies your attack or damage applies to both of these attacks."
  }),
  Glaive_QuickRecovery: createAbility({
    name: "Quick Recovery",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 2,
    description:
      "Your second recovery roll, usually requiring ten minutes, takes only a single action, just like the first roll."
  }),
  Glaive_SenseAmbush: createAbility({
    name: "Sense Ambush",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 2,
    description: "You are never treated as surprised by an attack."
  }),
  Glaive_ShieldBash: createAbility({
    name: "Shield Bash",
    cost: 3,
    pool: "Might",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 2,
    description:
      "If you make a melee attack and you’re using a shield, you can also make an attack with your shield as a part of the same action. Any Effort or modifications that apply to your main attack apply to the shield attack as well. A shield counts as a medium weapon."
  }),
  Glaive_StandWatch: createAbility({
    name: "Stand Watch",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 2,
    description:
      "While standing watch, you unfailingly remain awake and alert for up to eight hours. During this time, you are trained in perception tasks as well as stealth tasks to conceal yourself from those who might approach."
  }),
  Glaive_EnergyResistance: createAbility({
    name: "Energy Resistance",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    characterType: "Glaive",
    tier: 3,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "Choose a discrete type of energy that you have experience with (such as heat, sonic, electricity, and so on). You gain +5 to Armor against damage from that type of energy. You must be familiar with the type of energy; for example, if you have no experience with a certain kind of extradimensional energy, you can’t protect against it. Unlike most fighting moves, you can select this more than once. Each time you select it, you must choose a different kind of energy."
  }),
  Glaive_Lunge: createAbility({
    name: "Lunge",
    cost: 2,
    pool: "Might",
    amount: 2,
    type: "Action",
    characterType: "Glaive",
    tier: 3,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "This move requires you to extend yourself for a powerful stab or smash. The awkward lunge hinders the attack roll. If your attack is successful, it inflicts 4 additional points of damage."
  }),
  Glaive_ObstacleRunning: createAbility({
    name: "Obstacle Running",
    cost: 3,
    pool: "Speed",
    amount: 3,
    type: "Enabler",
    characterType: "Glaive",
    tier: 3,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "For the next minute, you can ignore obstacles that slow your movement, allowing you to travel at normal speed through areas with rubble, fences, tables, and similar objects that you would have to climb over or move around. This movement might include sliding on a railing, briefly running along a wall, or even stepping on a creature to boost yourself over something. If an obstacle would normally require a Might or Speed task to overcome, such as swinging on a rope, balancing on a rope, or jumping over a hole, you are trained at that task."
  }),
  Glaive_Slice: createAbility({
    name: "Slice",
    cost: 2,
    pool: "Speed",
    amount: 2,
    type: "Action",
    characterType: "Glaive",
    tier: 3,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "This is a quick attack with a bladed or pointed weapon that is hard to defend against. You are trained in this task. If the attack is successful, it deals 1 less point of damage than normal."
  }),
  Glaive_SpecializedInArmor: createAbility({
    name: "Specialized in Armor",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    characterType: "Glaive",
    tier: 3,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "The cost reduction from your Trained in Armor ability improves. You now reduce the Speed Effort cost for wearing armor by an additional 1."
  }),
  Glaive_Spray: createAbility({
    name: "Spray",
    cost: 2,
    pool: "Speed",
    amount: 2,
    type: "Action",
    characterType: "Glaive",
    tier: 3,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "If a weapon has the ability to fire rapid shots without reloading (usually called a rapid-fire weapon, such as a crank crossbow), you can spray multiple shots around your target to increase the chance of hitting. This move uses 1d6 + 1 rounds of ammo (or all the ammo in the weapon, if it has less than the number rolled). You are trained in making this attack. If the attack is successful, it deals 1 less point of damage than normal."
  }),
  Glaive_TrickShot: createAbility({
    name: "Trick Shot",
    cost: 2,
    pool: "Speed",
    amount: 2,
    type: "Action",
    characterType: "Glaive",
    tier: 3,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "As part of the same action, you make a ranged attack against two targets that are within immediate range of each other. Make a separate attack roll against each target. The attack rolls are hindered."
  }),
  Glaive_Vigilance: createAbility({
    name: "Vigilance",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    characterType: "Glaive",
    tier: 3,
    canUseEffort: false,
    favorite: false,
    active: false,
    description:
      "You take a cautious approach to combat, focusing more on protecting yourself than on hurting your opponents. While this ability is active, you gain an asset on Speed defense rolls against melee and ranged attacks, and your melee and ranged attacks are hindered. This effect lasts for as long as you wish, but it ends if no combat is taking place within range of your senses. Action to initiate."
  }),
  Glaive_Brutality: createAbility({
    name: "Brutality",
    cost: 3,
    pool: "Might",
    amount: 3,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 3,
    description:
      "When using a heavy weapon, you make a slight adjustment to clip your foe as you draw your weapon back for another swing. Thus, if you miss with your attack, your target still takes 1 point of damage from the clip."
  }),
  Glaive_DaringEscape: createAbility({
    name: "Daring Escape",
    cost: 5,
    pool: "Speed",
    amount: 5,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 3,
    description:
      "You dodge an attack and trick your attacker into hitting someone else by accident. If you succeed on a Speed defense roll, you can force the attacker to instead attack a different creature within immediate range."
  }),
  Glaive_DeadlyAim: createAbility({
    name: "Deadly Aim",
    cost: 3,
    pool: "Speed",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 3,
    description:
      "For the next minute, all ranged attacks you make inflict 2 additional points of damage."
  }),
  Glaive_Fury: createAbility({
    name: "Fury",
    cost: 3,
    pool: "Might",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 3,
    description:
      "For the next minute, all melee attacks you make inflict 2 additional points of damage."
  }),
  Glaive_InnerDefense: createAbility({
    name: "Inner Defense",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 3,
    description:
      "You are trained in any task to resist the ability of another to discern your true feelings, beliefs, or plans. You are likewise trained in resisting torture, telepathic intrusion, and mind control."
  }),
  Glaive_RunAndFight: createAbility({
    name: "Run and Fight",
    cost: 4,
    pool: "Might",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 3,
    description:
      "You can move a short distance and make a melee attack. The attack inflicts 2 additional points of damage."
  }),
  Glaive_SeizeOpportunity: createAbility({
    name: "Seize Opportunity",
    cost: 4,
    pool: "Speed",
    amount: 4,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 3,
    description:
      "If you succeed on a Speed defense roll to resist an attack, you gain an action. You can use it immediately even if you have already taken a turn in the round. If you use this action to attack, the difficulty of your attack is reduced by one step. You don’t take an action during the next round."
  }),
  Glaive_StoneBreaker: createAbility({
    name: "Stone Breaker",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 3,
    description:
      "Your attacks against objects inflict 4 additional points of damage when you use a melee weapon that you wield in two hands."
  }),
  Glaive_AmazingEffort: createAbility({
    name: "Amazing Effort",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 4,
    description:
      "When you apply at least one level of Effort to a non-combat task, you get a free level of Effort on that task. When you choose this fighting move, decide if this ability applies to Might Effort or Speed Effort."
  }),
  Glaive_CapableWarrior: createAbility({
    name: "Capable Warrior",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 4,
    description: "Your attacks deal 1 additional point of damage."
  }),
  Glaive_ExperiencedDefender: createAbility({
    name: "Experienced Defender",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 4,
    description: "When wearing armor, you gain +1 to Armor."
  }),
  Glaive_Feint: createAbility({
    name: "Feint",
    cost: 2,
    pool: "Speed",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 4,
    description:
      "If you spend one action creating a misdirection or diversion, in the next round you can take advantage of your opponent’s lowered defenses. Make a melee attack roll against that opponent. You gain an asset on this attack. If your attack is successful, it inflicts 4 additional points of damage."
  }),
  Glaive_MinorToMajor: createAbility({
    name: "Minor to Major",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 4,
    description:
      "You treat rolls of natural 19 as rolls of natural 20 for Might attack rolls or Speed attack rolls (your choice when you gain this ability). This allows you to gain a major effect on a natural 19 or 20."
  }),
  Glaive_Snipe: createAbility({
    name: "Snipe",
    cost: 2,
    pool: "Speed",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 4,
    description:
      "If you spend one action aiming, in the next round you can make a precise ranged attack. You are trained in this task. If your attack is successful, it inflicts 4 additional points of damage."
  }),
  Glaive_Ambusher: createAbility({
    name: "Ambusher",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 4,
    description:
      "When you attack a creature that has not yet acted during the first round of combat, the difficulty of your attack is reduced by one step."
  }),
  Glaive_ConfoundingBanter: createAbility({
    name: "Confounding Banter",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 4,
    description:
      "You spew a stream of nonsense to distract a foe. Make an Intellect roll against a creature within immediate range. On a success, the difficulty of the defense roll against the creature’s next attack before the end of the next round is reduced by one step."
  }),
  Glaive_DebilitatingStrike: createAbility({
    name: "Debilitating Strike",
    cost: 4,
    pool: "Speed",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 4,
    description:
      "You make an attack to deliver a painful or debilitating strike. The difficulty of that attack is increased by one step. If it hits, the creature takes 2 additional points of damage at the end of the next round, and the difficulty of defense rolls to resist its attacks is decreased by one step until the end of the next round."
  }),
  Glaive_Hardy: createAbility({
    name: "Hardy",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 4,
    description:
      "You are immune to disease, and the difficulty of Might defense rolls against poison effects is reduced by two steps."
  }),
  Glaive_Momentum: createAbility({
    name: "Momentum",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 4,
    description:
      "If you use an action to move, your next attack made using a melee weapon before the end of the next round inflicts 2 additional points of damage."
  }),
  Glaive_PreciseStrike: createAbility({
    name: "Precise Strike",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 4,
    description:
      "When you attack using a weapon, the difficulty of your attack is decreased by one step, and the damage is reduced by 3 points, minimum 0."
  }),
  Glaive_PreciseTiming: createAbility({
    name: "Precise Timing",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 4,
    description:
      "If you take the same action for three rounds in a row, on the third round and every consecutive round thereafter, the difficulty is reduced by one step."
  }),
  Glaive_MasteryInArmor: createAbility({
    name: "Mastery in Armor",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 5,
    description:
      "The cost reduction from your Trained in Armor ability improves. You now reduce the Speed Effort cost for wearing armor by an additional 1."
  }),
  Glaive_ArcSpray: createAbility({
    name: "Arc Spray",
    cost: 3,
    pool: "Speed",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 5,
    description:
      "If a weapon has the ability to fire rapid shots without reloading (usually called a rapid-fire weapon, such as a crank crossbow), you can fire your weapon at up to three targets all next to one another at once. Make a separate attack roll against each target. Each attack is hindered."
  }),
  Glaive_BattlefieldTactician: createAbility({
    name: "Battlefield Tactician",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Enabler",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 5,
    description:
      "You scrutinize your surroundings, learning whatever facts the GM feels are pertinent about attacking, defending, maneuvering, and dealing with environmental hazards within a short distance. For example, you might notice a pile of rubble you can stand on for an advantage in melee, a sheltered corner to help protect against enemy attacks, a less-slippery part of a frozen lake, or a place where the poison gas is thinner than elsewhere. If you or someone you tell move to that location, you or the person told gain an asset on tasks related to that optimal position, such as attack rolls from the high ground, Speed defense rolls from the sheltered corner, balance rolls on the frozen lake, or Might defense rolls against the poisonous cloud. Instead of gaining an advantageous location, you might learn a disadvantageous location that you could use against your enemies, such as maneuvering them into an awkward corner that hinders their melee attacks or a weak spot on the frozen lake that will break if they stand on it. You can apply Effort to learn one additional good or bad location within range, one location per level of Effort, increase the range of this ability, another short distance per level of Effort, or both."
  }),
  Glaive_JumpAttack: createAbility({
    name: "Jump Attack",
    cost: 5,
    pool: "Might",
    amount: 5,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 5,
    description:
      "You attempt a difficulty 4 Might roll to jump high into the air as part of your melee attack action. If you succeed at the jump and your attack hits, you inflict 3 additional points of damage and knock the foe prone. If you fail at the jump, you still make your normal attack roll, but you don’t inflict the extra damage or knock down the opponent if you hit. In addition to the normal options for using Effort, you can choose to use Effort to enhance your jump; each level of Effort used in this way adds +2 feet to the height and +1 damage to the attack."
  }),
  Glaive_MasteryWithDefense: createAbility({
    name: "Mastery With Defense",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 5,
    description:
      "Choose one type of defense task in which you are trained: Might, Speed, or Intellect. You are specialized in defense tasks of that type. Unlike most fighting moves, you can select this move up to three times. Each time you select it, you must choose a different type of defense task."
  }),
  Glaive_Parry: createAbility({
    name: "Parry",
    cost: 5,
    pool: "Speed",
    amount: 5,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 5,
    description:
      "You can deflect incoming attacks quickly. When you activate this move, for the next ten rounds you ease all Speed defense rolls."
  }),
  Glaive_HardTarget: createAbility({
    name: "Hard Target",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 5,
    description:
      "If you move a short distance or farther on your turn, the difficulty of all Speed defense rolls is reduced by one additional step."
  }),
  Glaive_InverseAttrition: createAbility({
    name: "Inverse Attrition",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 5,
    description:
      "In every round of combat after the first, you gain a +1 bonus to damage. This bonus increases every other round. You must be a participant in the combat, and you must be fully aware and take an action in a round for it to count toward an increase in damage."
  }),
  Glaive_KillingBlow: createAbility({
    name: "Killing Blow",
    cost: 5,
    pool: "Might",
    amount: 5,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 5,
    description:
      "You exploit your enemy’s diminished vitality to deliver a killing blow. Make a melee attack and inflict 6 additional points of damage if your target is at one-half health or less."
  }),
  Glaive_Press: createAbility({
    name: "Press",
    cost: 6,
    pool: "Might",
    amount: 6,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 5,
    description:
      "You drive a foe back from your companions. Make an attack with a melee weapon. In addition to inflicting damage, both you and the target move a short distance together so you remain within immediate range of each other."
  }),
  Glaive_Riposte: createAbility({
    name: "Riposte",
    cost: 6,
    pool: "Speed",
    amount: 6,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 5,
    description:
      "When you succeed on a Speed defense roll against an attack from a creature within immediate range, you can immediately make an attack on that creature, or you can gain an asset for the next attack you make on it before the end of the next round."
  }),
  Glaive_AgainAndAgain: createAbility({
    name: "Again and Again",
    cost: 8,
    pool: "Speed",
    amount: 8,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 6,
    description: "You can take an additional action in a round in which you have already acted."
  }),
  Glaive_FinishingBlow: createAbility({
    name: "Finishing Blow",
    cost: 5,
    pool: "Might",
    amount: 5,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 6,
    description:
      "If your foe is prone, stunned, or somehow helpless or incapacitated when you strike, you inflict 7 additional points of damage on a successful hit."
  }),
  Glaive_Slayer: createAbility({
    name: "Slayer",
    cost: 3,
    pool: "Might",
    amount: 3,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 6,
    description:
      "When you successfully strike an NPC or creature of level 5 or lower, make another roll using whichever stat you used to attack. If you succeed on the second roll, you kill the target outright. If you use this fighting move against a PC of any tier and you succeed on the second roll, the character moves down one step on the damage track."
  }),
  Glaive_SpinAttack: createAbility({
    name: "Spin Attack",
    cost: 5,
    pool: "Speed",
    amount: 5,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 6,
    description:
      "You stand still and make attacks against up to five foes, all as part of the same action in one round. All of the attacks have to be the same sort of attack, melee or ranged. Make a separate attack roll for each foe. You remain limited by the amount of Effort you can apply on one action. Anything that modifies your attack or damage applies to all of these attacks. In addition to the normal options for using Effort, you can choose to use Effort to increase the number of foes you can attack with this ability, one additional foe per level of Effort used in this way."
  }),
  Glaive_CombatTrance: createAbility({
    name: "Combat Trance",
    cost: 7,
    pool: "Might",
    amount: 7,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 6,
    description:
      "You empty your mind of all distractions to let your instincts take over. For one minute, you can take two actions each round, but only one of those actions can be an attack."
  }),
  Glaive_RunThroughWalls: createAbility({
    name: "Run Through Walls",
    cost: 6,
    pool: "Might",
    amount: 6,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 6,
    description:
      "When you use an action to move and you move up to an obstacle, you can make a Might roll. The GM sets the difficulty based on the material from which the object is made. If you succeed, you smash through the obstacle and leave behind a hole large enough for others to move through."
  }),
  Glaive_SpringAway: createAbility({
    name: "Spring Away",
    cost: 5,
    pool: "Speed",
    amount: 5,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Glaive",
    tier: 6,
    description:
      "Whenever you succeed on a Speed defense roll, you can immediately move up to a short distance. You cannot use this ability more than once in a given round."
  }),
  //#endregion Glaive
  //#region Nano
  Glaive_HedgeMagic: createAbility({
    name: "Hedge Magic",
    cost: 1,
    pool: "Intellect",
    amount: 1,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 1,
    description:
      "You can perform small tricks: temporarily change the color or basic appearance of a small object, cause small objects to float through the air, clean a small area, mend a broken object, prepare but not create food, and so on. You can’t use Hedge Magic to harm another creature or object."
  }),
  Nano_Onslaught: createAbility({
    name: "Onslaught",
    cost: 1,
    pool: "Intellect",
    amount: 1,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 1,
    description:
      "You attack a foe using energies that assail either their physical form or their mind. In either case, you must be able to see your target. If the attack is physical, you emit a short-range ray of force that inflicts 4 points of damage. If the attack is mental, you focus your mental energy to blast the thought processes of another creature within short range. This mindslice inflicts 2 points of Intellect damage and thus ignores Armor. Some creatures without minds, such as automatons, might be immune to your mindslice."
  }),
  Nano_Push: createAbility({
    name: "Push",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 1,
    description:
      "You push a creature or object an immediate distance in any direction you wish. You must be able to see the target, which must be your size or smaller, must not be affixed to anything, and must be within short range. The push is quick, and the force is too crude to be manipulated. For example, you can’t use this esotery to pull a lever or even close a door."
  }),
  Nano_Scan: createAbility({
    name: "Scan",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 1,
    description:
      "You scan an area equal in size to a 10-foot cube, including all objects or creatures within that area. The area must be within short range. Scanning a creature or object always reveals its level, a measure of how powerful, dangerous, or difficult it is. You also learn whatever facts the GM feels are pertinent about the matter and energy in that area. For example, you might learn that the wooden box contains a device of metal and synth. You might learn that the glass cylinder is full of poisonous gas, and that its metal stand has an electrical field running through it that connects to a metal mesh in the floor. You might learn that the creature standing before you is a mammal with a small brain. However, this esotery doesn’t tell you what the information means. Many materials and energy fields prevent or resist scanning."
  }),
  Nano_Ward: createAbility({
    name: "Ward",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 1,
    description:
      "You have a shield of energy around you at all times that helps deflect attacks. You gain +1 to Armor."
  }),
  Nano_Aggression: createAbility({
    name: "Aggression",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 1,
    description:
      "You reach into the mind of a character and unlock his more primitive instincts. Choose one character within short range. That character has an asset on Might-based attack rolls. The effect lasts for one minute."
  }),
  Nano_Distortion: createAbility({
    name: "Distortion",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 1,
    description:
      "You modify how a willing creature reflects light for one minute. Choose a creature within short range. The target rapidly shifts between its normal appearance and a blot of darkness. The target has an asset on Speed defense rolls until the effect wears off."
  }),
  Nano_EraseMemories: createAbility({
    name: "Erase Memories",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 1,
    description:
      "You reach into a creature’s mind to make it forget. Choose one creature within immediate range and make an Intellect roll. On a success, you erase up to the last five minutes of the creature’s memory."
  }),
  Nano_FarStep: createAbility({
    name: "Far Step",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 1,
    description:
      "You leap through the air and land some distance away. You can jump up, down, or across to anywhere you choose within long range if you have a clear and unobstructed path to that location. You land safely."
  }),
  Nano_MachineInterface: createAbility({
    name: "Machine Interface",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 1,
    description:
      "The difficulty of discerning the level, function, and activation of powered numenera devices that you touch is decreased by one step for one minute."
  }),
  Nano_MentalLink: createAbility({
    name: "Mental Link",
    cost: 1,
    pool: "Intellect",
    amount: 1,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 1,
    description:
      "You open a pathway to another creature’s mind via a light touch, which allows you to transmit thoughts and images to each other. The mental link remains regardless of distance and lasts for one hour. You can apply Effort to extend the duration by one hour per level of Effort."
  }),
  Nano_ResonanceField: createAbility({
    name: "Resonance Field",
    cost: 1,
    pool: "Intellect",
    amount: 1,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 1,
    description:
      "Faint lines in a color you choose form a tracery over your entire body and emit faint light for one minute. Whenever a creature within immediate range makes an attack against you, you can make an Intellect defense roll in place of the defense roll you would normally make. If you get a minor effect, the creature takes 1 point of damage. If you get a major effect, the creature takes 4 points of damage."
  }),
  Nano_SculptFlesh: createAbility({
    name: "Sculpt Flesh",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 1,
    description:
      "You cause a willing creature’s fingers to lengthen into claws and her teeth to grow into fangs. The effect lasts for ten minutes. The damage dealt by the target’s unarmed strikes increases to 4 points."
  }),
  Nano_Adaptation: createAbility({
    name: "Adaptation",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 2,
    description:
      "You adapt to a hostile environment for 28 hours. As a result, you can breathe safely, the temperature doesn’t kill you though it might be extremely uncomfortable or debilitating, crushing gravity doesn’t incapacitate or harm you though you might be seriously hindered, and so on. In extreme environments, the GM might increase the cost of activating this esotery to a maximum cost of 10 Intellect points. Roughly speaking, the cost should equal the amount of damage you would sustain in a given round. For example, if you enter a hostile environment that would normally deal 6 points of damage per round, using Adaptation to avoid that damage costs 6 points. You can protect other creatures in addition to yourself, but each additional creature costs you the same number of Intellect points as it costs to protect you. This esotery never protects against quick, instantaneous threats, like an attack with a weapon or a sudden explosion of fire."
  }),
  Nano_Flash: createAbility({
    name: "Flash",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 2,
    description:
      "You create an explosion of energy at a point within close range, affecting an area up to immediate range from that point. You must be able to see the location where you intend to center the explosion. The blast inflicts 2 points of damage to all creatures or objects within the area. Because this is an area attack, adding Effort to increase your damage works differently than it does for single-target attacks. If you apply a level of Effort to increase the damage, add 2 points of damage for each target, and even if you fail your attack roll, all targets in the area still take 1 point of damage."
  }),
  Nano_Hover: createAbility({
    name: "Hover",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 2,
    description:
      "You float slowly into the air. If you concentrate, you can control your movement to remain motionless in the air or float up to a short distance as your action; otherwise, you drift with the wind or with any momentum you have gained. This effect lasts for up to ten minutes."
  }),
  Nano_MindReading: createAbility({
    name: "Mind Reading",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 2,
    description:
      "You can read the surface thoughts of a creature within short range of you, even if the target doesn’t want you to. You must be able to see the target. Once you have established contact, you can read the target’s thoughts for up to one minute. If you or the target move out of range, the connection is broken."
  }),
  Nano_Stasis: createAbility({
    name: "Stasis",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 2,
    description:
      "You surround a foe of your size or smaller with scintillating energy, keeping it from moving or acting for one minute, as if frozen solid. You must be able to see the target, and it must be within short range. While in stasis, the target is impervious to harm, cannot be moved, and is immune to all effects."
  }),
  Nano_CuttingLight: createAbility({
    name: "Cutting Light",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 2,
    description:
      "You emit a thin beam of energized light from your hand in immediate range. This inflicts 5 points of damage to a single foe. It slices up to 1 foot of any material that is level 6 or less, and the material can be up to 1 foot thick."
  }),
  Nano_Fetch: createAbility({
    name: "Fetch",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 2,
    description:
      "You cause an object to disappear and reappear in your hands or somewhere else nearby. Choose one object that can fit inside a 5-foot cube and that you can see within long range. The object vanishes and appears in your hands or in an open space anywhere you choose within immediate range."
  }),
  Nano_ForceField: createAbility({
    name: "Force Field",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 2,
    description:
      "You create an invisible energy barrier around a creature or object you choose within short range. The force field moves with the creature or object and lasts for ten minutes. The target has +1 to Armor until the effect ends."
  }),
  Nano_OverloadMachine: createAbility({
    name: "Overload Machine",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 2,
    description:
      "You infuse a powered numenera device of less than level 3 with more energy than it can handle. If affected, the device is destroyed or disabled for at least one minute. You can apply Effort to increase the maximum level of the target, each level of Effort increasing the limit by 1."
  }),
  Nano_RetrieveMemories: createAbility({
    name: "Retrieve Memories",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 2,
    description:
      "You touch the remains of a recently slain creature and restore its mind long enough to learn information from it. Make an Intellect roll with difficulty based on how long the creature has been dead. On a success, the corpse awakens and communicates for about one minute before its brain dissolves."
  }),
  Nano_Reveal: createAbility({
    name: "Reveal",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 2,
    description:
      "You adjust a creature’s eyesight so that it can see normally in dim light and darkness. You can affect one willing creature within immediate range for one hour. You can apply Effort to affect more targets, each level of Effort affecting two additional targets."
  }),
  Nano_ShockToTheSystem: createAbility({
    name: "Shock to the System",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 2,
    description:
      "You flood the mind of a target within short range with disturbing images and ideas. Affected targets faint and collapse, remaining unconscious for two rounds unless they suffer damage. The GM modifies the difficulty based on logic and the nature of the target."
  }),
  Nano_SpeedRecovery: createAbility({
    name: "Speed Recovery",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 2,
    description:
      "You adjust a creature’s normal regenerative ability so that it recovers more quickly. One creature you choose within short range makes a recovery roll without having to spend the time to do so."
  }),
  Nano_Barrier: createAbility({
    name: "Barrier",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 3,
    description:
      "You create an opaque, stationary barrier of solid energy within immediate range. The barrier is 10 feet by 10 feet and of negligible thickness. It is a level 2 barrier and lasts for ten minutes. It can be placed anywhere it fits, whether against a solid object including the ground or floating in the air. Each level of Effort you apply strengthens the barrier by one level. For example, applying two levels of Effort creates a level 4 barrier."
  }),
  Nano_Countermeasures: createAbility({
    name: "Countermeasures",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 3,
    description:
      "You immediately end one ongoing numenera effect such as an effect created by an esotery within immediate range. Alternatively, you can use this as a defense action to cancel any incoming esotery targeted at you, or you can cancel any numenera device or the effect of any numenera device for 1d6 rounds. You must touch the effect or device to cancel it."
  }),
  Nano_EnergyProtection: createAbility({
    name: "Energy Protection",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 3,
    description:
      "Choose a discrete type of energy that you have experience with such as heat, sonic, electricity, and so on. You gain +10 to Armor against damage from that type of energy for ten minutes. Alternatively, you gain +1 to Armor against damage from that energy for 28 hours. You must be familiar with the type of energy; for example, if you have no experience with a certain kind of extradimensional energy, you can’t protect against it. In addition to the normal options for using Effort, you can choose to use Effort to protect more targets; each level of Effort used in this way affects up to two additional targets. You must touch additional targets to protect them."
  }),
  Nano_Sensor: createAbility({
    name: "Sensor",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 3,
    description:
      "You create an immobile, invisible sensor within immediate range that lasts for 28 hours. At any time during that duration, you can concentrate to see, hear, and smell through the sensor, no matter how far you move from it. The sensor doesn’t grant you sensory capabilities beyond the norm."
  }),
  Nano_TargetingEye: createAbility({
    name: "Targeting Eye",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 3,
    description:
      "You are trained in any physical ranged attack that is an esotery or comes from a numenera device. For example, you are trained when using an Onslaught force blast because it’s a physical attack, but not when using an Onslaught mindslice because it’s a mental attack."
  }),
  Nano_Accelerate: createAbility({
    name: "Accelerate",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 3,
    description:
      "You imbue a creature with vitality and energy, allowing it to act more quickly. One willing creature within immediate range accelerates for one minute and has an asset for initiative tasks and Speed defense rolls. You can apply Effort to affect additional targets, each level of Effort affecting one more target."
  }),
  Nano_Disassemble: createAbility({
    name: "Disassemble",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 3,
    description:
      "You cause an object to rapidly dismantle into ten pieces of equal weight. You must be able to see the object, it must be your size or smaller, and it cannot be worn or carried by another creature. The pieces gently fall to the ground around where the object stood."
  }),
  Nano_FabricateMinion: createAbility({
    name: "Fabricate Minion",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 3,
    description:
      "You fashion a machinelike minion from raw materials around you. The minion is a level 3 creature of your size or smaller and follows your instructions. It has a target number of 9, a health of 9, and inflicts 3 points of damage. It moves by walking and remains for one hour or until dead."
  }),
  Nano_FireAndIce: createAbility({
    name: "Fire and Ice",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 3,
    description:
      "You cause a target within short range to become very hot or very cold. If affected, the target suffers 3 points of ambient damage each round for up to three rounds, although a new roll is required each round to affect the target."
  }),
  Nano_Fling: createAbility({
    name: "Fling",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 3,
    description:
      "Choose a creature or object about your size or smaller within short range. You violently launch it a short distance in any direction. This is an Intellect attack that deals 4 points of damage."
  }),
  Nano_ImplantSuggestion: createAbility({
    name: "Implant Suggestion",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 3,
    description:
      "You implant a suggestion in the mind of a creature within immediate range. Describe a course of activity and the conditions under which the creature will perform it, then make an Intellect attack. If you succeed, the creature performs the activity if the conditions occur within the next 28 hours. If the suggestion would jeopardize the creature’s life, livelihood, loved ones, or property, the difficulty is increased by two steps."
  }),
  Nano_MutationEnhancement: createAbility({
    name: "Mutation Enhancement",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 3,
    description:
      "You touch a mutant and enhance her mutation. For the next ten minutes, any time the mutant uses her powers, she can choose one enhancement: all difficulties involved are reduced by one step, range is increased by one category, or damage inflicted is increased by 2 points."
  }),
  Nano_Invisibility: createAbility({
    name: "Invisibility",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 4,
    description:
      "You become invisible for ten minutes. While invisible, you are specialized in stealth and Speed defense tasks. This effect ends if you do something to reveal your presence or position—attacking, performing an esotery, using an ability, moving a large object, and so on. If this occurs, you can regain the remaining invisibility effect by taking an action to focus on hiding your position."
  }),
  Nano_MindControl: createAbility({
    name: "Mind Control",
    cost: 6,
    pool: "Intellect",
    amount: 6,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 4,
    description:
      "You control the actions of another creature you touch. This effect lasts for one minute. The target must be level 2 or lower. Once you have established control, you maintain mental contact with the target and sense what it senses. You can allow it to act freely or override its control on a case-by-case basis. In addition to the normal options for using Effort, you can choose to use Effort to increase the maximum level of the target or increase the duration by one minute. Smart Nanos use the Scan esotery on a creature to learn its level before trying to control its mind. When the Mind Control esotery ends, the creature doesn’t remember being controlled or anything it did while under your command."
  }),
  Nano_Regeneration: createAbility({
    name: "Regeneration",
    cost: 6,
    pool: "Intellect",
    amount: 6,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 4,
    description:
      "You restore points to a target’s Might or Speed Pool in one of two ways: either the chosen Pool regains up to 6 points, or it is restored to a total value of 12. You make this decision when you initiate this esotery. Points are regenerated at a rate of 1 point each round. You must maintain contact with the target the whole time. In no case can this raise a Pool higher than its maximum."
  }),
  Nano_Reshape: createAbility({
    name: "Reshape",
    cost: 5,
    pool: "Intellect",
    amount: 5,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 4,
    description:
      "You reshape matter within short range in an area no larger than a 5-foot cube. If you use only one action on this esotery, the changes you make are crude at best. If you spend at least ten minutes and succeed at an appropriate crafting task, which is hindered due to the circumstances, you can make complex changes to the material. You can’t change the nature of the material, only its shape. Thus, you can make a hole in a wall or floor, or you can seal one up. You can fashion a rudimentary sword from a large piece of iron. You can break or repair a chain. With multiple uses of this esotery, you could bring about large changes, making a bridge, a wall, or a similar structure."
  }),
  Nano_Slay: createAbility({
    name: "Slay",
    cost: 6,
    pool: "Intellect",
    amount: 6,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 4,
    description:
      "You gather disrupting energy in your fingertip and touch a creature. If the target is an NPC or a creature of level 3 or lower, it dies. If the target is a PC of any tier, they move down one step on the damage track."
  }),
  Nano_Construction: createAbility({
    name: "Construction",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 4,
    description:
      "You build a structure from nonliving materials drawn from your environment within long range. The structure can take any shape you choose and be large enough for up to one hundred people. It forms over ten minutes and lasts for 28 hours before collapsing into rubble."
  }),
  Nano_Exile: createAbility({
    name: "Exile",
    cost: 5,
    pool: "Intellect",
    amount: 5,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 4,
    description:
      "You send a target you touch into another random dimension or universe for ten minutes. At the end of that time, it returns to the precise spot it left."
  }),
  Nano_Ignition: createAbility({
    name: "Ignition",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 4,
    description:
      "You cause a creature or flammable object within short range to catch fire. On a successful Intellect attack, the target takes 6 points of ambient damage each round until the flames are extinguished."
  }),
  Nano_MatterCloud: createAbility({
    name: "Matter Cloud",
    cost: 5,
    pool: "Intellect",
    amount: 5,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 4,
    description:
      "Pebbles, dirt, sand, and debris rise into the air around you to form a swirling cloud that extends to immediate range and lasts for one minute. You have an asset on all Speed defense rolls while the cloud persists. You can use an action to abrade everything within immediate range, dealing 1 point of damage to each creature and object."
  }),
  Nano_Open: createAbility({
    name: "Open",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 4,
    description:
      "You tear apart the defenses of a creature within long range. Any energy-based defenses it has are negated for 1d6 + 1 rounds. If it has no energy defenses, its Armor is reduced by 2 for one minute. If it has neither, the difficulty of all attacks made against it is modified by one step to its detriment for one minute."
  }),
  Nano_Projection: createAbility({
    name: "Projection",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 4,
    description:
      "You project an image of yourself to any location you have seen or previously visited on the same world. The projection copies your appearance, movements, and sounds for ten minutes, and anyone present can see and hear you as if you were there."
  }),
  Nano_Wormhole: createAbility({
    name: "Wormhole",
    cost: 6,
    pool: "Intellect",
    amount: 6,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 4,
    description:
      "You create a doorway through time and space large enough for you and creatures of your size or smaller. One side appears within immediate range, and the other opens anywhere within long range. Anything entering one side exits the other. The door remains open for one minute or until you close it."
  }),
  Nano_AbsorbEnergy: createAbility({
    name: "Absorb Energy",
    cost: 7,
    pool: "Intellect",
    amount: 7,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 5,
    description:
      "You touch an object and absorb its energy. If you touch a cypher, you render it useless. If you touch an artifact, roll for the artifact’s depletion. If you touch another kind of powered machine or device, the GM determines whether its power is fully drained. In any case, you absorb energy from the object touched and regain 1d10 Intellect points. If this would give you more Intellect than your Pool’s maximum, the extra points are lost, and you must make a Might defense roll. The difficulty of the roll is equal to the number of points over your maximum you absorbed. If you fail the roll, you take 5 points of damage and are unable to act for one round. You can use this esotery as a defense action when you’re the target of an incoming esotery. Doing so cancels the incoming esotery, and you absorb the energy as if it were a device."
  }),
  Nano_DustToDust: createAbility({
    name: "Dust to Dust",
    cost: 7,
    pool: "Intellect",
    amount: 7,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 5,
    description:
      "You disintegrate one object that is smaller than you and whose level is less than or equal to your tier. You must touch the object to affect it. If the GM feels it appropriate to the circumstances, you can disintegrate a portion of an object the total volume of which is smaller than you rather than the entire thing."
  }),
  Nano_KnowingTheUnknown: createAbility({
    name: "Knowing the Unknown",
    cost: 6,
    pool: "Intellect",
    amount: 6,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 5,
    description:
      "Tapping into the datasphere, you can ask the GM one question and get a general answer. The GM assigns a level to the question, so the more obscure the answer, the more difficult the task. Generally, knowledge that you could find by looking somewhere other than your current location is level 1, and obscure knowledge of the past is level 7. Gaining knowledge of the future is impossible."
  }),
  Nano_Teleportation: createAbility({
    name: "Teleportation",
    cost: 6,
    pool: "Intellect",
    amount: 6,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 5,
    description:
      "You instantaneously transmit yourself to any location that you have seen or been to, no matter the distance, as long as it is on Earth or whatever world you’re currently on. In addition to the normal options for using Effort, you can choose to use Effort to bring other people with you; each level of Effort used in this way affects up to three additional targets. You must touch any additional targets."
  }),
  Nano_TrueSenses: createAbility({
    name: "True Senses",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 5,
    description:
      "You can see in complete darkness up to 50 feet as if it were dim light. You recognize holograms, disguises, optical illusions, sound mimicry, and other such tricks for all senses for what they are."
  }),
  Nano_BoostPhysicality: createAbility({
    name: "Boost Physicality",
    cost: 6,
    pool: "Intellect",
    amount: 6,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 5,
    description:
      "You touch another creature. That creature gains one of the following enhancements of its choice, which lasts for ten minutes: • Training in all Might tasks and Speed tasks • +2 Edge in Might and Speed • 4 additional points of damage Action."
  }),
  Nano_Concussion: createAbility({
    name: "Concussion",
    cost: 7,
    pool: "Intellect",
    amount: 7,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 5,
    description:
      "You cause a pulse of concussive force to explode out from a point you choose within long range. The pulse extends out in all directions, up to short range. Everything within the pulse’s area takes 5 points of damage. Even if you fail the attack roll, targets in the area take 1 point of damage. Action."
  }),
  Nano_Create: createAbility({
    name: "Create",
    cost: 7,
    pool: "Intellect",
    amount: 7,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 5,
    description:
      "You create something from nothing. You can create any item you choose that would ordinarily have a difficulty of 5 or less. Once created, the item lasts for a number of hours equal to 6 minus the difficulty to create the item. Thus, if you create a glowglobe (difficulty 5), it would last for one hour. Action."
  }),
  Nano_DivideYourMind: createAbility({
    name: "Divide Your Mind",
    cost: 7,
    pool: "Intellect",
    amount: 7,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 5,
    description:
      "You split your consciousness into two parts. For one minute, you can take two actions on each of your turns, but only one of them can be to use an esotery. Action."
  }),
  Nano_FastTravel: createAbility({
    name: "Fast Travel",
    cost: 7,
    pool: "Intellect",
    amount: 7,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 5,
    description:
      "You warp time and space so that you and up to ten other creatures within immediate distance travel overland at ten times the normal rate for up to eight hours. At this speed, most dangerous encounters or regions of rough terrain are ignored, though the GM may declare exceptions. Outright barriers still present a problem. Action to initiate."
  }),
  Nano_Stimulate: createAbility({
    name: "Stimulate",
    cost: 6,
    pool: "Intellect",
    amount: 6,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 5,
    description:
      "Touch a target. The difficulty of the next action it takes is decreased by three steps. Action."
  }),
  Nano_ControlWeather: createAbility({
    name: "Control Weather",
    cost: 10,
    pool: "Intellect",
    amount: 10,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 6,
    description:
      "You change the weather in your general region. If performed indoors, this esotery creates only minor weather effects, such as mist, mild temperature changes, and so on. If performed outside, you can create rain, fog, snow, wind, or any other kind of normal not overly severe weather. The change lasts for a natural length of time, so a storm might last for an hour, fog for two or three hours, and snow for a few hours or for ten minutes if it’s out of season. For the first ten minutes after activating this esotery, you can create more dramatic and specific effects, such as lightning strikes, giant hailstones, twisters, hurricane force winds, and so on. These effects must occur within 1,000 feet of your location. You must spend your turn concentrating to create an effect or to maintain it in a new round. These effects inflict 6 points of damage each round."
  }),
  Nano_MoveMountains: createAbility({
    name: "Move Mountains",
    cost: 9,
    pool: "Intellect",
    amount: 9,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 6,
    description:
      "You exert a tremendous amount of physical force within 250 feet of you. You can push up to 10 tons of material up to 50 feet. This force can collapse buildings, redirect small rivers, or perform other dramatic effects."
  }),
  Nano_TraverseTheWorlds: createAbility({
    name: "Traverse the Worlds",
    cost: 8,
    pool: "Intellect",
    amount: 8,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 6,
    description:
      "You instantaneously transmit yourself to another planet, dimension, plane, or level of reality. You must know that the destination exists; the GM will decide if you have enough information to confirm its existence and the level of difficulty to reach the destination. In addition to the normal options for using Effort, you can choose to use Effort to bring other people with you; each level of Effort used in this way affects up to three additional targets. You must touch any additional targets."
  }),
  Nano_UsurpCypher: createAbility({
    name: "Usurp Cypher",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 6,
    description:
      "Choose one cypher that you carry. The cypher must have an effect that is not instantaneous. You destroy the cypher and gain its power, which functions for you continuously. You can choose a cypher when you gain this ability, or you can wait and make the choice later. However, once you usurp a cypher’s power, you cannot later switch to a different cypher—the esotery works only once."
  }),
  Nano_Earthquake: createAbility({
    name: "Earthquake",
    cost: 10,
    pool: "Intellect",
    amount: 10,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 6,
    description:
      "You trigger an earthquake centered on a spot you can see within 1,000 feet (305 m). The ground within 250 feet (76 m) of that spot heaves and shakes for five minutes, causing widespread damage to structures and terrain in the area. Buildings made of wood, stone, or brick collapse, walls topple, cliffs crumble, ceilings cave in, some areas of ground rise up, and other areas sink. Characters inside collapsed buildings or beneath a crumbling cliff or falling wall are subject to a crush or a huge crush and may have to dig themselves free, as the GM decides. A crush inflicts 3 points of damage, and a huge crush deals 6 points. Furthermore, the force of the quake is sufficient to knock creatures to the ground and prevent them from standing until the shaking stops. Action to initiate."
  }),
  Nano_FreezeTime: createAbility({
    name: "Freeze Time",
    cost: 9,
    pool: "Intellect",
    amount: 9,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 6,
    description:
      "You cause time to stop flowing everywhere within immediate range for one minute. The effect immediately ends if you leave the area or if you use an action to end it early. The freezing affects everything in the area except you. Affected creatures are frozen in the moment when you used this esotery, and when the effect ends, they resume what they were doing as if no time had passed. Affected creatures and objects are impervious to all damage and cannot be moved or manipulated. You and everything outside the area act normally. Action to initiate."
  }),
  Nano_Relocate: createAbility({
    name: "Relocate",
    cost: 7,
    pool: "Intellect",
    amount: 7,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Nano",
    tier: 6,
    description:
      "Choose one creature or object within immediate range. You instantly transport it to a new position within long range that you can see. The new position can be any direction from you, but it cannot be inside a solid object. If you succeed on your roll, the target disappears and reappears in its new position. Action."
  }),
  //#endregion
  //#region Jack
  Nano_TrainedInArmor: createAbility({
    name: "Trained in Armor",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "You can wear armor for long periods of time without tiring and can compensate for slowed reactions from wearing armor. You can wear any kind of armor. You reduce the Speed Effort cost for wearing armor by 1."
  }),
  Jack_CreateDeadlyPoison: createAbility({
    name: "Create Deadly Poison",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "You create one dose of a level 2 poison that inflicts 5 points of damage. You can apply this poison to a weapon, food, or drink as part of the action of creating it. In addition to the normal options for using Effort, you can choose to use Effort to increase the level of the poison; each level of Effort used in this way increases the poison level by 1. If unused, the poison loses its potency after one hour."
  }),
  Jack_CritterCompanion: createAbility({
    name: "Critter Companion",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "A level 1 creature accompanies you and follows your instructions. This creature is no larger than a large cat and is normally some sort of domesticated species. You and the GM must work out the details of your creature, and you’ll probably make rolls for it in combat or when it takes actions. The critter companion acts on your turn. As a level 1 creature, it has a target number of 3 and a 3 health, and it inflicts 1 point of damage. Its movement is based on its creature type. If your critter companion dies, you can search an urban or wild environment for 1d6 days to find a new companion."
  }),
  Jack_FaceMorph: createAbility({
    name: "Face Morph",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "You alter your features and coloration for one hour, hiding your identity or impersonating someone. This affects only your face, not the rest of your body. You can’t perfectly duplicate someone else’s face, but you can be accurate enough to fool someone who knows that person casually. You have an asset in all tasks involving disguise. You must apply a level of Effort to be able to impersonate a different species."
  }),
  Jack_FleetOfFoot: createAbility({
    name: "Fleet of Foot",
    cost: 1,
    pool: "Speed",
    amount: 1,
    type: "Enabler",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "You can move a short distance as part of another action. You can move a long distance as your entire action for a turn. If you apply a level of Effort to this ability, you can move a long distance and make an attack as your entire action for a turn, but the attack is hindered."
  }),
  Jack_LateInspiration: createAbility({
    name: "Late Inspiration",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "You retry a task you failed within the past one minute, using the same difficulty and modifiers, except this time you have an asset on the task. If this retry fails, you can’t use this ability to retry it again."
  }),
  Jack_LinkSenses: createAbility({
    name: "Link Senses",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "You touch a willing creature and link its senses to yours for one minute. At any time during that duration, you can concentrate to see, hear, and smell what that creature is experiencing, instead of using your own senses. If you or the creature move out of long range, the connection is broken."
  }),
  Jack_PhasedPocket: createAbility({
    name: "Phased Pocket",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Enabler",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "You connect yourself for one hour to a small space that is out of phase and moves with you. You can access this space as if it were a convenient pocket or bag, but nobody else can perceive or access the space unless they have the ability to interact with transdimensional areas. The space can hold up to 1 cubic foot. The space is a part of you, so you can’t use it to carry more cyphers than your limit, a detonation cypher activated inside the space harms you, and so on. When the connection ends, anything in the space falls out. For each 2 additional Intellect points you spend, the pocket lasts an additional hour."
  }),
  Jack_Vanish: createAbility({
    name: "Vanish",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "You become invisible for a short amount of time. While invisible, you have an asset on stealth and Speed defense tasks. The invisibility ends at the end of your next turn, or if you do something to reveal your presence or position—attacking, using an ability, moving a large object, and so on."
  }),
  Jack_CombatRuse: createAbility({
    name: "Combat Ruse",
    cost: 1,
    pool: "Speed",
    amount: 1,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "You feint or juke to mislead your foe and foil its defenses. Choose a creature within short range. If you succeed on a Speed roll, the next character to attack that creature before the end of your next turn has an asset to its attack roll. Action."
  }),
  Jack_Decipher: createAbility({
    name: "Decipher",
    cost: 1,
    pool: "Intellect",
    amount: 1,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "If you spend one minute examining a piece of writing or code in a language you do not understand, you can make an Intellect roll of difficulty 3 or higher based on the complexity of the language or code. On a success, you get the gist of what the writing says. Action to initiate."
  }),
  Jack_GatherRumors: createAbility({
    name: "Gather Rumors",
    cost: 1,
    pool: "Intellect",
    amount: 1,
    type: "Enabler",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "When you spend a few hours in an inhabited urban environment about the size of a town or larger, the GM must tell you one rumor that pertains to the community. Instead of applying Effort to decrease the difficulty, you can apply Effort to learn additional rumors, with each level of Effort revealing one more rumor. Enabler."
  }),
  Jack_RopeTrick: createAbility({
    name: "Rope Trick",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "You are trained in all tasks requiring a rope. Further, you can set nonlethal traps with a rope that are one level higher than they would normally be to detect or avoid. Enabler."
  }),
  Jack_Sabotage: createAbility({
    name: "Sabotage",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "You are particularly good at bypassing locks and dismantling devices. You are trained in lockpicking, the numenera, and any task that involves sabotaging an object. Enabler."
  }),
  Jack_Tracer: createAbility({
    name: "Tracer",
    cost: 1,
    pool: "Intellect",
    amount: 1,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description:
      "You touch a creature. For the next hour, you know the creature’s direction relative to your current position, but you don’t know its distance from you. Action to initiate."
  }),
  Jack_Vision: createAbility({
    name: "Vision",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 1,
    description: "You can see clearly in dim light, very dim light, and darkness. Enabler."
  }),
  Jack_AugmentCypher: createAbility({
    name: "Augment Cypher",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Enabler",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "When you activate a cypher, add +1 to its level. In addition to the normal options for using Effort, you can choose to use Effort to increase the level of the cypher by an additional +1 per level of Effort applied. You can’t increase the cypher’s level above 10."
  }),
  Jack_CreateDebilitatingPoison: createAbility({
    name: "Create Debilitating Poison",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "You create one dose of a level 2 poison that hinders the poisoned creature’s actions for ten minutes. You can apply this poison to a weapon, food, or drink as part of the action of creating it. In addition to the normal options for using Effort, you can choose to use Effort to increase the level of the poison; each level of Effort used in this way increases the poison level by 1. If unused, the poison loses its potency after one hour."
  }),
  Jack_EncouragingPresence: createAbility({
    name: "Encouraging Presence",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description: "For one minute, allies within short range gain an asset on defense rolls."
  }),
  Jack_IllusoryDuplicate: createAbility({
    name: "Illusory Duplicate",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "You create a single image of yourself within immediate range. The image looks like you as you are now, including how you are dressed. The image can move, but it can’t move more than an immediate distance from where you created it. The illusion includes sound and smell. It lasts for ten minutes and changes as you direct. If you move beyond short range of the illusion, it vanishes."
  }),
  Jack_IntenseInteraction: createAbility({
    name: "Intense Interaction",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "You gain an asset on intimidating, persuading, and influencing people for ten minutes."
  }),
  Jack_RestfulPresence: createAbility({
    name: "Restful Presence",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "Creatures who make a recovery roll within short range of you add +1 to their roll."
  }),
  Jack_SkillWithDefense: createAbility({
    name: "Skill With Defense",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "Choose one type of defense task in which you are not already trained: Might, Speed, or Intellect. You are trained in defense tasks of that type. Unlike most tricks of the trade, you can select this trick up to three times. Each time you select it, you must choose a different type of defense task."
  }),
  Jack_Blackout: createAbility({
    name: "Blackout",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "You cause all light sources within short range—numenera or otherwise—to fade to darkness for ten minutes. Action."
  }),

  Jack_Contortionist: createAbility({
    name: "Contortionist",
    cost: 2,
    pool: "Speed",
    amount: 2,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "You can wriggle free from bindings or squeeze through a tight spot. You are trained in escaping. When you use an action to escape or move through a tight area, you can immediately use another action. You may use this action only to move. Enabler."
  }),

  Jack_CrowdControl: createAbility({
    name: "Crowd Control",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "If you succeed at an Intellect-based deception task, you capture and hold the attention of everyone within 90 feet (27 m) for up to ten minutes. The GM sets the difficulty based on the audience’s disposition. Action to initiate."
  }),

  Jack_EraseMemories: createAbility({
    name: "Erase Memories",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "You reach into a creature’s mind to make it forget. Choose one creature within immediate range and make an Intellect roll. On a success, you erase up to the last five minutes of the creature’s memory. The creature simply forgets anything it experienced during this time. Action."
  }),

  Jack_EyeForDetail: createAbility({
    name: "Eye for Detail",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "When you spend five minutes or so thoroughly exploring an area no larger than a typical room, you can ask the GM one question about the area. The GM must answer you truthfully. You cannot use this trick of the trade more than one time per area per 28 hours. Enabler."
  }),

  Jack_FarStep: createAbility({
    name: "Far Step",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "You leap through the air and land some distance away. You can jump up, down, or across to anywhere you choose within long range if you have a clear and unobstructed path to that location. You land safely. Action."
  }),

  Jack_HunkerDown: createAbility({
    name: "Hunker Down",
    cost: 3,
    pool: "Speed",
    amount: 3,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description: "When you have cover, you have an asset on Speed defense rolls. Enabler."
  }),

  Jack_Opportunist: createAbility({
    name: "Opportunist",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "You have an asset on any attack roll you make against a creature that has been attacked at some point during the round and is within immediate range. Enabler."
  }),

  Jack_QuickRecovery: createAbility({
    name: "Quick Recovery",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "Your second recovery roll usually requiring ten minutes takes only a single action, just like the first roll. Enabler."
  }),

  Jack_SenseAmbush: createAbility({
    name: "Sense Ambush",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description: "You are never treated as surprised by an attack. Enabler."
  }),

  Jack_SurpriseStrike: createAbility({
    name: "Surprise Strike",
    cost: 3,
    pool: "Speed",
    amount: 3,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "When you attack a creature you have surprised, the difficulty of your attack roll is reduced by one step, and on a success, you deal 1 additional point of damage. Enabler."
  }),

  Jack_Threaten: createAbility({
    name: "Threaten",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 2,
    description:
      "When you reduce a creature to 0 health, you deliver a vicious threat to another creature within immediate range. Make a Might roll. On a success, the difficulty of all Speed defense rolls made to resist the creature’s attacks is reduced by one step until the end of the next round. Enabler."
  }),
  Jack_FarHands: createAbility({
    name: "Far Hands",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 3,
    description:
      "You can use your tricks of the trade from one range category farther away than normal: immediate becomes short, short becomes long, long becomes very long. Using the trick at this increased distance hinders the task."
  }),
  Jack_MeticulousPlanner: createAbility({
    name: "Meticulous Planner",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 3,
    description:
      "If you spend a long time planning an action, you gain an asset on performing it. The time to study and plan for the action is ten times as long as it takes to perform the action. This benefit applies to only one roll; if you want to perform the task again with the benefit of an asset, you need to study and plan again."
  }),
  Jack_ObstacleRunning: createAbility({
    name: "Obstacle Running",
    cost: 3,
    pool: "Speed",
    amount: 3,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 3,
    description:
      "For the next minute, you can ignore obstacles that slow your movement, allowing you to travel at normal speed through areas with rubble, fences, tables, and similar objects that you would have to climb over or move around. This movement might include sliding on a railing, briefly running along a wall, or even stepping on a creature to boost yourself over something. If an obstacle would normally require a Might or Speed task to overcome, such as swinging on a rope, balancing on a rope, or jumping over a hole, you are trained at that task."
  }),
  Jack_RechargeCypher: createAbility({
    name: "Recharge Cypher",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 3,
    description:
      "You recharge a cypher that was used in the past ten minutes, allowing it to be used again. You must touch the cypher, spend 1 XP, and succeed at an understanding numenera roll, difficulty equal to the level of the cypher, to recharge it. Otherwise, the cypher remains spent and useless. Some cyphers cannot be recharged in this way. In addition to the normal options for using Effort, you can choose to use Effort to recharge a cypher that was used more than ten minutes ago; each level of Effort used in this way extends the time period by ten minutes."
  }),
  Jack_SkillWithAttacks: createAbility({
    name: "Skill With Attacks",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 3,
    description:
      "Choose one type of attack in which you are not already trained: light bashing, light bladed, light ranged, medium bashing, medium bladed, medium ranged, heavy bashing, heavy bladed, or heavy ranged. You are trained in attacks using that type of weapon."
  }),
  Jack_ControlledFall: createAbility({
    name: "Controlled Fall",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 3,
    description:
      "When you fall while you are able to use actions and within reach of a vertical surface, you can attempt to slow your fall. Make a Speed roll. The difficulty is 1 for every 20 feet (6.1 m) you fall. On a success, you take half damage from the fall. If you reduce the difficulty to 0, you take no damage. Enabler."
  }),

  Jack_Gambler: createAbility({
    name: "Gambler",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 3,
    description:
      "Each day, choose two different numbers from 2 to 16. One number is your lucky number, and the other is your unlucky number. Whenever you make a roll that day and get a number matching your lucky number, the difficulty of your next task is reduced by one step. Whenever you make a roll that day and get a number matching your unlucky number, the difficulty of your next task is increased by one step. Enabler."
  }),

  Jack_Improvise: createAbility({
    name: "Improvise",
    cost: 2,
    pool: "Intellect",
    amount: 2,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 3,
    description:
      "When you perform a task in which you are not trained, you can improvise to gain an asset for the task. The asset might be a tool you cobble together, a sudden insight into overcoming a problem, or a rush of dumb luck. Enabler."
  }),

  Jack_Revelation: createAbility({
    name: "Revelation",
    cost: 3,
    pool: "Intellect",
    amount: 3,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 3,
    description:
      "Choose one of your stats. When you succeed on a task using that stat and you applied at least one level of Effort, the difficulty of the next task you perform within one minute using that stat is reduced by one step. Enabler."
  }),

  Jack_ShockToTheSystem: createAbility({
    name: "Shock to the System",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 3,
    description:
      "You flood the mind of a target within short range with disturbing images and ideas. Affected targets faint and collapse to the ground, remaining unconscious for two rounds this is instantly negated if they suffer any damage. GMs will modify the difficulty of the roll to affect a target based on logic—it’s probably easier to make a shopkeeper faint than a rampaging margr, even if they’re both the same level. Action."
  }),

  Jack_Subterfuge: createAbility({
    name: "Subterfuge",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 3,
    description:
      "When you move no more than a short distance, you can move without making a sound, regardless of the surface you move across. Enabler."
  }),

  Jack_ToolMastery: createAbility({
    name: "Tool Mastery",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 3,
    description:
      "When you have an asset from using a tool, you reduce the time it takes to perform the task by half minimum one round. Enabler."
  }),
  Jack_BypassBarrier: createAbility({
    name: "Bypass Barrier",
    cost: 6,
    pool: "Intellect",
    amount: 6,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 4,
    description:
      "You get past a door, force field, or other barrier up to 3 feet thick that is blocking your way. Depending on the barrier, this might involve finding a weak spot you can push through, luckily pressing the right button, or even weirder explanations like touching a thin place between dimensions or an unexpected interaction with numenera you carry. The difficulty of the task is the level of the barrier. This trick allows you alone to pass through, not anyone else, and the way through closes at the end of your turn, which might mean you’re trapped on the far side. You have an asset in any attempts to get through it again. In addition to the normal options for using Effort, you can choose to use Effort to increase the maximum thickness of the barrier, each level adding 3 feet."
  }),
  Jack_CrowdControl: createAbility({
    name: "Crowd Control",
    cost: 6,
    pool: "Intellect",
    amount: 6,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 4,
    description:
      "You control the actions of up to five creatures in short range. This effect lasts for one minute. All targets must be level 2 or lower. Your control is limited to simple verbal commands like stop, run away, follow that Glaive, look over there, or get out of my way. All affected creatures respond to the command unless you specifically command them otherwise. In addition to the normal options for using Effort, you can choose to use Effort to increase the maximum level of the targets or affect an additional five people. When the Crowd Control trick ends, the creatures remember your commands but don’t remember being controlled; your commands seemed reasonable at the time."
  }),
  Jack_IllusoryEvasion: createAbility({
    name: "Illusory Evasion",
    cost: 5,
    pool: "Intellect",
    amount: 5,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 4,
    description:
      "When you are hit by an attack, you teleport an immediate distance away, leaving behind an illusory copy of yourself to be struck by that attack instead of you. This destroys the illusion but leaves you unharmed by the attack. If the attack affects an area and the teleportation can’t get you out of that area, the attack still affects you normally."
  }),
  Jack_MemoryBecomesAction: createAbility({
    name: "Memory Becomes Action",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Enabler",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 4,
    description:
      "You can duplicate a one-action esotery, fighting move, or trick of the trade, performing it as if it were natural for you. You must have seen the ability used within the past week, it must be third tier or lower, and it must be an ability with a point cost. In addition to the point cost of Memory Becomes Action, you must pay the Might, Speed, or Intellect cost of the ability you are copying. In addition to the normal options for using Effort, you can choose to use Effort to copy an ability you saw longer than one week ago; each level of Effort used in this way extends the time period by one week."
  }),
  Jack_Ambusher: createAbility({
    name: "Ambusher",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 4,
    description:
      "When you attack a creature that has not yet acted during the first round of combat, the difficulty of your attack is reduced by one step. Enabler."
  }),

  Jack_ConfoundingBanter: createAbility({
    name: "Confounding Banter",
    cost: 4,
    pool: "Intellect",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 4,
    description:
      "You spew a stream of nonsense to distract a foe. Make an Intellect roll against a creature within immediate range. On a success, the difficulty of the defense roll against the creature’s next attack before the end of the next round is reduced by one step. Action."
  }),

  Jack_DeadlyAim: createAbility({
    name: "Deadly Aim",
    cost: 4,
    pool: "Speed",
    amount: 4,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 4,
    description:
      "For the next minute, all ranged attacks you make inflict 2 additional points of damage. Action to initiate."
  }),

  Jack_ImplantSuggestion: createAbility({
    name: "Implant Suggestion",
    cost: 5,
    pool: "Intellect",
    amount: 5,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 4,
    description:
      "You implant a suggestion in the mind of a creature within immediate range. Describe a course of activity to the creature and the conditions under which the creature will perform it. The course of activity must be within the creature’s capabilities, and the conditions under which it would perform the activity must be something that directly affects the creature or occurs in its immediate environment. Then make an Intellect attack against that creature. If you succeed, you implant the suggestion, and if the conditions occur within the next 28 hours, the creature does as you suggest. If you attempt to implant a suggestion that would jeopardize the creature’s life, livelihood, loved ones, or property, the difficulty of the task is increased by two steps. Action."
  }),

  Jack_Outwit: createAbility({
    name: "Outwit",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 4,
    description:
      "When you make a Speed defense roll, you can use Intellect in place of your Speed. Enabler."
  }),

  Jack_PreternaturalSenses: createAbility({
    name: "Preternatural Senses",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 4,
    description:
      "While you are conscious and able to use an action, you cannot be surprised. In addition, you are trained in initiative actions. Enabler."
  }),

  Jack_SeizeOpportunity: createAbility({
    name: "Seize Opportunity",
    cost: 5,
    pool: "Speed",
    amount: 5,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 4,
    description:
      "If you succeed on a Speed defense roll to resist an attack, you gain an action. You can use it immediately even if you have already taken a turn in the round. If you use this action to attack, the difficulty of your attack is reduced by one step. You don’t take an action during the next round. Enabler."
  }),

  Jack_TumblingMoves: createAbility({
    name: "Tumbling Moves",
    cost: 5,
    pool: "Speed",
    amount: 5,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 4,
    description:
      "When you use an action to move, the difficulty of all Speed defense rolls is reduced by one step until the end of your next turn. Enabler."
  }),
  Jack_EffectiveSkill: createAbility({
    name: "Effective Skill",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 5,
    description:
      "Choose one non-combat skill when you gain this ability. You get a minor effect with that skill when you roll a natural 14 or higher. You get a major effect with that skill when you roll a natural 19 or higher. Unlike most tricks of the trade, you can select this trick more than once. Each time you select it, you must choose a different non-combat skill."
  }),
  Jack_Jaunt: createAbility({
    name: "Jaunt",
    cost: 5,
    pool: "Intellect",
    amount: 5,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 5,
    description:
      "You instantaneously teleport yourself to any location within a long distance that you can see. In addition to the normal options for using Effort, you can choose to use Effort to increase the distance you can travel; each level of Effort used in this way increases the range by another 100 feet."
  }),
  Jack_MasteryWithDefense: createAbility({
    name: "Mastery With Defense",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 5,
    description:
      "Choose one type of defense task in which you are trained: Might, Speed, or Intellect. You are specialized in defense tasks of that type. Unlike most tricks of the trade, you can select this trick up to three times. Each time you select it, you must choose a different type of defense task."
  }),
  Jack_StunAttack: createAbility({
    name: "Stun Attack",
    cost: 6,
    pool: "Speed",
    amount: 6,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 5,
    description:
      "You attempt a difficulty 5 Speed action to stun a creature as part of your melee or ranged attack. If you succeed, your attack inflicts its normal damage and stuns the creature for one round, causing it to lose its next turn. If you fail, you still make your normal attack roll, but you don’t stun the opponent if you hit."
  }),
  Jack_SubtleTricks: createAbility({
    name: "Subtle Tricks",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 5,
    description:
      "You can use your skills and tricks of the trade in ways that don’t look like you’re doing anything. If the skill or trick would normally require an obvious movement, phrase, or other action by you, it instead seems to happen on its own. This ability usually only works up to an immediate distance. You still must spend points and make rolls to use your skills and tricks with this ability. Performing a trick in a subtle way hinders the task. This ability can’t be used to conceal your attack or defense rolls."
  }),
  Jack_TeachTrick: createAbility({
    name: "Teach Trick",
    cost: 5,
    pool: "Intellect",
    amount: 5,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 5,
    description:
      "You spend an hour instructing someone on how to perform a trick of the trade that you know. The trick must be no higher than fourth tier. For one hour after you teach them, the student can perform that trick of the trade as if it were natural for them. They must pay the Might, Speed, or Intellect cost to use that trick. The student must be able to understand your instructions. In addition to the normal options for using Effort, you can choose to use Effort to increase how long the student can use the trick or to teach additional students at the same time; each level of Effort used in this way increases the duration by one hour or the number of students by one."
  }),
  Jack_Mask: createAbility({
    name: "Mask",
    cost: 5,
    pool: "Intellect",
    amount: 5,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 5,
    description:
      "You transform your body to become someone else. You can change any physical characteristic you wish, including coloration, height, weight, gender, and distinguishing markings. You may also change the appearance of whatever you are wearing or carrying. Your stats, as well as the stats of your items, are unchanged. You remain in this form for up to 28 hours or until you use an action to resume your normal appearance. Action to initiate."
  }),

  Jack_Open: createAbility({
    name: "Open",
    cost: 5,
    pool: "Intellect",
    amount: 5,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 5,
    description:
      "You tear apart the defenses of a creature within long range. Any energy-based defenses such as a force field or a Ward esotery it has are negated for 1d6 + 1 rounds. If the creature has no energy defenses, its Armor is reduced by 2 for one minute. If it has no energy-based defenses or Armor, the difficulty of all attacks made against the creature is modified by one step to its detriment for one minute. Action."
  }),

  Jack_UncannyLuck: createAbility({
    name: "Uncanny Luck",
    cost: 4,
    pool: "Speed",
    amount: 4,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 5,
    description:
      "When you roll for a task and succeed, you can roll again. If the second number rolled is higher than the first, you get a minor effect. If you roll the same number again, you get a major effect. Enabler."
  }),

  Jack_Vigilant: createAbility({
    name: "Vigilant",
    cost: 7,
    pool: "Might",
    amount: 7,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 5,
    description:
      "When you would normally be dazed or stunned, you are not dazed or stunned. Enabler."
  }),
  Jack_BlurringSpeed: createAbility({
    name: "Blurring Speed",
    cost: 7,
    pool: "Speed",
    amount: 7,
    type: "Enabler",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 6,
    description:
      "You move so quickly that until your next turn, you look like a blur. While you are blurred, if you apply Effort to a melee attack task or Speed defense task, you get a free level of Effort on that task; you can move a short distance as part of another action or a long distance as your entire action."
  }),
  Jack_Doppeljack: createAbility({
    name: "Doppeljack",
    cost: 7,
    pool: "Might",
    amount: 7,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 6,
    description:
      "A perfect copy of you appears within an immediate distance. The doppeljack is a level 6 NPC with 18 health. It has your mind and memories, and you control it as if it were you in another body. If the doppeljack uses any of your abilities that cost points, those points come from your Pools. Controlling two bodies at once is difficult and distracting; while this ability is active, all tasks performed by you or the doppeljack are hindered. The doppeljack has no equipment other than simple clothing. It remains for up to one minute, but disappears if killed or if you use an action to dismiss it. If the doppeljack is killed, you take 6 points of damage that ignore Armor, and you lose your next action. If you are killed while the doppeljack is present, you live on as the doppeljack. In addition to the normal options for using Effort, you can choose to use Effort to increase the duration of this ability; each level of Effort used in this way adds one minute to the doppeljack’s existence."
  }),
  Jack_ImpossibleWalk: createAbility({
    name: "Impossible Walk",
    cost: 5,
    pool: "Speed",
    amount: 5,
    type: "Action",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 6,
    description:
      "You can walk, crawl, or run on steep inclines and horizontal surfaces for the next minute as if they were flat ground. When using this ability, down for you is either the surface you are walking on or the normal orientation of gravity. If you apply one level of Effort, you can also walk on the ceiling or on a liquid or semi-liquid surface such as water, mud, quicksand, or lava. If you apply two levels of Effort, you can also walk on air as if it were solid ground."
  }),
  Jack_MasteryWithAttacks: createAbility({
    name: "Mastery With Attacks",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 6,
    description:
      "Choose one type of attack in which you are trained: light bashing, light bladed, light ranged, medium bashing, medium bladed, medium ranged, heavy bashing, heavy bladed, or heavy ranged. You are specialized in attacks using that type of weapon."
  }),
  Jack_OutsideReality: createAbility({
    name: "Outside Reality",
    cost: 6,
    pool: "Intellect",
    amount: 6,
    type: "Enabler",
    canUseEffort: true,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 6,
    description:
      "You exist outside of everything until the start of your next turn. To you, a few seconds pass while you are alone in a cool void. To everyone else, you seem to vanish for a few seconds and reappear in the same place. While in this unreal state, you can use abilities or objects on yourself, but you can’t perceive, interact with, or affect the rest of the world, and vice versa. Time-based effects already on you are paused while you exist outside reality, but when this ability ends they resume as if no time had passed. In addition to the normal options for using Effort, you can choose to use Effort to increase the duration; each level of Effort used in this way adds one round to how long you spend outside reality."
  }),
  Jack_RapidRecovery: createAbility({
    name: "Rapid Recovery",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 6,
    description:
      "You can make most recovery rolls faster than normal. You can make your one-action recovery roll as part of another action or when it isn’t your turn, your ten-minute recovery roll takes you only one action, and your one-hour recovery roll takes you only ten minutes. If you make a recovery roll when it isn’t your turn, until the end of your next turn all of your tasks are hindered."
  }),
  Jack_ExploitAdvantage: createAbility({
    name: "Exploit Advantage",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 6,
    description:
      "Whenever you roll and you have an asset for that roll, the difficulty is also reduced by one step. Enabler."
  }),
  Jack_InspiringSuccess: createAbility({
    name: "Inspiring Success",
    cost: 6,
    pool: "Intellect",
    amount: 6,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 6,
    description:
      "Choose a stat. When you succeed on a roll to perform a task related to that stat and you applied at least one level of Effort, you may choose another PC within short range. That PC has an asset for the next task she attempts using that stat before the end of your next turn. Enabler."
  }),
  Jack_SpringAway: createAbility({
    name: "Spring Away",
    cost: 6,
    pool: "Speed",
    amount: 6,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 6,
    description:
      "Whenever you succeed on a Speed defense roll, you can immediately move up to a short distance. You cannot use this ability more than once in a given round. Enabler."
  }),
  Jack_Stimulate: createAbility({
    name: "Stimulate",
    cost: 6,
    pool: "Intellect",
    amount: 6,
    type: "Action",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 6,
    description:
      "Touch a target. The difficulty of the next action it takes is decreased by three steps. Action."
  }),
  Jack_TwistOfFate: createAbility({
    name: "Twist of Fate",
    cost: 0,
    pool: "None",
    amount: 0,
    type: "Enabler",
    canUseEffort: false,
    favorite: false,
    active: false,
    characterType: "Jack",
    tier: 6,
    description:
      "When you roll a 1 on the die, you can reroll. You must use the new result, even if it is another 1. Enabler."
  })

  //#endregion
};
