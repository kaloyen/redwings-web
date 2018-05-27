import React from 'react'
import PropTypes from 'prop-types'
import { Row, Head } from './'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

@observer
export default class Table extends React.Component {
  static propTypes = {
    headers: PropTypes.array,
    data: PropTypes.array,
    rowClick: PropTypes.func,
  }

  tableBorderThickness = 2
  rowBorderThickness = 1

  tableBorderColor = `#dad7ea`
  rowBorderColor = `#757575`

  renderHeaders = () => {
    const { headers } = this.props
    return (
      <thead>
        {
          headers.map((header, index) => {
            return (
              <Head header={header} first={index===0} last={index===headers.length} />
            )
          })
        }
      </thead>
    )
  }

  renderColumn = (value, colIndex, rowIndex, row, data) => (
    <td style={{ 
      overflow: `word-wrap`,
      borderLeft: `1px solid ${this.rowBorderColor}`, 
      borderRight: `${colIndex===row.length ? 1 : 0}px solid ${this.rowBorderColor}`, 
      borderBottom: `${rowIndex===data.length ? 0 : 1}px solid ${this.rowBorderColor}`,
      borderRadius: `4px`,
      padding: `4px`,
      paddingLeft: `6px`
    }}>
      {value === true || value === false ? JSON.stringify(value) : value}
    </td>
  )

  renderRowFromObject = (row, rowIndex, data) => {
    return this.props.headers.map((header, colIndex) => {
        if(typeof(header) === `object`){
          return this.renderColumn(row[header.key.toLowerCase()], colIndex, rowIndex, row, data)
        } else {
          return this.renderColumn(row[header.toLowerCase()], colIndex, rowIndex, row, data)
        }
    }, this)
  }

  renderRows = () => {
    const { data } = this.props
    return (
      <tbody>
        {
          data.map((row, rowIndex) => {
            return this.props.renderRow 
              ? this.props.renderRow(row, rowIndex)
              : (
                  <tr onClick={this.props.asObject && this.props.rowClick && (()=>this.props.rowClick(row.id))}>
                    {this.props.asObject 
                    ? this.renderRowFromObject(row, rowIndex, data) 
                    : row.map((value, colIndex) => (
                        <td style={{ 
                          overflow: `wrap`, 
                          borderLeft: `1px solid ${this.rowBorderColor}`, 
                          borderRight: `${colIndex===row.length ? 1 : 0}px solid ${this.rowBorderColor}`, 
                          borderBottom: `${rowIndex===data.length ? 0 : 1}px solid ${this.rowBorderColor}`,
                          borderRadius: `4px`,
                          padding: `4px`,
                          paddingLeft: `6px`
                        }}>
                          {value === true || value === false ? JSON.stringify(value) : value}
                        </td>
                      ))
                    }
                  </tr>
                )
          })
        }
      </tbody>
    )
  }

  render(){
    const { data, headers } = this.props
    console.log(`table render`, data, headers)
    if(!data || data.length < 1) return `No data...`
    if(!headers || headers.length < 1) return `Missing table headers`
    return (
      <table style={{ 
        border: `2px solid ${this.tableBorderColor}`, 
        textAlign: `left`, 
        width: `100%`, 
        borderRadius: `8px`,
        boxShadow: `1px -1px ${this.rowBorderColor}`,
      }}>
        {this.renderHeaders(headers)}
        {this.renderRows(data)}
      </table>
    )
  }
}