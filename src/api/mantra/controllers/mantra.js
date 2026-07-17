'use strict';

/**
 * mantra controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { getPagination, setPaginationHeaders } = require('../../../utils/pagination');

const populate = {
  deity: true,
  intention: true,
};

module.exports = createCoreController('api::mantra.mantra', ({ strapi }) => ({

  async find(ctx) {
    const { page, pageSize, start, limit } = getPagination(ctx);
    const { locale, deity, intention } = ctx.query;

    const filters = {};
    if (deity) filters.deity = { Slug: deity };
    if (intention) filters.intention = { Slug: intention };

    const [data, total] = await Promise.all([
      strapi.entityService.findMany('api::mantra.mantra', {
        filters, populate, sort: { createdAt: 'desc' }, start, limit, locale,
      }),
      strapi.entityService.count('api::mantra.mantra', { filters, locale }),
    ]);
    setPaginationHeaders(ctx, page, pageSize, total);
    ctx.body = data;
  },

}));
