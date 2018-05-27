import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { renderComponent } from 'Carrier/utils.js'
import Login from 'App/Session/Login.jsx'
import SignUp from 'App/Session/SignUp.jsx'
export default class SessionPack extends React.Component {
  render(){
    return (
      <Switch>
        <Route path="/login" render={renderComponent(Login)} exact />
        <Route path="/sign-up" render={renderComponent(SignUp)} exact />
      </Switch>
    )
  }
}