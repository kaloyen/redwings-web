import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable, action, reaction } from 'mobx'

@observer
export default class Grid extends React.Component {
  
  static propTypes = {
    columns: PropTypes.number,
  }

  componentDidMount(){
    this.generateRows()
  }

  componentDidUpdate(props){
    props.reload === true && this.generateRows()
    props.reload === true && this.props.resetReload()
  }
  

  // componentDidUpdate(props){
  //   this.props.trackedValues && this.props.trackedValues.map((val, index) => {
  //     this.trackedValues.set(index, val)
  //   }, this)
  //   if(props.children !== this.props.children){
  //     this.generateRows()
  //   }
  // }
  @observable trackedValues = observable.map()
  @observable row = 1
  @observable grid = []
  @observable row = []

  @action
  generateRows(){
    this.grid = []
    this.row = []
    React.Children.map(this.props.children, (elem, index) => {
      if(this.canFitOnRow(elem, this.row, this.props.columns)){
        this.row.push(elem)
      } else {
        this.buildRow(this.row)
        this.row = []
        this.row.push(elem)
      }
    }, this)
    this.buildRow(this.row)
  }
  @action
  buildRow = (row) => {
    const newRow = row.map((elem, index) => {
      return (
      <GridItem elem={elem} index={index} columns={this.props.columns} /> 
      )
    }, this)
    this.saveCurrentRow(newRow)
  }
  @action
  saveCurrentRow = (row) => {
    this.grid.push(row)
    this.row ++
  }
  @action
  canFitOnRow = (elem, currentRow, max) => {
    if(currentRow.length === 0) return true
    let count = 0
    currentRow.map(elem => {
      count = count + elem.props.colSpan
    }, this)
    if(count+elem.props.colSpan > max) return false
    else return true
  }

  render() {
    if(!this.grid) return null
    return (
      <div style={{ display: `grid`, gridTemplateColumns: `auto` }} >
        {this.grid.map(rows => {
          return (
            rows.map(elem => {
              return elem
            })
          )
        })}
      </div>
    )
  }
}

@observer
export class GridItem extends React.Component {
  render(){
    return (
      <div key={this.props.index} style={{ gridColumn: `${this.props.index+1} / span ${
        this.props.elem.props.colSpan > this.props.columns 
          ? this.props.columns 
          : this.props.elem.props.colSpan || 1
        }`, gridRow: this.row }}>
        {this.props.elem}
      </div>
    )
  }
}
