'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const related = require('../../../utils/populate/related');

const populate = {

    FeaturedImage: media,

    AmavasyaTimings: true,

    NextAmavasyaLink: related.relatedAmavasya,

    SEO: seo,

    AmavasyaBlock: dynamicZones.commonDynamicZone,

};

module.exports = createCoreController('api::amavasya.amavasya', ({ strapi }) => ({

    async find(ctx) {
        const data = await strapi.entityService.findMany(
            'api::amavasya.amavasya',
            {
                populate,
            }
        );

        ctx.body = data;
    },

}));