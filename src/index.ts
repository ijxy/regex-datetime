import { Template, hydrateTemplate } from "./template";

export function isoTime() {
  return customDateTime(({ hh, mm, ss, sss, ZZ }) => {
    return `${hh}:${mm}:${ss}.${sss}${ZZ}`;
  })();
}

export function isoDate() {
  return customDateTime(({ YYYY, MM, DD }) => {
    return `${YYYY}-${MM}-${DD}`;
  })();
}

export function isoDateTime() {
  return customDateTime(({ YYYY, MM, DD, hh, mm, ss, sss, ZZ }) => {
    return `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}.${sss}${ZZ}`;
  })();
}

export function customDateTime(template: Template) {
  const date_31 = hydrateTemplate(template, {
    YYYY,
    MM: MM_31,
    DD: DD_31,
    hh,
    mm,
    ss,
    sss,
    ZZ,
  });
  const date_30 = hydrateTemplate(template, {
    YYYY,
    MM: MM_30,
    DD: DD_30,
    hh,
    mm,
    ss,
    sss,
    ZZ,
  });
  const date_28 = hydrateTemplate(template, {
    YYYY,
    MM: MM_28,
    DD: DD_28,
    hh,
    mm,
    ss,
    sss,
    ZZ,
  });
  const date_29 = hydrateTemplate(template, {
    YYYY: YYYY_leap,
    MM: MM_29,
    DD: DD_29,
    hh,
    mm,
    ss,
    sss,
    ZZ,
  });
  return () => new RegExp(`^${date_31}|${date_30}|${date_28}|${date_29}$`);
}

const hh = "(?:[01][0-9]|2[0-3])";
const mm = "(?:[0-5][0-9])";
const ss = "(?:[0-5][0-9])";
const sss = "(?:[0-9]{3})";
const ZZ = `(?:(?:[+-]?${hh}:${mm})|Z)`;

const YYYY = "(?:[0-9]{4})";
const YYYY_leap_century = `(?:(?:0[048]|[13579][26]|[2468][048])00)`; // a multiple of 400, valid up to 9999
const YYYY_leap_noncentury = `(?:[0-9]{2}(?:0[48]|[13579][26]|[2468][048]))`; // a non-century multiple of 4, valid up to 9999
const YYYY_leap = `(?:${YYYY_leap_noncentury}|${YYYY_leap_century})`;

const DD_31 = "(?:0[1-9]|[12][0-9]|3[01])";
const DD_30 = "(?:0[1-9]|[12][0-9]|30)";
const DD_28 = "(?:0[1-9]|1[0-9]|2[0-8])";
const DD_29 = "(?:0[1-9]|[12][0-9])";

const MM_31 = "(?:01|03|05|07|08|10|12)";
const MM_30 = "(?:04|06|09|11)";
const MM_28 = "(?:02)";
const MM_29 = "(?:02)";
