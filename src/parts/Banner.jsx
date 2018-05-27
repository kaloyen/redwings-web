import React from 'react'

export default class Banner extends React.Component {
  render(){
    return (
      <div style={{ position: 'fixed', width: '100%', 'height': '64px', 'backgroundColor': '#404040', 'marginTop': '0', top: 0, left: 0 }}>
        <div style={{ left: `10%`, position: `absolute`, top: 0, 'height': '64px', width: `64px` }}>
            <img style={{ position: `fixed`, zIndex: 1 }} src="https://img2.finalfantasyxiv.com/c/B25_6f627318de87fe5883eb1631fd8b38a6_23_64x64.png" />
            <img style={{ position: `fixed`, zIndex: 1 }} src="https://img2.finalfantasyxiv.com/c/F20_6fa4e9c297313c6e3574fd892bb55994_00_64x64.png" />
            <img style={{ position: `fixed`, zIndex: 1 }} src="https://img2.finalfantasyxiv.com/c/S2e_e5819503e656c29e1a2d6743e0a0620e_04_64x64.png" />
        </div>
        <div style={{ position: `fixed`, width: window.innerWidth }}>
          <div style={{  textAlign: `center`, fontSize: `3em`, color: `red` }}>
            Red Wings
          </div>
        </div>
          {this.props.children}
      </div>
    )
  }
}