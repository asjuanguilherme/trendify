import { test, expect } from 'vitest'
import { throwEnvError } from './throwEnvError'

test('throwEnvError must throw an error with envName on the error message', () => {
  expect(() => throwEnvError('envName')).toThrowError(/envName/)
})
