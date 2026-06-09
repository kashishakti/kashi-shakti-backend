'use strict';

/**
 * ekadashi controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// 🔹 Shared populates
const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const related = require('../../../utils/populate/related');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const { getPagination, buildPaginationMeta } = require('../../../utils/pagination');

const populate = {

  // 🔹 Media
  FeaturedImage: media,

  // 🔹 Components
  EkadashiMonth: true,
  ParanaTime: true,
  EkadashiTime: true,
  Deity: true,

  // 🔹 Related
  NextEkadashiLink: related.relatedEkadashi,

  // 🔹 SEO
  SEO: seo,

  // 🔹 Dynamic Zone
  EkadashiBlock: dynamicZones.commonDynamicZone,

};

module.exports = createCoreController('api::ekadashi.ekadashi', ({ strapi }) => ({

  // 🔹 GET ALL (paginated)
  async find(ctx) {

    const { page, pageSize, start, limit } = getPagination(ctx);

    const [data, total] = await Promise.all([
      strapi.entityService.findMany('api::ekadashi.ekadashi', {
        populate,
        sort: { Date: 'asc' },
        start,
        limit,
      }),
      strapi.entityService.count('api::ekadashi.ekadashi'),
    ]);

    ctx.body = {
      data,
      pagination: buildPaginationMeta(page, pageSize, total),
    };
  },

  // 🔹 GET BY ID
  async findOne(ctx) {

    const { id } = ctx.params;

    const data = await strapi.entityService.findOne(
      'api::ekadashi.ekadashi',
      id,
      { populate }
    );

    if (!data) {
      return ctx.notFound(`Ekadashi with id "${id}" not found`);
    }

    ctx.body = data;
  },

  // 🔹 GET BY YEAR + MONTH (paginated)
  async findByYearMonth(ctx) {

    const { year, month } = ctx.params;

    const y = parseInt(year, 10);
    const m = parseInt(month, 10);

    // Validate year and month
    if (isNaN(y) || isNaN(m) || m < 1 || m > 12) {
      return ctx.badRequest('Invalid year or month. Month must be between 1 and 12.');
    }

    const { page, pageSize, start, limit } = getPagination(ctx);

    // Build date range for the given month (YYYY-MM-DD)
    const pad     = (n) => String(n).padStart(2, '0');
    const from    = `${y}-${pad(m)}-01`;
    const lastDay = new Date(y, m, 0).getDate(); // day 0 of next month = last day of current month
    const to      = `${y}-${pad(m)}-${pad(lastDay)}`;

    const dateFilter = {
      Date: {
        $gte: from,
        $lte: to,
      },
    };

    // Run data fetch and total count in parallel
    const [data, total] = await Promise.all([
      strapi.entityService.findMany('api::ekadashi.ekadashi', {
        filters: dateFilter,
        populate,
        sort:  { Date: 'asc' },
        start,
        limit,
      }),
      strapi.entityService.count('api::ekadashi.ekadashi', {
        filters: dateFilter,
      }),
    ]);

    if (!data || data.length === 0) {
      return ctx.notFound(`No Ekadashi found for ${y}-${pad(m)}`);
    }

    ctx.body = {
      data,
      pagination: buildPaginationMeta(page, pageSize, total),
    };
  },

  // 🔹 GET BY SLUG
  async findBySlug(ctx) {

    const { slug } = ctx.params;

    const data = await strapi.entityService.findMany(
      'api::ekadashi.ekadashi',
      {
        filters: { Slug: slug },
        populate,
      }
    );

    if (!data[0]) {
      return ctx.notFound(`Ekadashi with slug "${slug}" not found`);
    }

    ctx.body = data[0];
  },

}));