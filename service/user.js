import ajax from '../utils/ajax'
import global from '../utils/global'

let api = {}
api.downloadUrl = global.AUTH_URL + '/user/download'
api.save = (param) => {
  return ajax('post', global.AUTH_URL + '/user/save', param)
}
api.detail = (id) => {
  return ajax('get', global.AUTH_URL + '/user/detail/' + id)
}
api.search = (param) => {
  return ajax('get', global.AUTH_URL + '/user/search', param)
}
api.changeStatus = (param) => {
  return ajax('post', global.AUTH_URL + '/user/setStatus', param)
}
api.upload = (param) => {
  return ajax('post', global.AUTH_URL + '/user/upload', param, 'multiple')
}
api.authorize = (param) => {
  return ajax('post', global.AUTH_URL + '/user/authorize', param)
}
api.del = (ids) => {
  return ajax('delete', global.AUTH_URL + '/user/del/' + ids)
}

export default api
