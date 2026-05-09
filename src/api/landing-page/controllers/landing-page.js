'use strict';

/**
 * landing-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// 🔹 Shared populates
const media = require('../../../utils/populate/media');

const populate = {

  // 🔹 Trust Badges
  TrustBadges: {
    populate: {
      image: media,
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

  // 🔹 Dynamic Zone
  LandingPageBlock: {
    on: {

      'section.hero': {
        populate: {
          HeroImage: media,
          HeroLink: true,
        },
      },

    },
  },

};

module.exports = createCoreController('api::landing-page.landing-page', ({ strapi }) => ({

  // 🔹 GET LANDING PAGE
  async find(ctx) {

    const data = await strapi.entityService.findMany(
      'api::landing-page.landing-page',
      {
        populate,
      }
    );

    ctx.body = data;
  },

}));