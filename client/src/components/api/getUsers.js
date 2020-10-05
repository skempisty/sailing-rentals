import Constants from '../../utils/constants';

export default async function getUsers() {
    const usersResponse = await fetch(`${Constants.baseUrl}/api/users`);

    return await usersResponse.json();
}
