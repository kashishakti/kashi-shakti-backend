'use strict';

/**
 * author controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const { getPagination, setPaginationHeaders } = require('../../../utils/pagination');

const populate = {
  FeaturedImage: media,
  SEO: seo,
};

module.exports = createCoreController('api::author.author', ({ strapi }) => ({
  async find(ctx) {
    const { page, pageSize, start, limit } = getPagination(ctx);
    const { locale } = ctx.query;
    const [data, total] = await Promise.all([
      strapi.entityService.findMany('api::author.author', {
        populate, start, limit, locale,
      }),
      strapi.entityService.count('api::author.author', { locale }),
    ]);
    setPaginationHeaders(ctx, page, pageSize, total);
    ctx.body = data;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { locale } = ctx.query;
    const data = await strapi.entityService.findOne('api::author.author', id, { populate, locale });
    if (!data) return ctx.notFound(`Author with id "${id}" not found`);
    ctx.body = data;
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { locale } = ctx.query;
    const data = await strapi.entityService.findMany('api::author.author', {
      filters: { Slug: slug }, populate, locale,
    });
    if (!data[0]) return ctx.notFound(`Author with slug "${slug}" not found`);
    ctx.body = data[0];
  },
}));
