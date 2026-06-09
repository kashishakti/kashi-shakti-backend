'use strict';

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const { getPagination, setPaginationHeaders } = require('../../../utils/pagination');

const populate = {
  blogs: { populate: { FeaturedImage: media } },
  SEO: seo,
};

module.exports = createCoreController('api::category.category', ({ strapi }) => ({

  async find(ctx) {
    const { page, pageSize, start, limit } = getPagination(ctx);
    const [data, total] = await Promise.all([
      strapi.entityService.findMany('api::category.category', {
        populate, sort: { createdAt: 'desc' }, start, limit,
      }),
      strapi.entityService.count('api::category.category'),
    ]);
    setPaginationHeaders(ctx, page, pageSize, total);
    ctx.body = data;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const data = await strapi.entityService.findOne('api::category.category', id, { populate });
    if (!data) return ctx.notFound(`Category with id "${id}" not found`);
    ctx.body = data;
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const data = await strapi.entityService.findMany('api::category.category', {
      filters: { Slug: slug }, populate,
    });
    if (!data[0]) return ctx.notFound(`Category with slug "${slug}" not found`);
    ctx.body = data[0];
  },

}));
