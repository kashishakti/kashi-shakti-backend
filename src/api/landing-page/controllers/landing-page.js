'use strict';

/**
 * landing-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// 🔹 Shared populates
const dynamicZones = require('../../../utils/populate/dynamicZones');
const commonDynamicZone = dynamicZones.commonDynamicZone.on;


const populate = {

  // 🔹 Trust Badges
  TrustBadges: commonDynamicZone['section.trust-badges'],

  // 🔹 Featured Temples
  FeaturedTemples: commonDynamicZone['section.featured-temples'],

  // 🔹 Featured Vrats
  FeaturedVrats: commonDynamicZone['section.featured-vrat'],

  // 🔹 Featured Puja Vidhi
  FeaturedPujaVidhi: commonDynamicZone['section.featured-puja-vidhi'],

  // 🔹 Dynamic Zone
  LandingPageBlock: dynamicZones.commonDynamicZone,

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