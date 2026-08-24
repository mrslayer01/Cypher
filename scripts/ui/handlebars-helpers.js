export function loadAllActorHandlerbarsHelpers() {
  Handlebars.registerHelper("normalize", function (text) {
    if (!text || typeof text !== "string") return "";

    // Trim and collapse whitespace
    let cleaned = text.trim().replace(/\s+/g, " ");

    // Lowercase everything first
    cleaned = cleaned.toLowerCase();

    // Capitalize standalone "i"
    cleaned = cleaned.replace(/\bi\b/g, "I");

    // Capitalize the first letter of each sentence
    cleaned = cleaned.replace(/(^\s*[a-z])|([.!?]\s*[a-z])/g, (match) => {
      return match.toUpperCase();
    });

    return cleaned;
  });

  Handlebars.registerHelper("in", function (value, ...options) {
    const types = options.slice(0, -1); // last arg is Handlebars options object
    return types.includes(value);
  });

  Handlebars.registerHelper("range", function (start, end) {
    const arr = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  });

  Handlebars.registerHelper("ifEquals", function (a, b, options) {
    return a == b ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("skillLevel", function (skill) {
    if (skill.specialized.choice) return "Specialized";
    if (skill.trained.choice) return "Trained";
    if (skill.practiced.choice) return "Practiced";
    if (skill.inability.choice) return "Inability";
    return "Unknown";
  });

  Handlebars.registerHelper("sum", function (a, b) {
    a = Number(a) || 0;
    b = Number(b) || 0;
    return a + b;
  });

  Handlebars.registerHelper("json", function (context) {
    return JSON.stringify(context, null, 2);
  });

  Handlebars.registerHelper("isGM", () => game.user.isGM);

  Handlebars.registerHelper("inc", function (value) {
    return parseInt(value) + 1;
  });
}
