import React from 'react'
import Wrapper from 'parts/Wrapper.jsx'
import { Input, Form, Button } from 'parts/form'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Character } from 'Carrier'
import { ErrorHandler, ErrorStore } from 'Lib/Utils'
import { Link } from 'react-router-dom'
@observer
export default class CharacterBuilder extends React.Component {

  @observable url = 'https://eu.finalfantasyxiv.com/lodestone/character/20540306/'
  @observable character = {}
  @observable submitting = false

  findCharacter = async() => {
    ErrorStore.clear()
    this.submitting = true
    const character = await Character.perform(`new_character`, { url: this.url })
    if(character.data.error) {
      if(character.data.result.id){
        this.character.id = character.data.result.id
        this.character.alreadyImported = true
      }else {
        ErrorStore.addError(character.data.message)
      }
    } else {
      this.character = character.data.result
      this.character.message = character.data.message
    }
    this.submitting = false
  }

  render(){
    return (
      <div>
        <h2>Character Builder...</h2>
          <ErrorHandler />
          {this.character.id && 
            <div style={{ color: `#8000ff` }}>
              {this.character.message 
              ? <p>{this.character.message}</p> 
              : <p>Your character {this.character.name} {this.character.alreadyImported ? ` has already been imported.` : ` was successfully imported!`}</p>}
              <p>You can view your character <Link to={`/account/characters/${this.character.id}`}>here</Link></p>
            </div>
          }
          <Wrapper floating maxWidth noMargin>
          <Form>
              <Input 
                colSpan={1}
                name="url"
                value={this.url}
                onChange={(value)=> this.url = value}
              />
            <Button onClick={!this.submitting && this.findCharacter}>{!this.submitting ? `Submit` : `Submitting`}</Button>
          </Form>
        </Wrapper>
      </div>
    )
  }
}