'use strict';

/**
 * ekadashi controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::ekadashi.ekadashi');

'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const media = {
  fields: ['url', 'formats', 'name'],
};

const populate = {
  // 🔹 Media
  FeaturedImage: media,

  // 🔹 Components
  EkadashiMonth: true,
  ParanaTime: true,
  EkadashiTime: true,

  // 🔹 Next Ekadashi (relation inside)
  NextEkadashiLink: {
    populate: {
      ekadashis: true,
    },
  },

  // 🔹 SEO
  SEO: {
    populate: {
      MetaImage: media,
    },
  },

  // 🔹 Dynamic Zone (NOW FULLY CONTROLLED)
  EkadashiBlock: {
    on: {
      'shared.fa-qs': {
        populate: '*',
      },

      'shared.link': {
        populate: '*',
      },

      'shared.related-ekadashi': {
        populate: {
          ekadashis: true,
        },
      },

      'shared.related-vrat-katha': {
        populate: {
          vrat_kathas: true,
        },
      },

      'shared.related-puja-vidhi': {
        populate: {
          puja_vidhis: true,
        },
      },

      'shared.related-festivals': {
        populate: {
          festivals: true,
        },
      },

      'shared.related-temples': {
        populate: {
          temples: true,
        },
      },
    },
  },
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
      { populate }
    );

    ctx.body = data;
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

    ctx.body = data[0];
  },

}));