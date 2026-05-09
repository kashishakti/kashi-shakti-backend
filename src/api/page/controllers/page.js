'use strict';

/**
 * page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// 🔹 Shared populates
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');

const populate = {

    // 🔹 SEO
    SEO: seo,

    // 🔹 Dynamic Zone
    PageBlocks: dynamicZones.commonDynamicZone,

};

module.exports = createCoreController('api::page.page', ({ strapi }) => ({

    // 🔹 GET ALL
    async find(ctx) {

        const data = await strapi.entityService.findMany(
            'api::page.page',
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
            'api::page.page',
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
            'api::page.page',
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