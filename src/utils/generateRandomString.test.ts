import { expect, test, describe } from 'vitest'
import { generateRandomString } from './generateRandomString'

test('generateRandomString must generate an random string with the passed size', () => {
  const generated = generateRandomString(10)
  expect(generated).toHaveLength(10)
})
