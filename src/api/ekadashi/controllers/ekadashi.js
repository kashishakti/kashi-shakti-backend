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

  // 🔹 GET ALL
  async find(ctx) {

    const data = await strapi.entityService.findMany(
      'api::ekadashi.ekadashi',
      {
        populate,
        sort: { Date: 'asc' },
      }
    );

    ctx.body = data;
  },

  // 🔹 GET BY ID
  async findOne(ctx) {

    const { id } = ctx.params;

    const data = await strapi.entityService.findOne(
      'api::ekadashi.ekadashi',
      id,
      {
        populate,
      }
    );

    ctx.body = data;
  },

  // 🔹 GET BY SLUG
  async findBySlug(ctx) {

    const { slug } = ctx.params;

    const data = await strapi.entityService.findMany(
      'api::ekadashi.ekadashi',
      {
        filters: {
          Slug: slug,
        },
        populate,
      }
    );

    ctx.body = data[0] || null;
  },

}));