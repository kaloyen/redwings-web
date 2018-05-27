import React from 'react'
import PropTypes from 'prop-types'
export default class Row extends React.Component {
  static propTypes = {
    component: PropTypes.any,
    rowProps: PropTypes.object
  }
  render(){
    return (
      <Component props={this.rowProps} />
    )
  }
}