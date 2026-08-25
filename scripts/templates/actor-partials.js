export async function ActorPartials() {
  ActorHeaderPartials();
  ActorLoosePartials();
}

async function ActorMainPartials() {
  const partials = ["main"];

  for (const p of partials) {
    const path = `systems/cypher/templates/actor/partials/main/${p}.hbs`;

    // Load template text
    const templateText = await fetch(path).then((r) => r.text());

    // Compile template
    const compiled = Handlebars.compile(templateText);

    // Register partial under its name
    Handlebars.registerPartial(p, compiled);
  }
}

async function ActorHeaderPartials() {
  const partials = [
    "character-bio",
    "character-portrait",
    "character-header",
    "character-stats",
    "character-extra",
    "character-recovery",
    "character-damage-track"
  ];

  for (const p of partials) {
    const path = `systems/cypher/templates/actor/partials/header/${p}.hbs`;

    // Load template text
    const templateText = await fetch(path).then((r) => r.text());

    // Compile template
    const compiled = Handlebars.compile(templateText);

    // Register partial under its name
    Handlebars.registerPartial(p, compiled);
  }
}

async function ActorLoosePartials() {
  const partials = ["main", "inventory", "skills", "abilities", "advancements", "extras"];

  for (const p of partials) {
    const path = `systems/cypher/templates/actor/partials/${p}.hbs`;

    // Load template text
    const templateText = await fetch(path).then((r) => r.text());

    // Compile template
    const compiled = Handlebars.compile(templateText);

    // Register partial under its name
    Handlebars.registerPartial(p, compiled);
  }
}
