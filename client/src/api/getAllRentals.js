import Constants from '../utils/constants';

export default async function getAllRentals() {
  const url = `${Constants.baseUrl}/api/rentals`;

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
