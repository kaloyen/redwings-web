import React from 'react'
import PropTypes from 'prop-types'
export default class Head extends React.Component {
  static propTypes = {
    first: PropTypes.bool,
    last: PropTypes.bool,
    header: PropTypes.object
  }

  getStyle = () => {
    const { first, last } = this.props
    let style={}
    if(first) style = {
      paddingLeft: `4px`,
      paddingRight: `8px`
    }
    if(last) style = {
      paddingRight: `4px`
    }
    style = {
      paddingLeft: `4px`,
      paddingRight: `4px`,
    }
    return { ...style, ...{
      borderBottom: `1px solid #757575`,
      paddingLeft: `6px`
    }}
  }

  render(){
    const { header } = this.props
    if(typeof(header) === `string`) return (
      <th style={this.getStyle()}>
        {header}
      </th>
    )
    return (
      <th style={this.getStyle()}>
        {header.text 
          ? header.text 
          : header.component 
            ? header.component 
            : ``
        }
      </th>
    )
  }
}