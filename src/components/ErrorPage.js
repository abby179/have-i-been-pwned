import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class ErrorPage extends Component {
  state = {
    navigate: false
  }

  componentDidMount() {
    setTimeout(() => this.setState({ navigate: true }), 1500)
  }

  render() {
    if (this.state.navigate) {
      return <Redirect to="/account" />
    }

    return (
      <div className="container my-4 text-center pt-4">
        <h1 className="display-4">Oops, something went wrong</h1>
        <p className="lead">Redirect...</p>
      </div>
    )
  }
}
