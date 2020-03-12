import ajax from '../utils/ajax'
import global from '../utils/global'

let api = {}
api.downloadUrl = global.AUTH_URL + '/permission/download'
api.getPermissionTree = (param) => {
  return ajax('get', global.AUTH_URL + '/permission/tree', param)
}

api.search = (param) => {
  return ajax('get', global.AUTH_URL + '/permission/search', param)
}
api.save = (param) => {
  return ajax('post', global.AUTH_URL + '/permission/save', param)
}
api.detail = (id) => {
  return ajax('get', global.AUTH_URL + '/permission/detail/' + id)
}
api.changeStatus = (param) => {
  return ajax('post', global.AUTH_URL + '/permission/setStatus', param)
}
api.del = (ids) => {
  return ajax('delete', global.AUTH_URL + '/permission/del/' + ids)
}
api.upload = (param) => {
  return ajax('post', global.AUTH_URL + '/permission/upload', param, 'multiple')
}
export default api
