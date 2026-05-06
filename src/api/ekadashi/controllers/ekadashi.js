'use strict';

/**
 * ekadashi controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::ekadashi.ekadashi');

const { createCoreController } = require('@strapi/strapi').factories;

const media = {
  fields: ['url', 'formats', 'name'],
};

const populate = {
  // 🔹 Top-level media
  FeaturedImage: media,

  // 🔹 Components
  EkadashiMonth: true,
  ParanaTime: true,
  EkadashiTime: true,

  NextEkadashiLink: true,

  // 🔹 SEO (has media!)
  SEO: {
    populate: {
      MetaImage: media,
    },
  },

  // 🔹 Dynamic Zone
  EkadashiBlock: {
    on: {
      'shared.fa-qs': {
        populate: '*', // no media here, safe
      },
      'shared.link': {
        populate: '*',
      },
    },
  },
};

module.exports = createCoreController('api::ekadashi.ekadashi', ({ strapi }) => ({

  // ✅ GET ALL
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

  // ✅ GET BY ID
  async findOne(ctx) {
    const { id } = ctx.params;

    const data = await strapi.entityService.findOne(
      'api::ekadashi.ekadashi',
      id,
      { populate }
    );

    ctx.body = data;
  },

  // ✅ GET BY SLUG (best)
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const data = await strapi.entityService.findMany(
      'api::ekadashi.ekadashi',
      {
        filters: { Slug: slug },
        populate,
      }
    );

    ctx.body = data[0];
  },

}));