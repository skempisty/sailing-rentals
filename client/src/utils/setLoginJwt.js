/**
 * Set the login JWT for the site
 * @param {String} loginJwt
 */
export default function setLoginJwt(loginJwt) {
  sessionStorage.setItem('jwt', loginJwt);
}
