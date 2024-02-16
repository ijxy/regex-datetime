export type Template = (tokens: typeof TOKEN_MAP) => string;

export function hydrateTemplate(template: Template, values: Record<Token, string>) {
  const dehydrated = escapeString(template(TOKEN_MAP));
  return replaceTokens(dehydrated, values);
}

type Token = keyof typeof TOKEN_MAP;

const TOKEN_MAP = Object.freeze({
  /**
   * four-digit year
   */
  YYYY: toTokenValue("YYYY"),

  /**
   * two-digit month (01 through 12)
   */
  MM: toTokenValue("MM"),

  /**
   * two-digit day of month (01 through 31)
   */
  DD: toTokenValue("DD"),

  /**
   * two digits of hour (00 through 23)
   */
  hh: toTokenValue("hh"),

  /**
   * two digits of minute (00 through 59)
   */
  mm: toTokenValue("mm"),

  /**
   * two digits of second (00 through 59)
   */
  ss: toTokenValue("ss"),

  /**
   * three digits of millisecond (000 through 999)
   */
  sss: toTokenValue("sss"),

  /**
   * time zone designator (Z or +hh:mm or -hh:mm)
   */
  ZZ: toTokenValue("ZZ"),
});

function toTokenValue(s: string) {
  return `_TOKEN_${s}_`;
}

function replaceTokens(template: string, values: typeof TOKEN_MAP): string {
  return Object.entries(TOKEN_MAP)
    .sort((a, b) => b[1].length - a[1].length)
    .reduce(
      (p, [k, v]) => p.replace(new RegExp(v, "g"), values[k as keyof typeof TOKEN_MAP]),
      template,
    );
}

function escapeString(s: string) {
  return s.replace(/[{}|()[\]\/\\^$?+*.]/g, "\\$&");
}
