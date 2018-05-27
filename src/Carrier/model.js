import { post, get } from 'Lib/Utils/api_http'

export class Model {
  
  perform(action, data, controller){
    return post(`/api/${this.controller || controller}/perform/${action}`, data)
  }
  ids(data){
    return post(`/api/${this.controller || controller}/perform/ids`, data)
  }
  asTable(data){
    const headings = data.headings.map(header => {
      if(typeof(header) === `object`){
        return header.key 
      }
      return header
    })
    return post(`/api/${this.controller || controller}/perform/as_table`, { ...data, headings: headings})
  }
  find(id){
    return post(`/api/${this.controller || controller}/perform/find`, { id: id })
  }
  find_by(key, value, data){
    return post(`/api/${this.controller || controller}/perform/find_by`, { key: key, value: value })
  }
}

export function login(data={}, options={}){
  return post('/api/sessions/perform/login', data , options)
}

export function signup(data={}, options={}){
  return post('/api/sessions/perform/signup', data , options)
}

export function verifyCredentials(data={}, options={}){
  return get('/api/verify_credentials')
}

export function updateUserDetails(data){
  return post(`/api/update_user_details`, { keys: data })
}

export function user(action, data){
  return post(`/api/users/${action}`, data)
}

export function testAction(controller, method, data){
  return post(`/api/${controller}/perform/${method}`, data)
}