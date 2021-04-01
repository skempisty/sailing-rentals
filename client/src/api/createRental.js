import Constants from '../utils/constants';

export default async function createRental(event) {
  const url = `${Constants.baseUrl}/api/rentals`;

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ event })
  };

  const rentalRes = await fetch(url, postOptions);

  return await rentalRes.json();
}