import React from 'react'
import { Switch, Route } from 'react-router'
import PageNotFound from 'parts/PageNotFound.jsx'
import { renderComponent } from 'Carrier/utils.js'
import { Scene as UserScene } from 'Admin/Users'
export default class AdminPack extends React.Component {
  render(){
    return (
      <Switch>
        <Route path="/admin/users" render={renderComponent(UserScene)}/>
        <Route component={PageNotFound} />
      </Switch>
    )
  }
}