const { OAuth2Client } = require('google-auth-library')

async function googleTokenIdToUser(token) {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  return ticket.getPayload()
}

module.exports = googleTokenIdToUser
