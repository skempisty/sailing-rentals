import Constants from '../../utils/constants';

/**
 * Posts a google profile for user creation or if already existing, a user update
 *
 * @param {object} profileObj is a property on the google login response
 */
export default async function loginUser(profileObj) {
  const url = `${Constants.baseUrl}/api/users`;

  const { googleId, name, email, imageUrl } = profileObj;

  console.log('profileObj', profileObj);
  return 'user';

  const postOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      googleId,
      name,
      email,
      imageUrl
    })
  };

  return await fetch(url, postOptions);
}

