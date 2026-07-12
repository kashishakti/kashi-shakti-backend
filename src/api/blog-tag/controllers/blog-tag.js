'use strict';

/**
 * blog-tag controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blog-tag.blog-tag', ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { locale } = ctx.query;
    const data = await strapi.entityService.findMany('api::blog-tag.blog-tag', {
      filters: { Slug: slug }, locale,
    });
    if (!data[0]) return ctx.notFound(`Blog tag with slug "${slug}" not found`);
    ctx.body = data[0];
  },
}));
