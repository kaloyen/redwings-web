import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import Wrapper from 'parts/Wrapper.jsx'
import { Button } from 'parts/form'
import { Table } from 'parts/table'
import SectionIntro from 'parts/SectionIntro.jsx'
@observer
export default class SuperIndex extends React.Component {

  componentDidMount(){
    this.loadData()
  }

  @observable rowClick
  @observable headings
  @observable dataCall
  @observable data = []
  @observable loading = false

  loadData = async() => {
    this.loading = true
    if(!this.dataCall) return
    const response = await this.dataCall()
    this.data = Object.values(response.data.result)
    this.loading = false
  }

  render(){
    return (
      <div>
        <Wrapper noMargin maxWidth>
          <div style={{ width: `100%`, textAlign: `right` }}>
            <Button onClick={!this.loading && this.loadData}>{this.loading ? `Loading...` : `Reload Table`}</Button>
          </div>
        </Wrapper>
        <SectionIntro title={this.title} heading={1.25} wrapperProps={{ sunken: true, noMargin: true,  maxWidth: true }}>
            <Table
                headers={this.headings} 
                data={this.data}
                asObject
                rowClick={(id)=>this.rowClick(id)}
            />
        </SectionIntro>
      </div>
    )
  }
}