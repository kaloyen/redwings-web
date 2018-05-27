import React from 'react'
import { Switch, Route } from 'react-router'
import PageNotFound from 'parts/PageNotFound.jsx'
import { renderComponent } from 'Carrier/utils.js'
import Dashboard from '../App/Dashboard/dashboard.jsx'
import SessionPack from './session.jsx'
import AccountScene from 'App/Account/scene.jsx'
export default class UserPack extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={renderComponent(Dashboard)} />
        <Route path="/account" render={renderComponent(AccountScene)} />
        <Route component={PageNotFound} />
      </Switch>
    )
  }
}