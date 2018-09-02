import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import PasswordResult from './PasswordResult'

@inject('passwordStore')
@observer
export default class Password extends Component {
  componentDidMount() {this.props.passwordStore.reset()}

  handleInput = (e) => {
    this.props.passwordStore.setPassword(e.target.value)
    if (e.target.value) {
      this.props.passwordStore.checkPwned()
    } else {
      this.props.passwordStore.reset()
    }
  }

  render() {
    const { password } = this.props.passwordStore

    return (
      <div className="container my-4 text-center pt-4">
        <h1 className="display-4">Password Pwned?</h1>
        <p className="lead">Check passwords against those obtained from previous data breaches</p>

        <div className="input-group col-md-8 offset-md-2">
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="password"
            value={password}
            onChange={this.handleInput}
          />
        </div>

        <PasswordResult />
      </div>
    )
  }
}
