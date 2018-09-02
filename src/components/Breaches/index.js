import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import qs from 'qs'

import FilterControl from './FilterControl'
import ContentDisplay from './ContentDisplay'

@inject('breachStore')
@withRouter
@observer
export default class Breaches extends Component {

  componentDidMount() {
    this.props.breachStore.reset()
    this.props.breachStore.resetFilter()
    const domain = this.getDomain()
    if (domain) {
      this.props.breachStore.setDomain(domain)
    }
    this.props.breachStore.loadBreaches()
  }

  componentDidUpdate(previousProps) {
    if (previousProps.location.search !== this.props.location.search) {
      this.props.breachStore.reset()
      this.props.breachStore.resetFilter()
      const domain = this.getDomain()
      if (domain) {
        this.props.breachStore.setDomain(domain)
      }
      this.props.breachStore.loadBreaches()
    }
  }

  getDomain(props = this.props) {
    if (this.props.location.search) {
      return qs.parse(props.location.search.slice(1)).domain
    }
    return null
  }

  render() {
    const {domain} = this.props.breachStore
    return (
      <div className="container mb-4 text-center pt-4">
        <h1 className="display-4">Breached Site Detail</h1>

        {domain ? null : <FilterControl /> }

        <ContentDisplay />
      </div>
    )
  }
}
