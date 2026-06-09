'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/ekadashis/slug/:slug',
      handler: 'api::ekadashi.ekadashi.findBySlug',
    },
  ],
};