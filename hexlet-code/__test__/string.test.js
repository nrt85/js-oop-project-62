import { test, expect } from '@jest/globals';
import Validator from '../index.js';

test('string - not required', () => {
  const v = new Validator();
  const schema = v.string();

  expect(schema.isValid('')).toBeTruthy();
  expect(schema.isValid(null)).toBeTruthy();
  expect(schema.isValid(undefined)).toBeTruthy();
});

test('string - required', () => {
  const v = new Validator();
  const schema = v.string();
  schema.required();

  expect(schema.isValid('what does the fox say')).toBeTruthy();
  expect(schema.isValid('hexlet')).toBeTruthy();
  expect(schema.isValid('')).toBeFalsy();
  expect(schema.isValid(null)).toBeFalsy();
  expect(schema.isValid(undefined)).toBeFalsy();
});

test('string - contains', () => {
  const v = new Validator();
  const schema = v.string();
  schema.contains('what').isValid('what does the fox say'); // true
  schema.contains('whatthe').isValid('what does the fox say'); // false

  expect(schema.contains('what').isValid('what does the fox say')).toBeTruthy();
  expect(
    schema.contains('whatthe').isValid('what does the fox say'),
  ).toBeFalsy();
  expect(schema.isValid('what does the fox say')).toBeFalsy();
});

test('string - minLength', () => {
  const v = new Validator();
  const schema = v.string();

  expect(schema.minLength(10).minLength(4).isValid('Hexlet')).toBeTruthy();
  expect(schema.isValid('wha')).toBeFalsy();
});
