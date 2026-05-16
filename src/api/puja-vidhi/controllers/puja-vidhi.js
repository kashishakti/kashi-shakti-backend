'use strict';

/**
 * puja-vidhi controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// 🔹 Shared populates
const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');

const populate = {

    // 🔹 Media
    FeaturedImage: media,

    // 🔹 SEO
    SEO: seo,

    // 🔹 Dynamic Zone
    PujaVidhiBlock: dynamicZones.commonDynamicZone,

};

module.exports = createCoreController('api::puja-vidhi.puja-vidhi', ({ strapi }) => ({

    // 🔹 GET ALL
    async find(ctx) {

        const data = await strapi.entityService.findMany(
            'api::puja-vidhi.puja-vidhi',
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
            'api::puja-vidhi.puja-vidhi',
            id,
            {
                populate,
            }
        );

        if (!data) {
            return ctx.notFound(`Puja Vidhi with id "${id}" not found`);
        }

        ctx.body = data;
    },

    // 🔹 GET BY SLUG
    async findBySlug(ctx) {

        const { slug } = ctx.params;

        const data = await strapi.entityService.findMany(
            'api::puja-vidhi.puja-vidhi',
            {
                filters: {
                    Slug: slug,
                },
                populate,
            }
        );

        if (!data[0]) {
            return ctx.notFound(`Puja Vidhi with slug "${slug}" not found`);
        }

        ctx.body = data[0];
    },

}));