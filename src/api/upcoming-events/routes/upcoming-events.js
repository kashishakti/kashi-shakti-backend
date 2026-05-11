module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/upcoming-events',
      handler: 'upcoming-events.find',
      config: {
        auth: false,
      },
    },
  ],
};
