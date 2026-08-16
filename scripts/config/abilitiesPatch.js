const fs = require("fs");

const input = "abilities.js";          // your original file
const output = "abilities_prefixed.js"; // output file

const text = fs.readFileSync(input, "utf8");
const lines = text.split("\n");

let currentType = null;
let result = [];

for (let line of lines) {
  // Detect characterType: "Glaive"
  const typeMatch = line.match(/characterType:\s*"([^"]+)"/);
  if (typeMatch) {
    currentType = typeMatch[1];
  }

  // Detect ability key lines: KeyName: createAbility({
  const keyMatch = line.match(/^(\s*)([A-Za-z0-9_]+):\s*createAbility/);
  if (keyMatch && currentType) {
    const indent = keyMatch[1];
    const key = keyMatch[2];
    const newKey = `${currentType}_${key}`;
    result.push(`${indent}${newKey}: createAbility({`);
    continue;
  }

  result.push(line);
}

fs.writeFileSync(output, result.join("\n"), "utf8");
console.log("Done! Output written to", output);
