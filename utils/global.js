const config = require('../assets/config/config')
let global = {}
global.AUTH_URL = 'http://localhost:1202/auth'
global.init = function () {
  if (config['AUTH_URL']) {
    global.AUTH_URL = config.AUTH_URL
  }
}

export default global
