import React, { Component } from 'react';
import './App.css';
import AppPack from './packs/app.jsx'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import View from './App/View.jsx'
import AuthProvider from './Lib/Utils/Auth/Provider'
import Session from 'Carrier/Session.js'
import { autorun } from 'mobx'
class App extends Component {

  componentDidMount(){
    autorun(()=>Session.fetchAllDataServer())
  }

  render() {
    return (
      <div className="App">
        <Router>
          <AuthProvider url="/api/verify_credentials" localStorageKey="auth">
            <View>
              <AppPack />  
            </View>
          </AuthProvider>
        </Router>
      </div>
    );
  }
}

export default App;
