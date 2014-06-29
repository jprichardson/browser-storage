var os = require('os')
var fs = require('fs-extra')
var path = require('path-extra')

if (!process.browser && typeof process.pid == 'number') {
  var bs = {}

  bs.__path__ = ''
  bs.__db__ = ''
  bs.__data__ = {}

  var __app
  Object.defineProperty(bs, '__appname__', {
    get: function() {
      return __app
    },
    set: function(app) {
      __app = app
      bs.__path__ = path.datadir(app)
      bs.__db__ = path.join(bs.__path__, 'db.json')

      if (fs.existsSync(bs.__db__))
        bs.__data__ = JSON.parse(fs.readFileSync(bs.__db__))
      else
        fs.outputJsonSync(bs.__db__, {})
    }
  })
}

bs.getItem = function(key) {
  return bs.__data__[key] 
}

bs.removeItem = function(key) {
  delete bs.__data__[key]
  fs.outputJsonSync(bs.__db__, bs.__data__)
}

bs.setItem = function(key, val) {
  bs.__data__[key] = '' + val //cast to string
  fs.outputJsonSync(bs.__db__, bs.__data__)
}

module.exports = bs

