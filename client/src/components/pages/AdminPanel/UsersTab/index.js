import React from 'react';
import { connect } from 'react-redux';

import { Card, Table } from 'react-bootstrap';

import UserRow from './UserRow';

class UsersTab extends React.Component {
  render() {
    const { users } = this.props;

    return (
      <React.Fragment>
        <Card>
          <Table>
            <thead><tr>
              <th>Sailor</th>
              <th>Email</th>
              <th/>
            </tr></thead>

            <tbody>
              {users.map((user, index) =>
                <UserRow
                  key={`user-row-${user.id}-${index}`}
                  user={user}
                />
              )}
            </tbody>
          </Table>
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { users } = state.users;

  return { users };
};

export default connect(
  mapStateToProps,
  null
)(UsersTab);
