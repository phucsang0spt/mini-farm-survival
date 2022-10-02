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

function getBaseOf(num: number, div: number) {
  return Math.floor(Math.log(num) / Math.log(div));
}

function isDecimalOK(num: number) {
  const decimal = num - Math.floor(num);
  return decimal * 100 >= 1;
}

const AlphaHash = {
  1: "K",
  4: "M",
  7: "B",
  10: "T",
  13: "A",
};

export function valueToAlpha(num: number, withCurrency = false) {
  const suffix = withCurrency ? " $" : "";
  if (num < 1000) {
    return `${isDecimalOK(num) ? num.toFixed(2) : Math.round(num)}` + suffix;
  }
  const baseOfThousand = getBaseOf(num, 1000);
  const valueWithBase = Math.pow(1000, baseOfThousand);

  const value = num / valueWithBase;

  return `${isDecimalOK(value) ? value.toFixed(2) : Math.round(value)}${
    (AlphaHash as any)[baseOfThousand] || AlphaHash["13"]
  }${suffix}`;
}

export function msToTimer(_ms: number) {
  const ms = _ms / 1000;
  const hours = Math.floor(ms / 3600);
  let remainSeconds = ms - hours * 3600;
  const minutes = Math.floor(remainSeconds / 60);
  remainSeconds = remainSeconds - minutes * 60;

  return `${padL(hours)}:${padL(minutes)}:${padL(Math.round(remainSeconds))}`;
}

export function padL(a: number, b = 2) {
  //string/number,length=2
  return (new Array(b || 2).join("0") + a).slice(-b);
}
