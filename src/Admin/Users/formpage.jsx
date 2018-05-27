import React from 'react'
import SectionIntro from 'parts/SectionIntro'
import { Form, Input, Button } from 'parts/form'
import Wrapper from 'parts/Wrapper.jsx'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { User } from 'Carrier'
import LoadRecord from 'parts/LoadRecord.jsx'
@observer
export default class FormPage extends LoadRecord {
  model = User
  id = this.props.id

  @observable submitting = false
  
  submitForm = async() => {
    if(this.submitting) return
    this.submitting = true
    const t = await User.perform(`update`, { user: { name: this.name, password: this.password, email: this.record.email }, id: this.props.id})
    this.submitting = false
  }

  render(){
    return (
      <SectionIntro title="Your Account" heading={1.5} bold>
        <Wrapper floating maxWidth noMargin>
          <Form>
            <Input 
              name="name"
              value={this.record.name}
              onChange={(value)=> this.record.name = value}
            />
            <Input 
              name="email"
              value={this.record.email}
              onChange={(value)=> this.record.email = value}
            />
            <Input 
              name="password"
              type="password_confirmation"
              value={this.record.password}
              onChange={(value)=> this.record.password = value}
            />
            <Button onClick={this.submitForm}>{!this.submitting ? `Submit` : `Submitting`}</Button>
          </Form>
        </Wrapper>
      </SectionIntro>
    )
  }
}