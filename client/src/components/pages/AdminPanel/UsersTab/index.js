import React from 'react'
import { connect } from 'react-redux'

import { Card, Table } from 'react-bootstrap'

import UserRow from './UserRow'

import isNotDeleted from '../../../../utils/isNotDeleted'

class UsersTab extends React.Component {
  render() {
    const { users } = this.props

    return (
      <Card style={{ maxWidth: '40em' }}>
        <Table responsive>
          <thead><tr>
            <th>Sailor</th>
            <th>Email</th>
            <th/>
          </tr></thead>

          <tbody>
            {users.filter(isNotDeleted).map((user, index) =>
              <UserRow
                key={`user-row-${user.id}-${index}`}
                user={user}
              />
            )}
          </tbody>
        </Table>
      </Card>
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
