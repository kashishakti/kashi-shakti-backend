'use strict';

/**
 * vrat-katha controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const { getPagination, setPaginationHeaders } = require('../../../utils/pagination');

const populate = {
  FeaturedImage: media,
  SEO: seo,
  VratKathaBlock: dynamicZones.commonDynamicZone,
};

module.exports = createCoreController('api::vrat-katha.vrat-katha', ({ strapi }) => ({

  async find(ctx) {
    const { page, pageSize, start, limit } = getPagination(ctx);
    const [data, total] = await Promise.all([
      strapi.entityService.findMany('api::vrat-katha.vrat-katha', {
        populate, sort: { createdAt: 'desc' }, start, limit,
      }),
      strapi.entityService.count('api::vrat-katha.vrat-katha'),
    ]);
    setPaginationHeaders(ctx, page, pageSize, total);
    ctx.body = data;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const data = await strapi.entityService.findOne('api::vrat-katha.vrat-katha', id, { populate });
    if (!data) return ctx.notFound(`Vrat Katha with id "${id}" not found`);
    ctx.body = data;
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const data = await strapi.entityService.findMany('api::vrat-katha.vrat-katha', {
      filters: { Slug: slug }, populate,
    });
    if (!data[0]) return ctx.notFound(`Vrat Katha with slug "${slug}" not found`);
    ctx.body = data[0];
  },

}));