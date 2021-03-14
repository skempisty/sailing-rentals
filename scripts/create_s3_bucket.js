/**
 * Create an S3 bucket
 *
 * Run:
 * node s3_createbucket.js BUCKET_NAME
 */

(async () => {
  const AWS = require('aws-sdk')

  // Set the region
  AWS.config.update({ region: 'REGION' })

  // Create S3 service object
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

  // Create the parameters for calling createBucket
  const bucketParams = {
    Bucket : process.argv[2]
  };

  // call S3 to create the bucket
  try {
    const data = await s3.createBucket(bucketParams)

    console.log("Success", data.Location)
  } catch (err) {
    console.log("Error", err)
  }
})()