import React from 'react'
import SuperIndex from 'parts/SuperIndex.jsx'
import { Character } from 'Carrier'
import { redirect } from 'Carrier/utils.js'
import LoadRecord from 'parts/LoadRecord.jsx'
import { observer } from 'mobx-react'
import Wrapper from 'parts/Wrapper.jsx'
import SectionIntro from 'parts/SectionIntro.jsx'
import { Link } from 'react-router-dom'

@observer
export default class CharacterIndex extends LoadRecord {
  model = Character
  id = this.props.id

  renderItem(text, item){
    return (
      item && 
        <li style={{ padding: `2px` }}>
          <div style={{ gridTemplate: `auto`, display: `grid` }}>
            <span style={{ gridColumn: 1, width: `150px` }} >{text}</span>
            <span style={{ gridColumn: 2,  }} >{item}</span>
          </div>
        </li>
    )
  }

  render(){
    return (
      <Wrapper floating maxWidth>
        <SectionIntro title={this.record.name} heading={1.25} bold style={{ textAlign: `center` }}>
          <p>{this.record.title}</p>
          {this.record.url && <div><a href={this.record.url} target="_blank">View on Lodestone</a></div>}
        </SectionIntro>
        <Wrapper maxWidth>
          <div style={{ display: `grid`, gridTemplateColumns: `auto` }}>
            <div style={{ gridRow: 1, gridColumn: 1 }}>
              <ul style={{ listStyleType: `none`, paddingLeft: `14px` }}>
                {this.renderItem(`Free Company`, this.record.free_company)}
                {this.renderItem(`Grand Company:`, this.record.gc)}
                {this.renderItem(`Grand Company Rank:`, this.record.gc_rank)}
                {this.renderItem(`Gender:`, this.record.gender)}
                {this.renderItem(`Race:`, this.record.race)}
                {this.renderItem(`Subrace:`, this.record.s)}
                {this.renderItem(`Starting City:`, this.record.st_city)}
                {this.renderItem(`Nameday:`, this.record.nameday)}
              </ul>
            </div>
            <div style={{ gridRow: `1 / span 2`, gridColumn: 2 }}>
              {this.record.image && <img src={this.record.image} style={{ height: `400px` }} />}
            </div>
          </div>
        </Wrapper>
      </Wrapper>
    )
  }
}