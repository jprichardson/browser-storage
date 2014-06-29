var bs = require('../')

require('terst')

describe('browser-storage', function() {
  it('should store and retreive', function() {
    if (!process.browser) { //node.js only
      bs.__appname__ = 'browser-storage-test'
      T (bs.__path__.length > 0)
    }

    bs.setItem('name', 'jp')
    EQ (bs.getItem('name'), 'jp')
    bs.removeItem('name')

    bs.setItem('data', {name: 'jp'})
    EQ(bs.getItem('data'), '[object Object]')
    bs.removeItem('data')

    bs.setItem('num', 2)
    EQ (bs.getItem('num'), '2')
    bs.removeItem('num')
  })
})