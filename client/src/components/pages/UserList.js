import React from 'react';
import { Table } from "react-bootstrap";

import getUserList from "../../api/getUserList";
import approveUser from "../../api/approveUser";
import deleteUser from "../../api/deleteUser";

export default class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
      loading: true
    }
  }

  async componentDidMount() {
    try {
      const userList = await getUserList();

      this.setState({ userList });
    } catch (err) {
      alert('Error loading User List')
    }
  }

  async handleApproveClick(userId) {
    console.log('approve', userId)

    await approveUser(userId)
  }

  async handleDeleteUserClick(userId) {
    console.log('delete', userId)

    await deleteUser(userId)
  }

  render() {
    const { userList } = this.state;

    return (
      <React.Fragment>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>approve</th>
              <th>delete</th>
            </tr>
          </thead>

          <tbody>
            {userList.map((user, index) =>
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
      </React.Fragment>
    )
  }
}
