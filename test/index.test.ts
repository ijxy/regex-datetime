import assert from "node:assert";
import test from "node:test";

import { DateTime } from "luxon";

import { customDateTime, isoDate, isoDateTime, isoTime } from "../src";

test("regex-datetime", async (t) => {
  await t.test("ISO Date", () => {
    const formatted = DateTime.utc().toISODate();
    const regex = isoDate();
    assert.match(formatted, regex);
  });

  await t.test("ISO Time", () => {
    const formatted = DateTime.utc().toISOTime();
    const regex = isoTime();
    assert.match(formatted, regex);
  });

  await t.test("ISO DateTime", () => {
    const formatted = DateTime.utc().toISO();
    const regex = isoDateTime();
    assert.match(formatted, regex);
  });

  await t.test("custom", () => {
    const formatted = DateTime.utc().toFormat("dd/MM/yyyy @ HH:mm");
    const regex = customDateTime(({ YYYY, MM, DD, hh, mm }) => {
      return `${DD}/${MM}/${YYYY} @ ${hh}:${mm}`;
    });
    assert.match(formatted, regex);
  });
});
