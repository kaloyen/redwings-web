import React from 'react'
import { Switch, Route } from 'react-router'
import { renderComponent } from 'Carrier/utils.js'
import Account from './Account.jsx'
import CharacterImporter from './CharacterBuilder.jsx'
import CharacterIndex from './CharacterIndex.jsx'
import CharacterShow from './CharacterShow.jsx'
export default class Scene extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/account" render={renderComponent(Account)} />
        <Route exact path="/account/characters/import" render={renderComponent(CharacterImporter)} />
        <Route exact path="/account/characters" render={renderComponent(CharacterIndex)} />
        <Route path="/account/characters/:id" render={renderComponent(CharacterShow)} />
      </Switch>
    )
  }
}