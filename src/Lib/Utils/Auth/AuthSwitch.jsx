import React from 'react'
import Session from 'Carrier/Session.js'
import { Switch, withRouter } from "react-router-dom"
import { observer } from "mobx-react"

@withRouter
@observer
export default class AuthSwitch extends React.Component {

  componentDidUpdate(){
    Session.fetchAllData()
  }

  render(){
    return (
      <Switch>
        {React.Children.map(this.props.children, elem => {
          return !elem || (elem.props.permission && !Session.isAuthed(elem.props.permission))
            ? null
            : elem
          }
        )}
      </Switch>
    )
  }
}