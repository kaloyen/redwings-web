import React from 'react'
import SuperIndex from 'parts/SuperIndex.jsx'
import { Character } from 'Carrier'
import { redirect } from 'Carrier/utils.js'

export default class CharacterIndex extends SuperIndex {
  title="Characters"
  headings=[
    'Name', 'Gender', 'Race', 'Subrace', {key: 'gc', text: `Grand Company`}, 
    { key: 'free_company', text: `Free Company` }, { key: 'gc_rank', text: `Rank` }
  ]
  dataCall = () => Character.asTable({ headings: this.headings })

  rowClick = (id) => redirect(`/account/characters/${id}`)
}