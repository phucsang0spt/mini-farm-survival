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

export function paginatedList<I = any>(list: I[], pageSize: number) {
  const rows = Math.ceil(list.length / pageSize);
  return Array.from({ length: rows }).map((_, i) => {
    const start = i * pageSize;
    const end = start + pageSize;
    return list.slice(start, end);
  });
}

export function genId(length = 12) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
