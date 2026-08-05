export async function ActorHeaderPartials() {
  const partials = ["bio", "character-portrait", "header", "stats"];

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
