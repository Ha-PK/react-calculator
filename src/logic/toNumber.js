export default function toNumber(input) {
  return Number(String(input).replaceAll(",", ""));
}
