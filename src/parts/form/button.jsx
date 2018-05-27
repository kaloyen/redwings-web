import React from 'react'
import { redirect } from 'Carrier/utils.js'
import { Link } from "react-router-dom"
import { observer } from 'mobx-react'

@observer
export default class Button extends React.Component {

  isLinkButtonFunction = () => {
    if(this.props.to){
      return ()=>{}
    }
    return this.props.onClick && (()=>this.props.onClick())
  }

  isLinkButton = () => (
    <Link to={this.props.to}>
      <button
        className={'btn'}
        style={{ 
          borderRadius: '4px', 
          minHeight: '30px',
          minWidth: '80px', 
          background: "#d2d2d2", 
          color: 'black', 
          ...this.props.style
        }}
        onClick={this.isLinkButtonFunction()}
      >
      {this.props.children}
      </button>
    </Link>
  )

  
  render() {
    if(this.props.to) return this.isLinkButton()
    return (
      this.props.type === `logout` ? <Logout /> :
      <button
        className={'btn'}
        style={{ 
          borderRadius: '4px', 
          minHeight: '30px',
          minWidth: '80px', 
          background: "#d2d2d2", 
          color: 'black', 
          ...this.props.style
        }}
        onClick={this.isLinkButtonFunction()}
      >
      {this.props.children}
      </button>
    )
  }
}



