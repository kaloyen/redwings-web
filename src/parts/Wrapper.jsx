import React from 'react'

export default class Wrapper extends React.Component {
  floating(){
    return {
      border: `2px ${!this.props.sunken ? `outset` : `inset`} #bbb8e4`,
      borderRadius: `4px`,
      padding: `6px`
    }
  }
  render() {
    return (
      <div style={{ 
        width: this.props.width ? this.props.width : this.props.maxWidth ? `100%` : '90%', 
        position: 'relative', 
        margin: this.props.noMargin ? 0 : `16px`,
        marginTop: `16px`,
        ...this.props.style,
        ...((this.props.floating || this.props.sunken) && this.floating())
      }}>
        {this.props.children}
      </div>
    )
  }
}