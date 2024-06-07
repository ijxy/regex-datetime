[npm]: https://www.npmjs.com/package/regex-datetime

[![npm verison](https://img.shields.io/npm/v/regex-datetime)][npm]
[![npm bundle size](https://img.shields.io/bundlephobia/min/regex-datetime)][npm]
[![npm downloads](https://img.shields.io/npm/dm/regex-datetime)][npm]

# regex-datetime

Regular expressions for dates and times that correctly account for leap years.


## Installation

```
npm install regex-datetime
```

## Usage

```ts
import { customDateTime, isoDate, isoDateTime, isoTime } from "regex-datetime";

isoDateTime().test("2004-01-16T19:23:25.197Z"); // true
isoDate().test("2004-01-16"); // true
isoTime().test("19:23:25.197Z"); // true

const customDateTimeRegExp = customDateTime(({ YYYY, MM, DD, hh, mm }) => {
  return `${DD}/${MM}/${YYYY} @ ${hh}:${mm}`;
});
customDateTimeRegExp().test("16/01/2004 @ 19:23"); // true
```