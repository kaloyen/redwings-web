import { observer } from 'mobx-react'
import { observable, action, computed } from 'mobx'
import { verifyCredentials as verifyCred } from './model.js'
import { getApiHeaders, clearApiHeaders } from 'Lib/Utils/api_http.js'
import { login as loginUser, signup as signupUser, updateUserDetails } from 'Carrier/model.js'
import { SessionModel } from 'Carrier'
import { redirect } from 'Carrier/utils.js'
import STORAGE from 'Lib/storage'
class Session {

  constructor(){
    Object.keys(this.data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return this.data[key]
        },
        set(val) {
          this.data[key] = val
          STORAGE.set('user', { ...STORAGE.get('user'), [key]: val })
        },
      })
    })
    this.fetchAllData()
  }
  
  @observable
  data = {
    id: null,
    email: null,
    name: null,
    admin: false,
  }

  fetchAllData = () => {
    Object.keys(this.data).map((key) => {
      const userData = STORAGE.get('user')
      this.data && userData && (this.data[key] = userData[key])
    }, this)
  }
  
  fetchAllDataServer = async() => {
    const values = await this.updateUser()
    Object.entries(values).map(([key, value]) => {
      this.data[key] = value
      if(value || value === false) STORAGE.set('user', { ...STORAGE.get('user'), [key]: value })
      console.log(key, value)
    }, this)
  }

  @computed 
  get loggedIn(){
    return (this.id && this.email && STORAGE.get('auth_access-token'))
  }

  @computed
  get isAdmin(){
    return this.admin
  }

  async login(data){
    Object.keys(this.data).map(key => {
      this.data[key] = null
    })
    const response = await loginUser(data)
    if(!response.data.error){
      redirect('/loading')
      this.id = response.data.id
      this.email = response.data.email
      this.name = response.data.name
      await this.fetchAllDataServer()
      console.log('login successful', response.data.id)
      redirect('/')
      // window.reload()
    } else {
      console.log('login failed', response.data)
      this.errors = [response.data.message]
    }
  }

  async signUp(data){
    const response = await signupUser(data)
    await this.fetchAllDataServer()
    window.reload()
    return response
  }

  logout = () => {
    clearApiHeaders()
    Object.keys(this.data).map(key => {
      const userData = STORAGE.set('user', {})
      this.data[key] = null
    })
    redirect('/')
  }

  isAuthed = (permission) => {
    console.log(`isAuthed`, permission)
    if(permission === `signed_in` && this.loggedIn) return true
    if(permission === `admin` && this.loggedIn && this.isAdmin) return true
  }

  async updateUser(){
    const response = await updateUserDetails(Object.keys(this.data))
    return response.data
  }
}
const session = new Session()
export default session
window.session = session