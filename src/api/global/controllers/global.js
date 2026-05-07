'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const header = require('../../../utils/populate/header');
const footer = require('../../../utils/populate/footer');

const populate = {
  Header: header,
  Footer: footer,
};

module.exports = createCoreController('api::global.global', ({ strapi }) => ({

  async find(ctx) {

    const data = await strapi.entityService.findMany(
      'api::global.global',
      {
        populate,
      }
    );

    ctx.body = data;
  },

}));