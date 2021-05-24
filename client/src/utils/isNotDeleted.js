/**
 * Intended as a filter function. Use as a catch all to filter out deleted resources before displaying
 * @param {Object} resource all resources have a deletedAt field for this purpose
 * @returns {boolean} true if resource is not deleted
 */
export default function isNotDeleted(resource) {
  return resource.deletedAt === '0000-00-00 00:00:00'
}
