import assert from "node:assert";
import crypto from "node:crypto";
import test from "node:test";

import { DateTime } from "luxon";

import { customDateTime, isoDate, isoDateTime, isoTime } from "../src";

const customRegex = customDateTime(({ YYYY, MM, DD, hh, mm }) => {
  return `${DD}/${MM}/${YYYY} @ ${hh}:${mm}`;
});

test("regex-datetime", async (t) => {
  await t.test("randomized dates", async (tt) => {
    const now = DateTime.now();
    const start = now.minus({ years: 250 });
    const end = now.plus({ years: 250 });
    for (
      let d = start;
      d < end;
      d = d.plus({
        months: crypto.randomInt(0, 12),
        weeks: crypto.randomInt(0, 4),
        days: crypto.randomInt(0, 7),
        hours: crypto.randomInt(0, 24),
        minutes: crypto.randomInt(0, 60),
        seconds: crypto.randomInt(0, 60),
        milliseconds: crypto.randomInt(0, 1000),
      })
    ) {
      await tt.test(d.toISO(), () => {
        assert.match(d.toISODate(), isoDate());
        assert.match(d.toISOTime(), isoTime());
        assert.match(d.toISO(), isoDateTime());
        assert.match(d.toFormat("dd/MM/yyyy @ HH:mm"), customRegex());
      });
    }
  });

  await t.test("leap days", async (tt) => {
    for (let year = 1600; year < 4000; year += 1) {
      const d = DateTime.fromObject({ year, month: 2, day: 29 });
      if (d.isValid) {
        await tt.test(d.toISO(), () => {
          assert.match(d.toISODate(), isoDate());
          assert.match(d.toISOTime(), isoTime());
          assert.match(d.toISO(), isoDateTime());
          assert.match(d.toFormat("dd/MM/yyyy @ HH:mm"), customRegex());
        });
      }
    }
  });
});
