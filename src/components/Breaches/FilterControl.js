import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

const CheckboxWithLabel = (props) => {
  const { id, name, handleChange, label, checkedStatus } = props
  return (
    <div className="custom-control custom-checkbox custom-control-inline">
      <input
        type="checkbox" 
        className="custom-control-input" 
        id={id}
        name={name}
        value={checkedStatus} 
        onChange={handleChange}
      />
      <label className="custom-control-label" htmlFor={id}>{label}</label>
    </div>
  )
}

@inject('breachStore')
@observer
export default class FilterControl extends Component {
  handleChange = (e) => {this.props.breachStore.handleFilterChange(e.target.name)}
  handleClear = () => {this.props.breachStore.resetFilter()}

  render() {
    const { isVerified, isSensitive, isSpamList } = this.props.breachStore.filterState
    return (
      <div className="container mt-3 d-flex align-items-baseline justify-content-center">
        <CheckboxWithLabel
          id={"verified"}
          name={"isVerified"}
          label={"Verified"}
          checkedStatus={isVerified}
          handleChange={this.handleChange}
        />

        <CheckboxWithLabel
          id={"sensitive"}
          name={"isSensitive"}
          label={"Sensitive"}
          checkedStatus={isSensitive}
          handleChange={this.handleChange}
        />

        <CheckboxWithLabel
          id={"spamList"}
          name={"isSpamList"}
          label={"SpamList"}
          checkedStatus={isSpamList}
          handleChange={this.handleChange}
        />

        <button
          className="btn btn-outline-primary btn-sm" 
          onClick={this.handleClear}
        >
          Clear All
        </button>
      </div>
    )
  }
}
