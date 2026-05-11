'use strict';

/**
 * festival controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// 🔹 Shared populates
const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');

const populate = {

    // 🔹 Media
    FeaturedImage: media,

    // 🔹 Components
    HinduMonth: true,
    Deity: true,

    // 🔹 SEO
    SEO: seo,

    // 🔹 Dynamic Zone
    FestivalBlock: {
        on: {

            // Only include what this schema supports
            'shared.fa-qs': dynamicZones.commonDynamicZone.on['shared.fa-qs'],

            'shared.link': dynamicZones.commonDynamicZone.on['shared.link'],

        },
    },

};

module.exports = createCoreController('api::festival.festival', ({ strapi }) => ({

    // 🔹 GET ALL
    async find(ctx) {

        const data = await strapi.entityService.findMany(
            'api::festival.festival',
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
            'api::festival.festival',
            id,
            {
                populate,
            }
        );

        ctx.body = data;
    },

    // 🔹 GET BY SLUG
    async findBySlug(ctx) {

        const { slug } = ctx.params;

        const data = await strapi.entityService.findMany(
            'api::festival.festival',
            {
                filters: {
                    Slug: slug,
                },
                populate,
            }
        );

        ctx.body = data[0] || null;
    },

}));