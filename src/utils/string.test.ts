import { describe, test, expect } from 'vitest';
import { snakeToCamelCase } from './string';

describe('toCamelCase - to make CamelCase', () => {
  test('CAMEL_CASE', () => {
    expect(snakeToCamelCase('CAMEL_CASE')).toBe('camelCase');
  });
  test('_CAMEL_CASE', () => {
    expect(snakeToCamelCase('_CAMEL_CASE')).toBe('CamelCase');
  });
  test('_CA_MEL_CA_SE', () => {
    expect(snakeToCamelCase('_CA_MEL_CA_SE')).toBe('CaMelCaSe');
  });
  test('CA MEL_CA SE', () => {
    expect(snakeToCamelCase('CA MEL_CA SE')).toBe('ca melCa se');
  });
  test('VITE_JAVASCRIPT', () => {
    expect(snakeToCamelCase('VITE_JAVASCRIPT')).toBe('viteJavascript');
  });
});


