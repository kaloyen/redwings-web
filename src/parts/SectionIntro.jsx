import React from 'react'
import PropTypes from 'prop-types'

import Wrapper from 'parts/Wrapper.jsx'
export default class SectionIntro extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    heading: PropTypes.number,
    subheading: PropTypes.string,
    bold: PropTypes.bool,
    wrapperProps: PropTypes.object,
  }

  render(){
    return (
      <Wrapper {...this.props.wrapperProps}>
        <div style={{ display: `grid`, gridTemplateColumns: `auto` }}>
          <div style={{ fontSize: `${this.props.heading || 1}em`, gridColumn: 1, gridRow: 1, marginBottom: `16px`, marginLeft: `0px` }} >
            {this.props.bold ? <b>{this.props.title}</b> : this.props.title}
          </div>
          <div style={{ gridColumn: 1, gridRow: 2, marginLeft: `8px` }}>
            {this.props.children}
          </div>
        </div>
      </Wrapper>
    )
  }
}