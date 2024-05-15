import { describe, test, expect } from 'vitest'
import isCurrentLinkActive from './isCurrentLinkActive'

describe('isCurrentLinkActive', () => {
  test('it must be true when path is equal to asPath', () => {
    const result = isCurrentLinkActive('/home', '/home')
    expect(result).toBeTruthy()
  })
  test('it must be falsy when path is not equal to asPath', () => {
    const result = isCurrentLinkActive('/directory', '/home')
    expect(result).toBeFalsy()
  })
})
