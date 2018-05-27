import React from 'react'
import { observer } from 'mobx-react'
import { observable, computed } from 'mobx'
import { Form, Button, Input } from 'parts/form/index'
import { redirect } from 'Carrier/utils.js'
import Session from 'Carrier/Session.js'
import Wrapper from 'parts/Wrapper.jsx'
@observer
export default class Login extends React.Component {
  @observable email = ``
  @observable password = ``
  @observable errors = []

  componentDidMount(){
    if(Session.loggedIn) redirect('/')
  }

  handleClick = () => {
    Session.login({ email: this.email, password: this.password })
  }

  renderErrors = () => {
    if(this.errors.length > 0) {
      return (
        <div style={{ border: '1px solid #bb2211', borderRadius: '4px', padding: '8px' }}>
          {this.errors.join(',')}
        </div>
      )
    }
    return <React.Fragment />
  }

  render(){
    // <Input name="name" state={this.state}/>
    return (
      <Wrapper style={{ marginLeft: `auto` }}>
        <Form> 
          {this.renderErrors()}
          <Input name="email" value={this.email} onChange={(value)=>(this.email = value)}/>
          <Input name="password" type="password" value={this.password} onChange={(value)=>(this.password = value)}/>
          <Button onClick={()=>this.handleClick()}>Login</Button>
        </Form>  
      </Wrapper>
    )
  }
}