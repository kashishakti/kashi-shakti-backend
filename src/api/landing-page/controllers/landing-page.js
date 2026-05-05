'use strict';

/**
 * landing-page controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::landing-page.landing-page');

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::landing-page.landing-page', ({ strapi }) => ({

  async find(ctx) {
    const data = await strapi.entityService.findMany('api::landing-page.landing-page', {
      populate: {
        // 🔹 Trust Badges
        TrustBadges: {
          populate: {
            image: {
              fields: ['url', 'formats', 'name'],
            },
            Link: true,
          },
        },

        // 🔹 Featured Temples
        FeaturedTemples: {
          populate: {
            temples: true,
            Link: true,
          },
        },

        // 🔹 Featured Vrats
        FeaturedVrats: {
          populate: {
            VratLink: true,
          },
        },

        // 🔹 Featured Puja Vidhi
        FeaturedPujaVidhi: {
          populate: {
            puja_vidhis: true,
            PujaVidhiLink: true,
          },
        },

        // 🔹 Dynamic Zone (Hero)
        LandingPageBlock: {
          on: {
            'section.hero': {
              populate: {
                HeroImage: {
                  fields: ['url', 'formats', 'name'],
                },
                HeroLink: true,
              },
            },
          },
        },
      },
    });

    ctx.body = data;
  },

}));