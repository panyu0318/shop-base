import ajax from '../utils/ajax'
import global from '../utils/global'

let api = {}
api.downloadUrl = global.AUTH_URL + '/role/download'

api.save = (param) => {
  return ajax('post', global.AUTH_URL + '/role/save', param)
}
api.detail = (id) => {
  return ajax('get', global.AUTH_URL + '/role/detail/' + id)
}
api.search = (param) => {
  return ajax('get', global.AUTH_URL + '/role/search', param)
}
api.changeStatus = (param) => {
  return ajax('post', global.AUTH_URL + '/role/setStatus', param)
}
api.upload = (param) => {
  return ajax('post', global.AUTH_URL + '/role/upload', param, 'multiple')
}
api.authorize = (param) => {
  return ajax('post', global.AUTH_URL + '/role/authorize', param)
}
api.del = (ids) => {
  return ajax('delete', global.AUTH_URL + '/role/del/' + ids)
}
api.authorized = (param) => {
  return ajax('post', global.AUTH_URL + '/role/authorized', param)
}
export default api
