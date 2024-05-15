import { test, describe, expect } from 'vitest'
import { uppercaseWholeText, uppercaseWord } from './uppercaseText'

describe('uppercaseWord', () => {
  test('the first letter of the generated text must be uppercase', () => {
    const result = uppercaseWord('testing')
    expect(result).toBe('Testing')
  })
})

describe('uppercaseWholeText', () => {
  test('the first letter of each word in the generated text must be uppercase', () => {
    const result = uppercaseWholeText('testing this function')
    expect(result).toBe('Testing This Function')
  })
})
