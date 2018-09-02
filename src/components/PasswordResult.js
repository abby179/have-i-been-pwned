import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('passwordStore')
@observer
export default class PasswordResult extends Component {
  render() {
    const { isLoading, getResult, result } = this.props.passwordStore

    if (isLoading) {
      return <h5 className="text-center mt-4">Loading...</h5>
    }

    if (getResult) {
      if (result === 0) {
        return <h3 className="text-success mt-4">Good! No pwnage found!</h3>
      } else {
        return (
          <div className="container mt-4">
            <h3 className="text-danger">No! Pwnage found!</h3>
            <p className="text-danger">
              This password has been seen {result} times before
            </p>
          </div>
        )
      }
    }
    return null
  }
}
