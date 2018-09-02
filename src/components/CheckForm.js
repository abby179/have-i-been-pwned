import React from 'react'

const CheckForm = (props) => {
  const { value, isLoading, placeholder, type } = props

  return (
    <form onSubmit={props.handleSubmit}>
      <div className="input-group col-md-8 offset-md-2">
        <input
          type={type}
          className="form-control form-control-lg"
          placeholder={placeholder}
          value={value}
          onChange={props.handleInput}
          required
        />
        <span className="input-group-button ml-1">
          <button className="btn btn-primary btn-lg" disabled={isLoading}>check</button>
        </span>
      </div>
    </form>
  )
}

export default CheckForm