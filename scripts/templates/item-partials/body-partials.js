export async function ItemMainPartials() {
  const partials = ["item-arc-main", "item-arc-steps"];

  for (const p of partials) {
    const path = `systems/cypher/templates/item/partials/body/${p}.hbs`;

    // Load template text
    const templateText = await fetch(path).then((r) => r.text());

    // Compile template
    const compiled = Handlebars.compile(templateText);

    // Register partial under its name
    Handlebars.registerPartial(p, compiled);
  }
}
