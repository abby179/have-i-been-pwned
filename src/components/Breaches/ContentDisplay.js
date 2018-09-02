import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import key from 'weak-key'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ReactPaginate from 'react-paginate'
import SortingHead from './SortingHead'

const StatusIcon = (props) => {
  if (props.check) {
    return <FontAwesomeIcon icon="check" className="text-success" />
  }
  return <FontAwesomeIcon icon="times" className="text-danger" />
}


@inject('breachStore')
@observer
export default class ContentDisplay extends Component {
  handlePageChange = (data) => {this.props.breachStore.setPage(data.selected)}

  render() {
    const { isLoading, displayBreachList, totalPagesCount,
            currentPage, limit } = this.props.breachStore

    if (isLoading) {
      return <h5 className="text-center mt-3">Loading...</h5>
    }

    const start = currentPage * limit
    const end = currentPage * limit + limit

    return (
      <div>
      <table className="table table-striped mt-4">
        <thead className="thead-dark">
          <tr>
            <SortingHead
              title={"Breach Name"}
              type={"alpha"}
              name={"name"}
            />
            <SortingHead
              title={"PwnCount"}
              type={"numeric"}
              name={"count"}
            />
            <th scope="col">Is Verified</th>
            <th scope="col">Is Sensitive</th>
            <th scope="col">Is SpamList</th>
          </tr>
        </thead>
        <tbody>
          {
            displayBreachList.slice(start, end).map((breach) => (
              <tr key={key(breach)}>
                <td>{breach.Name}</td>
                <td>{breach.PwnCount}</td>
                <td><StatusIcon check={breach.IsVerified} /></td>
                <td><StatusIcon check={breach.IsSensitive} /></td>
                <td><StatusIcon check={breach.IsSpamList} /></td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {
        displayBreachList.length > limit ?
        (
          <ReactPaginate 
            containerClassName={"pagination justify-content-center mb-4"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            activeClassName={"active"}
            breakClassName={"page-item disabled"}
            breakLabel={<a className="page-link">...</a>}
            disabledClassName={"disabled"}
            pageCount={totalPagesCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageChange}
          />):
          null
      }
      </div>
    )
  }
}
