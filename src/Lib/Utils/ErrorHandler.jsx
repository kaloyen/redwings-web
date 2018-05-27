import React from 'react'
import { observer } from 'mobx-react'
import { observable, action, computed, toJS } from "mobx"
import ErrorStore from './ErrorStore.js'

@observer
export default class ErrorHandler extends React.Component {

  render(){
    if(!ErrorStore.hasErrors) return null
    return (
      <div style={{ borderRadius: `4px`, border: `2px solid #aa0000`, backgroundColor: `#e2e2e2` }} >
        <ul style={{ listStyleType: 'none', paddingLeft: `10px` }}>
          {ErrorStore.getErrors.map(error => (
            <li style={{ color: `#aa0000` }} >{error}</li>
          ))}
        </ul>
      </div>
    )

  }
}