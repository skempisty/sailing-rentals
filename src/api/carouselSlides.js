const db = require('../connectDb')

exports.getCarouselSlides = async () => {
  return await db.query(`SELECT * FROM ${db.name}.carousel_slides WHERE deletedAt = NULL`)
}

// exports.createHomepageCarouselSlide = async ({ label, subText, imgBlob, createdBy }) => {
//   // post image to S3 - get S3 link
//   // const imageS3Url = image post and get S3 url
//
//   return await db.query('INSERT INTO sailing.homepage_carousel_slides (label, subText, imageUrl, createdBy) VALUES (?, ?, ?, ?)', newSlide)
// }