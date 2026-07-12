'use strict';

/**
 * pooja controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const { getPagination, setPaginationHeaders } = require('../../../utils/pagination');

const populate = {
  FeaturedImage: media,
  PoojaBlock: dynamicZones.commonDynamicZone,
  SEO: seo,
};

module.exports = createCoreController('api::pooja.pooja', ({ strapi }) => ({
  async find(ctx) {
    const { page, pageSize, start, limit } = getPagination(ctx);
    const { locale } = ctx.query;
    const [data, total] = await Promise.all([
      strapi.entityService.findMany('api::pooja.pooja', {
        populate, start, limit, locale,
      }),
      strapi.entityService.count('api::pooja.pooja', { locale }),
    ]);
    setPaginationHeaders(ctx, page, pageSize, total);
    ctx.body = data;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { locale } = ctx.query;
    const data = await strapi.entityService.findOne('api::pooja.pooja', id, { populate, locale });
    if (!data) return ctx.notFound(`Pooja with id "${id}" not found`);
    ctx.body = data;
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { locale } = ctx.query;
    const data = await strapi.entityService.findMany('api::pooja.pooja', {
      filters: { Slug: slug }, populate, locale,
    });
    if (!data[0]) return ctx.notFound(`Pooja with slug "${slug}" not found`);
    ctx.body = data[0];
  },
}));
