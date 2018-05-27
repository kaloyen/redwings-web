import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class Form extends React.Component {
  render(){
    return (
      <div 
        style={{ position: 'relative', width: '100%' }}
        onClick={this.props.onClick && (()=>this.props.onClick())}
      >
        {this.props.children}
      </div>
    )
  }
}