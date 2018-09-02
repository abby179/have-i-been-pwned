import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './Header'
import Account from './Account/index'
import Breaches from './Breaches/index'
import Password from './Password/index'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/account" component={Account}/>
          <Route path="/breaches" component={Breaches}/>
          <Route path="/password" component={Password}/>
          <Redirect from="/" to="/account" />
        </Switch>
      </div>
    )
  }
}

export default App
