'use strict';

/**
 * landing-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// 🔹 Shared populates
const dynamicZones = require('../../../utils/populate/dynamicZones');
const sectionsDynamicZone = dynamicZones.sectionsDynamicZone.on;


const populate = {

  // 🔹 Trust Badges
  TrustBadges: sectionsDynamicZone['section.trust-badges'],

  // 🔹 Featured Temples
  FeaturedTemples: sectionsDynamicZone['section.featured-temples'],

  // 🔹 Featured Vrats
  FeaturedVrats: sectionsDynamicZone['section.featured-vrat'],

  // 🔹 Featured Puja Vidhi
  FeaturedPujaVidhi: sectionsDynamicZone['section.featured-puja-vidhi'],

  // 🔹 Dynamic Zone
  LandingPageBlock: dynamicZones.sectionsDynamicZone,

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