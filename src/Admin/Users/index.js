import Scene from './scene.jsx'
import FormPage from './formpage.jsx'
import React from 'react'
import SuperIndex from 'parts/SuperIndex.jsx'
import { User } from 'Carrier'
import { redirect } from 'Carrier/utils.js'
export default class UserIndex extends SuperIndex {

  headings=[
    `ID`, `Name`, `Email`, `Admin`
  ]

  dataCall = () => User.asTable({ headings: this.headings })

  rowClick = (id) => redirect(`/admin/users/${id}`)
}

export { 
  UserIndex,
  Scene,
  FormPage
}