import React from 'react';

import getUsers from '../api/getUsers';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = { users: [] };
    }

    async componentDidMount() {
        const users = await getUsers();

        this.setState({ users });
    }

    render() {
        const { users } = this.state;

        return (
            <div>
                {users.map((user) =>
                    <div>{user.name}</div>
                )}
            </div>
        )
    }
}
