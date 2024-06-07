export const hh = "(?:[01][0-9]|2[0-3])";
export const mm = "(?:[0-5][0-9])";
export const ss = "(?:[0-5][0-9])";
export const sss = "(?:[0-9]{3})";
export const ZZ = `(?:(?:[+-]?${hh}:${mm})|Z)`;

export const YYYY = "(?:[0-9]{4})";
export const YYYY_leap_century = `(?:(?:0[048]|[13579][26]|[2468][048])00)`; // a multiple of 400, valid up to 9999
export const YYYY_leap_noncentury = `(?:[0-9]{2}(?:0[48]|[13579][26]|[2468][048]))`; // a non-century multiple of 4, valid up to 9999
export const YYYY_leap = `(?:${YYYY_leap_noncentury}|${YYYY_leap_century})`;

export const MM_31 = "(?:01|03|05|07|08|10|12)";
export const MM_30 = "(?:04|06|09|11)";
export const MM_28 = "(?:02)";
export const MM_29 = "(?:02)";

export const DD_31 = "(?:0[1-9]|[12][0-9]|3[01])";
export const DD_30 = "(?:0[1-9]|[12][0-9]|30)";
export const DD_28 = "(?:0[1-9]|1[0-9]|2[0-8])";
export const DD_29 = "(?:0[1-9]|[12][0-9])";
