import React from 'react'
import Wrapper from 'parts/Wrapper.jsx'
import SectionIntro from 'parts/SectionIntro.jsx'
import { Form, Input, Button } from 'parts/form'
import Grid from 'parts/grid.jsx'
import { observer } from 'mobx-react'
import { observable, reaction } from 'mobx'
import Session from 'Carrier/Session.js'
import { User } from 'Carrier'
@observer
export default class AccountPage extends React.Component {

  componentDidMount(){
    console.log(`sess name`, Session.name)
    this.name = Session.name
  }

  @observable submitting = false
  @observable name = ``
  @observable password = ``

  onChange = (value) => {
    this.name = value   
  }

  submitForm = async() => {
    // if(this.submitting) return
    this.submitting = true
    const t = await User.perform(`update`, { user: { name: this.name, password: this.password }, id: Session.id}, `users`)
    Session.fetchAllDataServer()
    this.submitting = false
  }

  render(){
    return (
      <Wrapper floating maxWidth>
        <SectionIntro title="Your Account" heading={1.5} bold>
          <Wrapper maxWidth noMargin>
            <Form>
                <Input 
                  colSpan={1}
                  name="name"
                  value={this.name}
                  onChange={(value)=> this.onChange(value)}
                />
                <Input 
                  colSpan={1}
                  name="password"
                  type="password_confirmation"
                  value={this.password}
                  onChange={(value)=> this.password = value}
                />
              <Button onClick={this.submitForm}>{!this.submitting ? `Submit` : `Submitting`}</Button>
            </Form>
          </Wrapper>
        </SectionIntro>
      </Wrapper>
    )
  }
}