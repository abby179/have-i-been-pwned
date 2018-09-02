import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import CheckForm from './CheckForm'
import AccountResult from './AccountResult'

@inject('accountStore')
@observer
export default class Account extends Component {
  componentDidMount() {
    this.props.accountStore.reset()
    this.props.accountStore.setEmail('')
  }

  handleInput = (e) => this.props.accountStore.setEmail(e.target.value)
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.accountStore.getResults()
  }
  
  render() {
    const { email, isLoading } = this.props.accountStore

    return (
      <div className="container my-4 text-center pt-4">
        <h1 className="display-4">Have I Been Pwned?</h1>
        <p className="lead">Check if you have an account that has been compromised in a data breach</p>

        <CheckForm
          value={email}
          type={"email"}
          isLoading={isLoading}
          placeholder={"email address"}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
        />

        <AccountResult />

      </div>
    )
  }
}
