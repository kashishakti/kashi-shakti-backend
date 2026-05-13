const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const related = require('../../../utils/populate/related');

'use strict';

/**
 * blog controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const populate = {
  // 🔹 Media
  FeaturedImage: media,

  // 🔹 Relations
  categories: true,

  // 🔹 SEO
  SEO: seo,

  // 🔹 Dynamic Zone
  BlogsBlock: dynamicZones.commonDynamicZone,
};

module.exports = createCoreController('api::blog.blog', ({ strapi }) => ({

  // 🔹 GET ALL
  async find(ctx) {
    const data = await strapi.entityService.findMany(
      'api::blog.blog',
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
      'api::blog.blog',
      id,
      { populate }
    );

    ctx.body = data;
  },

  // 🔹 GET BY SLUG (Custom Route)
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const data = await strapi.entityService.findMany(
      'api::blog.blog',
      {
        filters: { Slug: slug },
        populate,
      }
    );

    // Return the first match or null
    ctx.body = data[0] || null;
  },

}));
