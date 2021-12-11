import { TTL } from './ttl';

type SpanCallback = (v: number) => number;

type SpanMap = {
  second: SpanCallback;
  sec: SpanCallback;
  s: SpanCallback;
  minute: SpanCallback;
  min: SpanCallback;
  m: SpanCallback;
  hour: SpanCallback;
  hr: SpanCallback;
  h: SpanCallback;
  day: SpanCallback;
  d: SpanCallback;
  week: SpanCallback;
  w: SpanCallback;
  month: SpanCallback;
  mth: SpanCallback;
  year: SpanCallback;
  y: SpanCallback;
};

const spanMap: SpanMap = {
  second: (v) => v,
  sec: (v) => v,
  s: (v) => v,

  minute: (v) => v * 60,
  min: (v) => v * 60,
  m: (v) => v * 60,

  hour: (v) => v * 60 * 60,
  hr: (v) => v * 60 * 60,
  h: (v) => v * 60 * 60,

  day: (v) => v * 60 * 60 * 24,
  d: (v) => v * 60 * 60 * 24,

  week: (v) => v * 60 * 60 * 24 * 7,
  w: (v) => v * 60 * 60 * 24 * 7,

  month: (v) => v * 60 * 60 * 24 * 30,
  mth: (v) => v * 60 * 60 * 24 * 30,

  y: (v) => v * 60 * 60 * 24 * 365,
  year: (v) => v * 60 * 60 * 24 * 365,
};

const regex = /^(-?\d+) ?([a-zA-Z]+)/;

export class UnknownStringFormatError extends Error {
  public constructor(public text: string) {
    super(`Unknown string format: ${text}`);
  }
}

export class UnknownTimeSpanError extends Error {
  public constructor(public text: string) {
    super(`Unknown time span: ${text}`);
  }
}

function parseElement(input: string): number {
  let match = input.match(regex);

  if (!match) {
    throw new UnknownStringFormatError(input);
  }

  let [, val, unit] = match;
  let v = parseInt(val, 10);
  let fn = spanMap[unit as keyof SpanMap];

  if (!fn) {
    throw new UnknownTimeSpanError(unit);
  }

  return fn(v);
}

export function chronoparse(input: TTL): number {
  if (typeof input === 'string') {
    return input.split(/\s+/).reduce((a, b) => a + parseElement(b), 0);
  }

  return input;
}
