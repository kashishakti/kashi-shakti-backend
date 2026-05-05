'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/global-full',
      handler: 'api::global.global.find',
    },
  ],
};