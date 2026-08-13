export async function ItemHeaderPartials() {
  const partials = [
    "item-equipment-header",
    "item-cypher-header",
    "item-skill-header",
    "item-special-header",
    "item-attack-header",
    "item-armor-header",
    "item-weapon-header"
  ];

  for (const p of partials) {
    const path = `systems/cypher/templates/item/partials/header/${p}.hbs`;

    // Load template text
    const templateText = await fetch(path).then((r) => r.text());

    // Compile template
    const compiled = Handlebars.compile(templateText);

    // Register partial under its name
    Handlebars.registerPartial(p, compiled);
  }
}
