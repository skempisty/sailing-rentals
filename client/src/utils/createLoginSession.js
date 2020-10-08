/**
 * Create a login session a user
 *
 * @param {object} user
 */
export default function createLoginSession(user) {
  window.localStorage.setItem('sailing-session', JSON.stringify(user));
}