/**
 * Promisified version of React's this.setState. Intended to be awaited,
 * otherwise use standard this.setState.
 *
 * @param {Object} updater the state setting object
 * @param {Object} that - usually put this here
 * @returns {Promise} so that we can await setState
 */
export default function setStateAsync(updater, that) {
  return new Promise(resolve => that.setState(updater, resolve));
}
