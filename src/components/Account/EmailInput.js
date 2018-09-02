import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('accountStore')
@observer
export default class EmailInput extends Component {
  handleInput = (e) => this.props.accountStore.setEmail(e.target.value)
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.accountStore.getResults()
  }

  render() {
    const { email, isLoading } = this.props.accountStore

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group col-md-8 offset-md-2">
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="email address"
            value={email}
            onChange={this.handleInput}
            required
          />
          <span className="input-group-button ml-1">
            <button className="btn btn-primary btn-lg" disabled={isLoading}>check</button>
          </span>
        </div>
      </form>
    )
  }
}
