import React from 'react'
import { connect } from 'react-redux'

import { Card, Table } from 'react-bootstrap'

import UserRow from './UserRow'
import PaginationBar from '../../../shared/PaginationBar'

import isNotDeleted from '../../../../utils/isNotDeleted'
import { pageSize } from '../../../../config'

class UsersTab extends React.Component {
  constructor(props) {
    super(props)

    this.activeUsers = props.users.filter(isNotDeleted)

    this.state = {
      currentPage: 1
    }
  }

  get showUsers() {
    const { currentPage } = this.state
    const { activeUsers } = this

    console.log('activeUsers', activeUsers)

    const firstIndex = currentPage * pageSize
    const lastIndex = firstIndex + pageSize

    return activeUsers.slice(firstIndex, lastIndex)
  }

  get pageCount() {
    return Math.ceil(this.activeUsers.length / pageSize)
    // return 20
  }

  render() {
    const { currentPage } = this.state

    return (
      <div style={{ maxWidth: '40em' }}>
        <Card>
          <Table responsive style={{ margin: '0' }}>
            <thead><tr>
              <th>Sailor</th>
              <th>Email</th>
              <th/>
            </tr></thead>

            <tbody>
              {this.showUsers.map((user, index) =>
                <UserRow
                  key={`user-row-${user.id}-${index}`}
                  user={user}
                />
              )}
            </tbody>
          </Table>
        </Card>

        {this.pageCount > 1 &&
          <PaginationBar
            margin='1em auto'
            currentPage={currentPage}
            pageCount={this.pageCount}
            onPageChange={(newPage) => this.setState({ currentPage: newPage })}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { users } = state.users

  return { users }
}

export default connect(
  mapStateToProps,
  null
)(UsersTab)
