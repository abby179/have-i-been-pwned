import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import key from 'weak-key'

const DisplayBreaches = (props) => {
  if (props.breachList.length) {
    return (
      <div className="mt-4">
        <h3 className="pb-1 border-bottom border-primary">Breaches you were pwned in</h3>
        {
          props.breachList.map((breach) => (
            <div className="row" key={key(breach)}>
              <div className="col-md-3 text-right">
                {
                  breach.Domain ?
                  (
                    <Link to={{pathname: '/breaches', search: `?domain=${breach.Domain}`}}>
                      <h4>{breach.Title}</h4>
                    </Link>
                  ) :
                  <h4>{breach.Title}</h4>
                }
              </div>
              <div className="col-md-9 text-left">
                <span dangerouslySetInnerHTML = {{ __html:breach.Description }}></span>
                <p><span className="font-weight-bold">Compromised data: </span>{breach.DataClasses.join(', ')}</p>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
  return null
}

const DisplayPastes = (props) => {
  if (props.pasteList.length) {
    return (
      <div className="mt-4">
        <h3 className="pb-1 border-bottom border-primary">Pastes you were found in</h3>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Paste Title</th>
              <th scope="col">Date</th>
              <th scope="col">Emails</th>
            </tr>
          </thead>
          <tbody>
            {
              props.pasteList.map((paste) => (
                <tr key={key(paste)}>
                  <td>{paste.Title || "No Title"}</td>
                  <td>{paste.Date ? (new Date(paste.Date)).toUTCString() : "Unknown"}</td>
                  <td>{paste.EmailCount}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
  return null
}


@inject('accountStore')
@observer
export default class AccountResult extends Component {
  render() {
    const { getResult, breachList, pasteList, isLoading } = this.props.accountStore

    if (isLoading) {
      return <h5 className="text-center mt-4">Loading...</h5>
    }

    if (getResult) {
      if (!breachList.length && !pasteList.length) {
        return <h3 className="text-success mt-4">Good! No pwnage found!</h3>
      } else {
        return (
          <div className="container mt-4">
            <h3 className="text-danger">No! Pwnage found!</h3>
            <p className="text-danger">
              Pwned on {breachList.length} breached sites and found {pasteList.length} pastes
            </p>

            <DisplayBreaches breachList={breachList}/>
            <DisplayPastes pasteList={pasteList}/>

          </div>
        )
      }
    }
    return null
  }
}
