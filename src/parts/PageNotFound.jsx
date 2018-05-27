import React from 'react'
import Wrapper from 'parts/Wrapper.jsx'
export default class PageNotFound extends React.Component {
  render(){
    return (
      <Wrapper style={{ margin: `auto`, marginTop: `20%` }}>
        <p style={{ fontSize: `1.5em` }} ><b>The page at {window.location.href} doesn't seem to exist!</b></p>
        <p style={{ fontSize: `1.25em` }}>If this is an error, please let me know using the contact form //\\<b>Link to contact form</b>//\\</p>
      </Wrapper>
    )
  }
}