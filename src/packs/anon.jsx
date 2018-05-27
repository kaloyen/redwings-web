import React from 'react'
import { Switch, Route } from 'react-router'
import PageNotFound from 'parts/PageNotFound.jsx'
import { renderComponent } from 'Carrier/utils.js'
import Dashboard from 'Anon/dashboard.jsx'
export default class UserPack extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" render={renderComponent(Dashboard)} />
        <Route component={PageNotFound} />
      </Switch>
    )
  }
}