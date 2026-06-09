'use strict';

/**
 * blog controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const { getPagination, setPaginationHeaders } = require('../../../utils/pagination');

const populate = {
  FeaturedImage: media,
  categories: true,
  SEO: seo,
  BlogsBlock: dynamicZones.commonDynamicZone,
};

module.exports = createCoreController('api::blog.blog', ({ strapi }) => ({

  async find(ctx) {
    const { page, pageSize, start, limit } = getPagination(ctx);
    const [data, total] = await Promise.all([
      strapi.entityService.findMany('api::blog.blog', {
        populate, sort: { createdAt: 'desc' }, start, limit,
      }),
      strapi.entityService.count('api::blog.blog'),
    ]);
    setPaginationHeaders(ctx, page, pageSize, total);
    ctx.body = data;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const data = await strapi.entityService.findOne('api::blog.blog', id, { populate });
    if (!data) return ctx.notFound(`Blog with id "${id}" not found`);
    ctx.body = data;
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const data = await strapi.entityService.findMany('api::blog.blog', {
      filters: { Slug: slug }, populate,
    });
    if (!data[0]) return ctx.notFound(`Blog with slug "${slug}" not found`);
    ctx.body = data[0];
  },

}));
