'use strict';

/**
 * mantra-card controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::mantra-card.mantra-card', ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { locale } = ctx.query;
    const data = await strapi.entityService.findMany('api::mantra-card.mantra-card', {
      filters: { Slug: slug }, locale,
    });
    if (!data[0]) return ctx.notFound(`Mantra card with slug "${slug}" not found`);
    ctx.body = data[0];
  },
}));
