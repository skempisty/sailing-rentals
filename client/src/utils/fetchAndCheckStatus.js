import ApiException from './ApiException'

/**
 * Fetch that checks for expected statuses before trying to parse JSON. If an
 * unexpected status is found, throw an ApiException
 *
 * @param {string} url for fetching
 * @param {number[]} expectedStatuses
 * @param {Object} fetchOptions
 * @returns {Object} response object in json
 * @throws {ApiException}
 */
export default async function fetchAndCheckStatus (url, expectedStatuses = [ 200 ], fetchOptions = {}) {
    const res = await fetch(url, fetchOptions)

    if (!expectedStatuses.includes(res.status)) {
        const message = res.statusText || await res.text()

        throw new ApiException(message, res)
    } else {
        return res.json()
    }
}