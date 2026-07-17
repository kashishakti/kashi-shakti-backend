'use strict';

/**
 * vrat-katha controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const { getPagination, setPaginationHeaders } = require('../../../utils/pagination');

const schema = require('../content-types/vrat-katha/schema.json');
const VALID_TYPES = schema.attributes.Type.enum;

const populate = {
  FeaturedImage: media,
  SEO: seo,
  VratKathaBlock: dynamicZones.commonDynamicZone,
};

module.exports = createCoreController('api::vrat-katha.vrat-katha', ({ strapi }) => ({

  async find(ctx) {
    const { page, pageSize, start, limit } = getPagination(ctx);
    const { locale, type } = ctx.query;

    if (type && !VALID_TYPES.includes(type)) {
      return ctx.badRequest(
        `Invalid value for "type". Allowed values: ${VALID_TYPES.join(', ')}`
      );
    }

    const filters = {};
    if (type) filters.Type = type;

    const [data, total] = await Promise.all([
      strapi.entityService.findMany('api::vrat-katha.vrat-katha', {
        filters, populate, sort: { createdAt: 'desc' }, start, limit, locale,
      }),
      strapi.entityService.count('api::vrat-katha.vrat-katha', { filters, locale }),
    ]);
    setPaginationHeaders(ctx, page, pageSize, total);
    ctx.body = data;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { locale } = ctx.query;
    const data = await strapi.entityService.findOne('api::vrat-katha.vrat-katha', id, { populate, locale });
    if (!data) return ctx.notFound(`Vrat Katha with id "${id}" not found`);
    ctx.body = data;
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { locale } = ctx.query;
    const data = await strapi.entityService.findMany('api::vrat-katha.vrat-katha', {
      filters: { Slug: slug }, populate, locale,
    });
    if (!data[0]) return ctx.notFound(`Vrat Katha with slug "${slug}" not found`);
    ctx.body = data[0];
  },

}));