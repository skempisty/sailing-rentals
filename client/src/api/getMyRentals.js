import Constants from '../utils/constants';

export default async function getMyRentals() {
  const url = `${Constants.baseUrl}/api/rentals/my`;

  const getOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    }
  };

  const rentalsRes = await fetch(url, getOptions);

  return await rentalsRes.json();
}
