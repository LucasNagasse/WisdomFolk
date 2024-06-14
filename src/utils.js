// declaração dos caracteres identificadores de texto:
const textIdentifierChars = `\\"'\``;

// função para formatar valores:
function formatValue(value) {
  for (let char of textIdentifierChars) {
    value = value.toString().replaceAll(char, `\\${char}`);
  }
  return value;
}

module.exports = {
  formatValue,
};
