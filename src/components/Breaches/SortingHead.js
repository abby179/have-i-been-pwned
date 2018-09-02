import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

@inject('breachStore')
@observer
export default class SortingHead extends Component {
  handleClick = (name) => {
    this.props.breachStore.handleSortChange(name)
  }

  render() {
    const { domain, sortingState } = this.props.breachStore
    const { name, title, type } = this.props

    if (domain) {
      return <th scope="col">{title}</th>
    }

    return (
      <th scope="col" onClick={() => this.handleClick(name)} style={{cursor:'pointer'}}>
        {title} &nbsp;
        {
          sortingState.sortBy === name ?
          <FontAwesomeIcon icon={
            sortingState.asc ? `sort-${type}-down` : `sort-${type}-up`
          } className="text-white" /> :
          null
        }
      </th>
    )
  }
}
