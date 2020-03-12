import ajax from '../utils/ajax'
import global from '../utils/global'

let api = {}
api.downloadUrl = global.AUTH_URL + '/menu/download'
api.save = (param) => {
  return ajax('post', global.AUTH_URL + '/menu/save', param)
}
api.changePosition = (param) => {
  return ajax('post', global.AUTH_URL + '/menu/changePosition', param)
}
api.search = (param) => {
  return ajax('get', global.AUTH_URL + '/menu/search', param)
}
api.detail = (id) => {
  return ajax('get', global.AUTH_URL + '/menu/detail/' + id)
}
api.setStatus = (param) => {
  return ajax('post', global.AUTH_URL + '/menu/setStatus', param)
}
api.del = (ids) => {
  return ajax('delete', global.AUTH_URL + '/menu/del/' + ids)
}
api.checkStatus = (param) => {
  return ajax('post', global.AUTH_URL + '/menu/checkStatus', param)
}
api.upload = (param) => {
  return ajax('post', global.AUTH_URL + '/menu/upload', param, 'multiple')
}
api.getMenuTree = () => {
  return ajax('get', global.AUTH_URL + '/menu/tree')
}
export default api
