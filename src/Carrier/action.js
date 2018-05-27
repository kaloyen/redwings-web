import { post, get } from 'Lib/Utils/api_http'
import { user } from './model.js'
export default function action(table, action, data){
  const functions = {
    user: user(action, data)
  }
  return functions[table]
}
