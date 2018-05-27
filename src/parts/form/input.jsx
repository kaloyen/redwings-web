import React from 'react'
import { observer } from 'mobx-react'
import { observable, action, computed } from 'mobx'
import { capitalize } from 'Lib/Utils/string.js'
const style={
  borderRadius: '4px',
  minHeight: '30px', 
  minWidth: '80px', 
  width: `95%`,
  background: '#e8e8e8',
  color: 'black', 
  hover: 'green',
  marginTop: `4px`,
  marginBottom: `4px`,
  paddingLeft: `8px`,
}

const labelStyle = {
  marginLeft: `8px`
}

@observer
export default class Input extends React.Component {
  @observable value
  
  componentWillReceiveProps(props) {
    props.state && (this.value = props.state)
    props.value && (this.value = props.value)
  }
  componentDidUpdate(props){
    this.value !== props.value && (this.value = props.value)
  }

  typeHandler = (target) => {
    const type = this.props.type || 'text'
    if(type === 'checkbox') {
      return target.checked
    }
    return target.value
  }

  @action
  onChange = (e) => {
    const { onChange } = this.props
    this.value = this.typeHandler(e.target)
    onChange && onChange(this.value) 
  }

  render(){
    const { type, name, onChange, noLabel } = this.props
    if(type === `password_confirmation`) return <ConfPasswordInput {...this.props} />
    return (
      <div>
        {(name && !noLabel) && <div><label style={labelStyle}>{name && capitalize(name)}</label></div>}
        <input 
          style={style}
          type={type ? type : 'text'}
          onChange={(e) => this.onChange(e)}
          value={this.value || this.props.value}
        />
      </div>
    )
  }
}

@observer
class ConfPasswordInput extends React.Component {

  @observable password = ``
  @observable confPassword = ``

  @action
  onChangePassword = (target) => {
    this.password = target.value
    this.props.onChange && this.props.onChange(target.value)
    this.checkPassword()
  }

  @action
  onChangeConfPassword = (target) => {
    this.confPassword = target.value
    this.checkPassword()
  }

  checkPassword = () => {
    if (this.props.passwordMatch){
      this.props.passwordMatch(this.password.length > 0 && this.password === this.confPassword)
    }
  }
  @computed
  get passwordStyle(){
    if(this.password.length < 1) return { backgroundColor: `white`, color: `black` }
    if(this.password !== this.confPassword) return { backgroundColor: `#a60000`, color: `white`}
    else return {backgroundColor: `#00b300`, color: `white`}
  }

  render() {
    const { onChange } = this.props
    return (
      <div>
        <div><label style={labelStyle}>Password</label></div>
        <input 
          style={{...style, marginBottom: `4px`, ...this.passwordStyle }}
          type={'password'}
          onChange={(e) => this.onChangePassword(e.target)}
        />
        <div><label style={labelStyle}>Password Confirmation</label></div>
        <input 
          style={{...style, ...this.passwordStyle }}
          type={'password'}
          onChange={(e) => this.onChangeConfPassword(e.target)}
        />
      </div>
    )
  }
}