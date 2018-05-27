import React from 'react'
import { Switch, Route } from 'react-router'
import { renderComponent } from 'Carrier/utils.js'
import { UserIndex, FormPage } from './index.js'
export default class Scene extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/admin/users" render={renderComponent(UserIndex)} />
        <Route path="/admin/users/:id" render={renderComponent(FormPage)} />
      </Switch>
    )
  }
}