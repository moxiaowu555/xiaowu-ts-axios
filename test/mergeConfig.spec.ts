import axios from '../src/index'
import mergeConfig from '../src/core/mergeConfig'

describe('mergeConfig', () => {
  const defaults = axios.defaults

  test('should accept undefined for second argument', () => {
    expect(mergeConfig(defaults, undefined)).toEqual(defaults)
  })

  test('should accept an object for second argument', () => {
    expect(mergeConfig(defaults, {})).toEqual(defaults)
  })

  test('should not leave references', () => {
    const merge = mergeConfig(defaults, {})
    expect(merge).not.toBe(defaults)
    expect(merge.headers).not.toBe(defaults.headers)
  })

  test('should allow setting request options', () => {
    const config = {
      url: '__sample url__',
      params: '__sample params__',
      data: { foo: true }
    }

    const merge = mergeConfig(defaults, config)
    expect(merge.url).toBe(config.url)
    expect(merge.params).toBe(config.params)
    expect(merge.data).toEqual(config.data)
  })

  test('should not inherit request options', () => {
    const localConfig = {
      url: '__sample url__',
      params: '__sample params__',
      data: { foo: true }
    }
    const merge = mergeConfig(localConfig, {})
    expect(merge.url).toBeUndefined()
    expect(merge.params).toBeUndefined()
    expect(merge.data).toBeUndefined()
  })

  test('should return default headers if pass config2 with undefined', () => {
    expect(
      mergeConfig(
        {
          headers: 'x-mock-header'
        },
        undefined
      )
    ).toEqual({
      headers: 'x-mock-header'
    })
  })

  test('should merge auth, headers with defaults', () => {
    expect(
      mergeConfig(
        {
          auth: undefined
        },
        {
          auth: {
            username: 'foo',
            password: 'test'
          }
        }
      )
    ).toEqual({
      auth: {
        username: 'foo',
        password: 'test'
      }
    })

    expect(
      mergeConfig(
        {
          auth: {
            username: 'foo',
            password: '123'
          }
        },
        {
          auth: {
            username: 'bar',
            password: 'test'
          }
        }
      )
    ).toEqual({
      auth: {
        username: 'bar',
        password: 'test'
      }
    })
  })

  test('should overwrite auth, headers with a non-object value', () => {
    expect(
      mergeConfig(
        {
          headers: {
            common: {
              Accept: 'application/json, text/plain, */*'
            }
          }
        },
        {
          headers: null
        }
      )
    ).toEqual({
      headers: null
    })
  })

  test('should allow setting other options', () => {
    const merge = mergeConfig(defaults, {
      timeout: 100
    })

    expect(merge.timeout).toBe(100)
  })
})
