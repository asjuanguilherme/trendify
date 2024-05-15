import { test, describe, expect } from 'vitest'
import { objectToQuerystring } from './objectToQuerystring'

describe('objectToQuerystring', () => {
  test('it must return an correct querystring of the passed object', () => {
    const result = objectToQuerystring({
      test: 1,
      secondTest: 2,
      thirdTest: false
    })
    expect(result).toBe('test=1&secondTest=2&thirdTest=false')
  })
})
