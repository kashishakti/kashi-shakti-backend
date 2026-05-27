'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const related = require('../../../utils/populate/related');

const populate = {

    FeaturedImage: media,

    AmavasyaMonth: true,
    AmavasyaTimings: true,
    Deity: true,

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

    // 🔹 GET BY ID
    async findOne(ctx) {

        const { id } = ctx.params;

        const data = await strapi.entityService.findOne(
            'api::amavasya.amavasya',
            id,
            {
                populate,
            }
        );

        if (!data) {
            return ctx.notFound(`Amavasya with id "${id}" not found`);
        }

        ctx.body = data;
    },

    // 🔹 GET BY SLUG
    async findBySlug(ctx) {

        const { slug } = ctx.params;

        const data = await strapi.entityService.findMany(
            'api::amavasya.amavasya',
            {
                filters: {
                    Slug: slug,
                },
                populate,
            }
        );

        if (!data[0]) {
            return ctx.notFound(`Amavasya with slug "${slug}" not found`);
        }

        ctx.body = data[0];
    },

}));