import { chronoparse } from './chronoparse';

export type TTL = string | number;

export function parseTTL(input: TTL): number {
  if (typeof input === 'number') {
    return Date.now() + input;
  } else if (typeof input === 'string') {
    return +chronoparse(input);
  }
  throw new Error(`Unknown type: ${typeof input}`);
}
