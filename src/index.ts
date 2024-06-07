import {
  DD_28,
  DD_29,
  DD_30,
  DD_31,
  MM_28,
  MM_29,
  MM_30,
  MM_31,
  YYYY,
  YYYY_leap,
  ZZ,
  hh,
  mm,
  ss,
  sss,
} from "./regex";
import { Template, hydrateTemplate } from "./template";

export const isoTime = customDateTime(({ hh, mm, ss, sss, ZZ }) => {
  return `${hh}:${mm}:${ss}.${sss}${ZZ}`;
});

export const isoDate = customDateTime(({ YYYY, MM, DD }) => {
  return `${YYYY}-${MM}-${DD}`;
});

export const isoDateTime = customDateTime(({ YYYY, MM, DD, hh, mm, ss, sss, ZZ }) => {
  return `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}.${sss}${ZZ}`;
});

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
