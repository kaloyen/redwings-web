import React from 'react'
import { observer } from 'mobx-react'
import { observable, reaction } from 'mobx'

@observer
export default class LoadRecord extends React.Component {

  constructor(...args) {
    super(...args)

    this._render = this.render
    this.render = this.mainRender
  }

  @observable record = {}
  @observable model
  @observable id
  @observable loaded = false

  componentDidMount(){
    this.loadRecord()
    reaction(()=>this.id, ()=>this.loadRecord())
  }

  async loadRecord(){
    if(!(this.id && this.model)) return
    const response = await this.model.find(this.id)
    if(!response.error){
      this.record = response.data.result
      this.loaded = true
      this.afterLookup && this.afterLookup(this.record)
    }
  }

  renderLoading() {
    return `Loading...`
  }
  
  mainRender() {
    if (this.model && !this.record) {
      return this.renderLoading()
    }
    return this._render()
  }

}