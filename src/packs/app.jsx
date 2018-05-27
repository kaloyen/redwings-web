import React from 'react'
import { Switch, Route } from 'react-router'
import PageNotFound from 'parts/PageNotFound.jsx'
import { renderComponent } from 'Carrier/utils.js'
import Dashboard from '../App/Dashboard/dashboard.jsx'
import SessionPack from './session.jsx'
import UserPack from './user.jsx'
import AdminPack from './admin.jsx'
import AnonPack from './anon.jsx'
import Loading from 'parts/loading.jsx'
import AuthSwitch from 'Lib/Utils/Auth/AuthSwitch.jsx'
export default class AppPack extends React.Component {
    render() {
        return (
            <React.Fragment>
                <AuthSwitch>
                    <Route path="/loading" render={renderComponent(Loading)} excat />
                    <Route permission="admin" path="/admin" render={renderComponent(AdminPack)} />
                    <Route permission="signed_in" path="/" render={renderComponent(UserPack)} />
                    <Route exact path="/login" render={renderComponent(SessionPack)} />
                    <Route exact path="/sign-up" render={renderComponent(SessionPack)} />
                    <Route path="/" render={renderComponent(AnonPack)} />
                    <Route render={renderComponent(PageNotFound)} />
                </AuthSwitch>
            </React.Fragment>
        )
    }
}