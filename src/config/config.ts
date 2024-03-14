export const config = {
    email: {
      from: process.env.EMAIL_FROM,
      sender: process.env.EMAIL_SENDER || '',
      pass: process.env.EMAIL_SENDER_PASS || '',
      service: process.env.EMAIL_SERVICE || '',
      link_confirmation: process.env.URL_APP + 'api/auth/confirm-email/',
    },
    secrets: {
      secretEncryptId: process.env.SECRET_ID,
      secretJwt: process.env.SECRET_JWT
    },
    link:{
      api: process.env.URL_APP,
      web: process.env.URL_FRONT
    }
  };
  