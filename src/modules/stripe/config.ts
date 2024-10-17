export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    plans: {
      free: {
        priceId: 'price_1Q6aY1FvcR3BIVLpL1lQPWfv',
        quota: {
          workspace: 1,
        },
      },
      pro: {
        priceId: 'price_1Q6w9MFvcR3BIVLpe4A5d76u',
        quota: {
          workspace: -1,
        },
      },
    },
  },
};
