import { describe, test, expect } from 'vitest';
import { hexToRgb } from './color';

describe('hexToRgb - hexcode To RGB color', () => {
  test('#EEE', () => {
    expect(hexToRgb('#EEE')).toEqual({
      r: 238,
      g: 238,
      b: 238,
    });
  });
  test('#C84040', () => {
    expect(hexToRgb('#C84040')).toEqual({
      r: 200,
      g: 64,
      b: 64,
    });
  });
  test('#4066C8', () => {
    expect(hexToRgb('#4066C8')).toEqual({
      r: 64,
      g: 102,
      b: 200,
    });
  });
});
