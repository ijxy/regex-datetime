import assert from "node:assert";
import crypto from "node:crypto";
import test from "node:test";

import { DateTime } from "luxon";

import { customDateTime, isoDate, isoDateTime, isoTime } from "../src";

test("regex-datetime", async (t) => {
  await t.test("randomized", () => {
    for (let i = 0; i < 100000; i++) {
      testDateTime({
        year: crypto.randomInt(1000, 10000),
        month: crypto.randomInt(0, 13),
        day: crypto.randomInt(0, 33),
        hour: crypto.randomInt(0, 25),
        minute: crypto.randomInt(0, 61),
        second: crypto.randomInt(0, 61),
        millisecond: crypto.randomInt(0, 1001),
      });
    }
  });

  await t.test("leap days", () => {
    for (let year = 1600; year < 10000; year++) {
      testDateTime({
        year,
        month: 2,
        day: 29,
      });
    }
  });
});

const customRegex = customDateTime(({ YYYY, MM, DD, hh, mm }) => {
  return `${DD}/${MM}/${YYYY} @ ${hh}:${mm}`;
});

type DateTimeObject = {
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
};

function testDateTime(date: DateTimeObject) {
  const s = toISOString(date);
  const d = DateTime.fromISO(s);
  if (d.isValid) {
    assert.match(d.toISODate(), isoDate());
    assert.match(d.toISOTime(), isoTime());
    assert.match(d.toISO(), isoDateTime());
    assert.match(d.toFormat("dd/MM/yyyy @ HH:mm"), customRegex());
  } else {
    assert.doesNotMatch(s, isoDateTime());
  }
}

const toISOString = ({ year, month, day, hour, minute, second, millisecond }: DateTimeObject) => {
  return `${year}-${zeroPad(month, 2)}-${zeroPad(day, 2)}T${zeroPad(hour ?? 0, 2)}:${zeroPad(minute ?? 0, 2)}:${zeroPad(second ?? 0, 2)}.${zeroPad(millisecond ?? 0, 3)}Z`;
};

function zeroPad(n: number, l: number) {
  return String(n).padStart(l, "0");
}
