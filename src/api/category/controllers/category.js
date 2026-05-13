const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');

'use strict';

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const populate = {
  // 🔹 Relations
  blogs: {
    populate: {
      FeaturedImage: media,
    },
  },

  // 🔹 SEO
  SEO: seo,
};

module.exports = createCoreController('api::category.category', ({ strapi }) => ({

  // 🔹 GET ALL
  async find(ctx) {
    const data = await strapi.entityService.findMany(
      'api::category.category',
      {
        populate,
        sort: { createdAt: 'desc' },
      }
    );

    ctx.body = data;
  },

  // 🔹 GET BY ID
  async findOne(ctx) {
    const { id } = ctx.params;

    const data = await strapi.entityService.findOne(
      'api::category.category',
      id,
      { populate }
    );

    ctx.body = data;
  },

  // 🔹 GET BY SLUG (Custom Route)
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const data = await strapi.entityService.findMany(
      'api::category.category',
      {
        filters: { Slug: slug },
        populate,
      }
    );

    // Return the first match or null
    ctx.body = data[0] || null;
  },

}));
