import React from 'react'
import Wrapper from 'parts/Wrapper.jsx'
import { redirect } from 'Carrier/utils.js'
export default class PageNotFound extends React.Component {
  componentDidMount(){
    setTimeout(()=>redirect('/'), 1500)
  }
  render(){
    return (
      <Wrapper style={{ margin: `auto`, marginTop: `20%` }}>
        <h3>Loading...</h3>
      </Wrapper>
    )
  }
}