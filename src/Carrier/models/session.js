import { Model } from '../model.js'
import { post, get } from 'Lib/Utils/api_http'

export class SSessionModel extends Model {
  controller = `sessions`
  
  static login(data={}, options={}){
    return post('/api/sessions/perform/login', data , options)
  }

  static signup(data={}, options={}){
    return post('/api/sessions/perform/signup', data , options)
  }
}
const SessionModel = new SSessionModel()
export default SessionModel