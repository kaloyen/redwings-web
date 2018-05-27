import React from 'react'
import { TopBar, SideBar } from 'parts/Navigation/NavBar.jsx'
import Banner from 'parts/Banner.jsx'
import Wrapper from 'parts/Wrapper.jsx'

export default class View extends React.Component {
  render() {
    return (
      <GridView {...this.props} />
    )
  }
}

class GridView extends React.Component {
  render() {
    return (
      <div style={{ display: `grid`, gridTemplateColumns: `auto` }}>
        <div style={{ gridColumnStart: 1, gridColumnEnd: 2, gridRow: 1, height: `64px`, zIndex: 1 }}>
          <Banner />
        </div>
        <div style={{ gridColumnStart: 0, gridColumnEnd: 1, width: `180px` }}>
          <SideBar />
        </div>
        <div style={{ gridColumnStart: 2, gridColumnEnd: 9 , gridRow: 2 }}>
          {this.props.children}
        </div>
        <div style={{ gridColumn: 10 }} />
      </div>
    )
  }
}
