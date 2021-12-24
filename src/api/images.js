const B2 = require('backblaze-b2')
const { nanoid } = require('nanoid')

const b2 = new B2({
  applicationKeyId: process.env.B2_APP_KEY_ID,
  applicationKey: process.env.B2_APP_KEY
})

/**
 * Upload a file to backblaze given a buffer
 * @param {Buffer} fileBuffer
 * @param {string} fileCategory a 'folder' for the file to go into on backblaze
 * @param {boolean} isZip some files needs to be uploaded as zip
 * @return {string} the download url for the newly uploaded file
 */
exports.uploadFile = async (fileBuffer, fileCategory = '', isZip = false) => {
  /*
   * Must authorize with Backblaze first before any api calls
   */
  const authorizeResponse = await b2.authorize()

  const { downloadUrl: baseDownloadUrl } = authorizeResponse.data

  /*
   * Get upload url and auth token - needed to upload
   */
  const getUploadUrlResponse = await b2.getUploadUrl({
    bucketId: process.env.B2_BUCKET_ID
  })

  const {
    authorizationToken: uploadAuthToken,
    uploadUrl
  } = getUploadUrlResponse.data

  /*
   * Actually upload the file
   */
  const uploadFileResponse = await b2.uploadFile({
    uploadUrl,
    uploadAuthToken,
    fileName: `${fileCategory}/${nanoid()}`, // nanoid generates a random string such as '-icTbO-sqdYP_Da6NYgY0'
    data: fileBuffer, // this is expecting a Buffer, not an encoded string
    mime: isZip ? 'application/zip' : null // without this, zip files will not be downloaded as zip
  })

  const { fileId } = uploadFileResponse.data

  return [
    baseDownloadUrl,
    'b2api',
    'v1',
    `b2_download_file_by_id?fileId=${fileId}`
  ].join('/')
}