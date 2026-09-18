import { describe, it, expect } from 'vitest'
import { getRandomInt } from './utils'

describe('getRandomInt', () => {
  it('returns a number between min and max', () => {
    const min = 1;
    const max = 2;
    const randomInt = getRandomInt(min, max);
    expect(randomInt).toBeGreaterThanOrEqual(min);
    expect(randomInt).toBeLessThanOrEqual(max);
  })

  it('returns an integer', () => {
    const randomInt = getRandomInt(1, 10);
    expect(Number.isInteger(randomInt)).toBe(true);
  })
});
