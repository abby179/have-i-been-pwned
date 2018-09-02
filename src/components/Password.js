import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import CheckForm from './CheckForm'
import PasswordResult from './PasswordResult'

@inject('passwordStore')
@observer
export default class Password extends Component {
  componentDidMount() {this.props.passwordStore.reset()}

  handleInput = (e) => this.props.passwordStore.setPassword(e.target.value)
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.passwordStore.checkPwned()
  }

  render() {
    const { password, isLoading } = this.props.passwordStore

    return (
      <div className="container my-4 text-center pt-4">
        <h1 className="display-4">Password Pwned?</h1>
        <p className="lead">Check passwords against those obtained from previous data breaches</p>

        <CheckForm
          value={password}
          type={"password"}
          isLoading={isLoading}
          placeholder={"password"}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
        />

        <PasswordResult />
      </div>
    )
  }
}
