'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/ekadashis/slug/:slug',
      handler: 'api::ekadashi.ekadashi.findBySlug',
    },
    {
      method: 'GET',
      path: '/ekadashis/year/:year/month/:month',
      handler: 'api::ekadashi.ekadashi.findByYearMonth',
      config: {
        auth: false,
      },
    },
  ],
};