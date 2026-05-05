'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/landing-page-full',
      handler: 'api::landing-page.landing-page.find',
    },
  ],
};