import assert from "node:assert";
import test from "node:test";

import * as regex from "./regex";

test("regex", async (t) => {
  await t.test("DD_28", () => {
    const dd_28 = regexFrom(regex.DD_28);
    for (const i of range(0, 32)) {
      const padded = zeroPad(i, 2);
      if (i >= 1 && i <= 28) {
        assert.match(padded, dd_28());
      } else {
        assert.doesNotMatch(padded, dd_28());
      }
    }
  });

  await t.test("DD_29", () => {
    const dd_29 = regexFrom(regex.DD_29);
    for (const i of range(0, 32)) {
      const padded = zeroPad(i, 2);
      if (i >= 1 && i <= 29) {
        assert.match(padded, dd_29());
      } else {
        assert.doesNotMatch(padded, dd_29());
      }
    }
  });

  await t.test("DD_30", () => {
    const dd_30 = regexFrom(regex.DD_30);
    for (const i of range(0, 32)) {
      const padded = zeroPad(i, 2);
      if (i >= 1 && i <= 30) {
        assert.match(padded, dd_30());
      } else {
        assert.doesNotMatch(padded, dd_30());
      }
    }
  });

  await t.test("DD_31", () => {
    const dd_31 = regexFrom(regex.DD_31);
    for (const i of range(0, 32)) {
      const padded = zeroPad(i, 2);
      if (i >= 1 && i <= 31) {
        assert.match(padded, dd_31());
      } else {
        assert.doesNotMatch(padded, dd_31());
      }
    }
  });

  await t.test("hh", () => {
    const hh = regexFrom(regex.hh);
    for (const i of range(0, 24)) {
      const padded = zeroPad(i, 2);
      if (i <= 23) {
        assert.match(padded, hh());
      } else {
        assert.doesNotMatch(padded, hh());
      }
    }
  });

  await t.test("mm", () => {
    const mm = regexFrom(regex.mm);
    for (const i of range(0, 60)) {
      const padded = zeroPad(i, 2);
      if (i <= 59) {
        assert.match(padded, mm());
      } else {
        assert.doesNotMatch(padded, mm());
      }
    }
  });

  await t.test("ss", () => {
    const ss = regexFrom(regex.ss);
    for (const i of range(0, 60)) {
      const padded = zeroPad(i, 2);
      if (i <= 59) {
        assert.match(padded, ss());
      } else {
        assert.doesNotMatch(padded, ss());
      }
    }
  });

  await t.test("sss", () => {
    const sss = regexFrom(regex.sss);
    for (const i of range(0, 1000)) {
      const padded = zeroPad(i, 3);
      if (i <= 999) {
        assert.match(padded, sss());
      } else {
        assert.doesNotMatch(padded, sss());
      }
    }
  });
});

function regexFrom(s: string) {
  return () => new RegExp(`^${s}$`);
}

function range(start: number, end: number) {
  const x = new Array(Math.max(end + 1 - start, 0));
  for (let i = 0; i < x.length; i++) {
    x[i] = start + i;
  }
  return x;
}

function zeroPad(n: number, l: number) {
  return String(n).padStart(l, "0");
}
