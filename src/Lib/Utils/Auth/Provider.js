import React from "react"
import PropTypes from "prop-types"
import Session from 'Carrier/Session.js'
import { toJS } from 'mobx'
import { post, getApiHeaders } from "../api_http"
export default class AuthProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    defaultAuth: PropTypes.any,
    localStorageKey: PropTypes.string,
    url: PropTypes.string,
  }

  static defaultProps = {
    defaultAuth: {},
  }

  static childContextTypes = {
    auth: PropTypes.object,
  }

  constructor(props) {
    super(props)

    const retreived = this.retrieveAuth()
    this.state = {
      auth: this.buildContext(
        retreived === undefined ? props.defaultAuth : retreived,
      ),
    }
  }

  getChildContext() {
    return { auth: this.state.auth }
  }

  componentDidMount() {
    this.verify()
  }

  storeAuth(data) {
    const { localStorageKey } = this.props
    if (!localStorageKey) return
    data = data
    STORAGE.set(localStorageKey, data)
  }

  retrieveAuth() {
    const { localStorageKey } = this.props
    if (!localStorageKey) return
    const data = STORAGE.get(localStorageKey)
    if (data) return data
  }

  buildContext(data = {}) {
    return {
      ...data,
      reAuth: this.verify.bind(this),
    }
  }

  verify() {
    return post(this.props.url).then(response => {
      this.storeAuth(response.data)
      this.setState({ auth: this.buildContext(response.data) })
    })
  }

  render() {
    return React.Children.only(this.props.children)
  }
}