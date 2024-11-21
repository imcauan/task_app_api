/* eslint-disable prettier/prettier */
export const configuration = () => ({
  BASE_URL: process.env.BASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3333,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  STRIPE_SECRET: process.env.STRIPE_SECRET,
});
