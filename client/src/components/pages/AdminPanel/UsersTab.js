import React from 'react';
import {Table, Card, Button} from "react-bootstrap";
import approveUser from "../../../api/approveUser";
import deleteUser from "../../../api/deleteUser";

export default class UsersTab extends React.Component {
  async handleApproveClick(userId) {
    console.log('approve', userId)

    await approveUser(userId)
  }

  async handleDeleteUserClick(userId) {
    console.log('delete', userId)

    await deleteUser(userId)
  }

  render() {
    const { users } = this.props;

    return (
      <React.Fragment>
        <Card><Card.Body>
          <Table striped bordered hover style={{ margin: '0' }}>
            <thead>
              <tr>
                <th>Email</th>
                <th>approve</th>
                <th>delete</th>
              </tr>
            </thead>

            <tbody>
            {users.map((user, index) =>
              <tr key={`user-row-${user.id}-${index}`}>
                <td>{user.email}</td>
                <td
                  onClick={() => this.handleApproveClick(user.id)}
                  style={{ cursor: 'pointer '}}
                >
                  X
                </td>
                <td
                  onClick={() => this.handleDeleteUserClick(user.id)}
                  style={{ cursor: 'pointer '}}
                >
                  X
                </td>
              </tr>
            )}
            </tbody>
          </Table>
        </Card.Body></Card>
      </React.Fragment>
    )
  }
}