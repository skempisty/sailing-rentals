import React from 'react';

import getUserList from "../../api/getUserList";

export default class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
      loading: true
    }
  }

  async componentDidMount() {
    console.log('user list mounted')

    try {
      const userList = await getUserList();

      this.setState({ userList });
    } catch (err) {
      alert('Error loading User List')
    }
  }

  render() {
    const { userList } = this.state;

    return (
      <React.Fragment>
        {userList.map(user =>
          <div>{user.email}</div>
        )}
      </React.Fragment>
    )
  }
}
