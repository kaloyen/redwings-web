import React from 'react'
import { Form, Button, Input } from 'parts/form/index'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import Session from 'Carrier/Session.js'
import Wrapper from 'parts/Wrapper.jsx'
import { redirect } from 'Carrier/utils.js'
@observer
export default class Signup extends React.Component {

  @observable email = ``
  @observable password = ``
  @observable passwordMatch = false
  @observable name = ``
  @observable errors = []

  submitForm = async (e) => {
    this.errors = []
    if(this.name.length < 1) this.errors.push(`Name can't be blank`)
    if(this.email.length < 1) this.errors.push(`Email can't be blank`)
    if(this.password.length < 1) this.errors.push(`Password can't be blank`)
    if(!this.passwordMatch) this.errors.push(`Passwords must match`)
    if(this.errors.length > 0) return
    const response = await Session.signUp({ email: this.email, password: this.password, name: this.name })
    if(response.data.error) this.errors.push(response.data.message) 
    else redirect('/')
  }
  
  renderErrors = () => {
    if(this.errors.length > 0) {
      return (
        <div style={{ border: '1px solid #bb2211', borderRadius: '4px', padding: '8px' }}>
          <ul style={{ marginLeft: 0, paddingLeft: `16px` }}>
            {this.errors.map(error => {
              return (
                <li>
                  {error}
                </li>
                )
              })}
          </ul>
        </div>
      )
    }
    return <React.Fragment />
  }

  render(){
    return (
      <Wrapper style={{ marginLeft: `auto` }}>
        <Form> 
          {this.renderErrors()}
          <Input name="name" value={this.name} onChange={(val)=>(this.name = val)}/>
          <Input name="email" value={this.email} onChange={(val)=>(this.email = val)}/>
          <Input 
            name="password" 
            type="password_confirmation" 
            value={this.password} 
            onChange={(value)=>(this.password = value)}
            passwordMatch={(val)=>this.passwordMatch = val}
          />
          <Button onClick={this.submitForm}>Register</Button>
        </Form>  
      </Wrapper>
    )
  }
}