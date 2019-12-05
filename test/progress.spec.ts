import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should add a download progress handler', () => {
    const downloadSpy = jest.fn()

    axios('/foo', {
      onDownloadProgress: downloadSpy
    })

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo": "bar"}'
      })
      expect(downloadSpy).toHaveBeenCalled()
    })
  })

  test('should add a upload progress handler', () => {
    const uploadSpy = jest.fn()

    axios('/foo', { onUploadProgress: uploadSpy })

    return getAjaxRequest().then(request => {
      // Jasmine AJAX doesn't trigger upload events.Waiting for jest-ajax fix
      // expect(progressSpy).toHaveBeenCalled()
    })
  })
})
