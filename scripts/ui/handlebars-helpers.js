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
}
