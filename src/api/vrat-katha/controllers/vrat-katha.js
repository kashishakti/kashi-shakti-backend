// 'use strict';

// /**
//  * vrat-katha controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::vrat-katha.vrat-katha');


'use strict';

/**
 * vrat-katha controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const media = {
  fields: ['url', 'formats', 'name'],
};

const populate = {
  // 🔹 Media
  FeaturedImage: media,

  // 🔹 SEO
  SEO: {
    populate: {
      MetaImage: media,
    },
  },

  // 🔹 Dynamic Zone (VratKathaBlock)
  VratKathaBlock: {
    on: {
      'shared.link': {
        populate: '*',
      },
      'shared.fa-qs': {
        populate: '*',
      },
      'shared.related-vrat-katha': {
        populate: {
          vrat_kathas: true, // Expands the related Vrat Katha entries
        },
      },
      'shared.related-temples': {
        populate: {
          temples: true, // Expands the related Temple entries
        },
      },
      'shared.related-puja-vidhi': {
        populate: {
          puja_vidhis: true, // Expands the related Puja Vidhi entries
        },
      },
      'shared.related-festivals': {
        populate: {
          festivals: true, // Expands the related Festival entries
        },
      },
    },
  },
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