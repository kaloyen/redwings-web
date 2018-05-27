import React from 'react'
import { Link } from "react-router-dom"
import Session from 'Carrier/Session.js'
import { Button } from 'parts/form'
import { observer } from 'mobx-react'
import { observable, computed, reaction, action } from 'mobx'
import SectionIntro from 'parts/SectionIntro.jsx'
import { withRouter } from 'react-router-dom'
@observer
export class TopBar extends React.Component {

    anonLinks = [
        { url: "/login", text: "Login", button: true },
        { url: "/sign-up", text: "Sign up", button: true },
    ]
    userLinks = [
        { component: <Button onClick={Session.logout}>Logout</Button> },
    ]

    renderAsButton = (link) => {
        return <Button to={link.url}>{link.text}</Button>
    }

    render(){
        return (
            <React.Fragment>
            <div style={{ 'position': 'relative', 'right': `10%`, top: `14px`, marginBottom: `48px` }}>
                <ul style={{ 'listStyleType': 'none', 'right': 0, position: 'absolute', marginTop: `4px` }}>
                    {(Session.loggedIn ? this.userLinks : this.anonLinks).map(link => (
                        <li 
                            key={link.url} 
                            style={{ 
                                display: 'inline', 
                                paddingTop: '8px', 'paddingBottom': '8px', 
                                paddingLeft: '8px', paddingRight: '8px',
                            }}>
                            {link.component 
                                ? link.component 
                                : link.button 
                                    ? this.renderAsButton(link) 
                                    : <Link to={link.url}>{link.text}</Link>}
                        </li>
                    ))}
                </ul>
            </div>
            </React.Fragment>
        )
    }
}

@withRouter
@observer
export class SideBar extends React.Component {

    links = [
        { url: "/", text: "Dashboard" },
        { url: "/account", text: "My Account",sublinks: [
            { url: "/account/characters/import", text: "Import Character" },
            { url: "/account/characters", text: "My Characters" },
        ] },
    ]

    adminLinks = [
        { url: "/admin/users", text: "Users" },
    ]

    sessionLinks = () => {
        return Session.loggedIn 
        ? [
            { onClick: "/logout", text: "Logout", func: Session.logout },
        ]
        : [
            { url: "/login", text: "Login" },
            { url: "/sign-up", text: "Sign up" },
        ]
    }

    urlMatch(link){
        if(!link.url) return false
        if(link.url === '/') return this.props.location.pathname === link.url
        return this.props.location.pathname.match(link.url)
    }

    render(){
        return (
            <div >
                <div style={{ 'left': 0, height: window.innerHeight, position: `absolute`, backgroundColor: `#404040`, paddingTop: `80px` }}>
                    <div style={{ width: `150px` }}>
                        {Session.loggedIn && 
                            this.links.map(link => (
                                <LinkItem link={link} match={this.urlMatch(link)} location={this.props.location} />
                            ))
                        }
                        {(Session.isAdmin && Session.loggedIn && Session.isAuthed(`admin`)) && 
                            this.adminLinks.map(link => (
                                <LinkItem link={link} match={this.urlMatch(link)} location={this.props.location} />
                            ))
                        }
                        {this.sessionLinks().map(link => (
                            <LinkItem link={link} match={this.urlMatch(link)} location={this.props.location} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

@observer
class LinkItem extends React.Component {
    
    componentDidMount(){
        this.text = this.boldText(this.props.match)
    }
    componentWillReceiveProps(props){
        if(props.match !== this.props.match){
            this.text = this.boldText(props.match)
        }
    }

    @action
    boldText(match){
        if(match) return <b>{this.props.link.text}</b>
        return this.props.link.text
    }

    @observable text

    renderAsButton = (link) => {
        return 
    }

    render(){
        const { link, match } = this.props
        return(
            <div>
                <div 
                    key={link.url || link.text} 
                    style={{ 
                        // display: 'inline', 
                        paddingTop: '8px', 'paddingBottom': '8px', 
                        paddingLeft: `8px`,
                        width: `142px`,
                        backgroundColor: `${match ? '#c0c0c0' : 'white'}`,
                        marginBottom: `4px`, marginTop: `4px`,
                        borderRadius: `0 12px 12px 0`,
                    }}>
                    {link.button 
                        ? <Button style={{ width: `100%`, textDecoration: `none` }} to={link.url}>{this.text}</Button>
                        : link.onClick ? <Link style={{ color: `black` }} to={`/`} onClick={()=>link.func()}>{link.text}</Link> : <Link style={{ color: `black` }} to={link.url}>{link.text}</Link>}
                </div>
                {link.sublinks && match && link.sublinks.map(link => (
                    <LinkItem link={link} match={this.props.location.pathname === link.url } />
                ))}
            </div>
        )
    }
}