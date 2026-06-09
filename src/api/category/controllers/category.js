'use strict';

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const { getPagination, buildPaginationMeta } = require('../../../utils/pagination');

const populate = {
  blogs: {
    populate: {
      FeaturedImage: media,
    },
  },
  SEO: seo,
};

module.exports = createCoreController('api::category.category', ({ strapi }) => ({

  // 🔹 GET ALL (paginated)
  async find(ctx) {
    const { page, pageSize, start, limit } = getPagination(ctx);
    const [data, total] = await Promise.all([
      strapi.entityService.findMany('api::category.category', {
        populate,
        sort: { createdAt: 'desc' },
        start,
        limit,
      }),
      strapi.entityService.count('api::category.category'),
    ]);
    ctx.body = { data, pagination: buildPaginationMeta(page, pageSize, total) };
  },

  // 🔹 GET BY ID
  async findOne(ctx) {
    const { id } = ctx.params;
    const data = await strapi.entityService.findOne('api::category.category', id, { populate });
    if (!data) return ctx.notFound(`Category with id "${id}" not found`);
    ctx.body = data;
  },

  // 🔹 GET BY SLUG
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const data = await strapi.entityService.findMany('api::category.category', {
      filters: { Slug: slug },
      populate,
    });
    if (!data[0]) return ctx.notFound(`Category with slug "${slug}" not found`);
    ctx.body = data[0];
  },

}));
