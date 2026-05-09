// 'use strict';

// /**
//  * vrat-katha controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::vrat-katha.vrat-katha');
const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const related = require('../../../utils/populate/related');


'use strict';

/**
 * vrat-katha controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const populate = {
  // 🔹 Media
  FeaturedImage: media,

  // 🔹 SEO
  SEO: seo,

  // 🔹 Dynamic Zone (VratKathaBlock)
  VratKathaBlock: dynamicZones.commonDynamicZone,
};

module.exports = createCoreController('api::vrat-katha.vrat-katha', ({ strapi }) => ({

  // 🔹 GET ALL
  async find(ctx) {
    const data = await strapi.entityService.findMany(
      'api::vrat-katha.vrat-katha',
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
      'api::vrat-katha.vrat-katha',
      id,
      { populate }
    );

    ctx.body = data;
  },

  // 🔹 GET BY SLUG (Custom Route)
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const data = await strapi.entityService.findMany(
      'api::vrat-katha.vrat-katha',
      {
        filters: { Slug: slug },
        populate,
      }
    );

    // Return the first match or null
    ctx.body = data[0] || null;
  },

}));