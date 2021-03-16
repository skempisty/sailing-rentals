const db = require('../connectDb')

exports.getHomepageCarouselSlides = async () => {
  return await db.query(`SELECT * FROM ${db.name}.homepage_carousel_slides WHERE deleted_at = NULL`)
}

// exports.createHomepageCarouselSlide = async ({ label, subText, imgBlob, createdBy }) => {
//   // post image to S3 - get S3 link
//   // const imageS3Url = image post and get S3 url
//
//   return await db.query('INSERT INTO sailing.homepage_carousel_slides (label, sub_text, image_url, created_by) VALUES (?, ?, ?, ?)', newSlide)
// }