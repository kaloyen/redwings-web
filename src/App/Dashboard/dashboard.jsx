import React from 'react'
import Session from 'Carrier/Session.js'
import Wrapper from 'parts/Wrapper.jsx'
import { createDecipheriv } from 'crypto';
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { user } from 'Carrier/model.js'
import { Button } from 'parts/form'
import { Table } from 'parts/table'
import { testAction } from 'Carrier/model.js'
@observer
export default class Dashboard extends React.Component {
    render(){
        return Session.loggedIn ? <UserDashboard /> : <AnonDashboard /> 
    }
}

@observer
class UserDashboard extends React.Component {
    
    @observable users = []

    render(){
        return (
            <div>
                <Wrapper>
                    {/*Logged in as: {Session.email}*/}
                    {Object.entries(Session.data).map(([k, v]) => {
                        return (
                            <p>{`${k}: ${v}`}</p>
                        )
                    })}
                </Wrapper>
            </div>
        )
    }
}

@observer
class AnonDashboard extends React.Component {
    render(){
        return (
            <div>
                Login or signup to begin.
            </div>
        )
    }
}