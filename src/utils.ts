export function formatCurrency(value: number) {
  const n = 2;
  const x = 3;
  const re = "\\d(?=(\\d{" + x + "})+" + (n > 0 ? "\\." : "$") + ")";
  return value.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
}

export function toText(obj: Record<string, any> | Record<string, any>[]) {
  const arr = Array.isArray(obj) ? obj : [obj];
  try {
    return `[${arr
      .map((o) =>
        o && typeof o === "object"
          ? `{${Object.keys(o)
              .map((k) => `${k}: ${o[k]}`)
              .join(", ")}}`
          : o
      )
      .join(", ")}]`;
  } catch (error) {
    return obj;
  }
}
