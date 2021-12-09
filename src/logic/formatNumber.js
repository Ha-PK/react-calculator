export default function formatNumber(input) {
  let value = String(input)
    .replaceAll("null", "0")
    .replaceAll("--", "")
    .replaceAll(",", "")
    .match(/^-?\d+(\.\d*)?/g);

  if (!value) {
    return "0";
  }

  value = value[0];

  let lastChar = value.slice(-1) === "." ? "." : "";

  value = Math.round(Number(value) * 10e9) / 10e9;

  let [intergerPortion, remainder] = String(value).split(".");

  let result = Number(intergerPortion).toLocaleString("en");

  if (lastChar) {
    result += ".";
  }

  if (remainder !== undefined) {
    result += "." + remainder;
  }

  return result === 0 ? null : result;
}
