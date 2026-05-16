'use strict';

/**
 * temple controller
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
    TempleBlock: dynamicZones.commonDynamicZone,

};

module.exports = createCoreController('api::temple.temple', ({ strapi }) => ({

    // 🔹 GET ALL
    async find(ctx) {

        const data = await strapi.entityService.findMany(
            'api::temple.temple',
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
            'api::temple.temple',
            id,
            {
                populate,
            }
        );

        if (!data) {
            return ctx.notFound(`Temple with id "${id}" not found`);
        }

        ctx.body = data;
    },

    // 🔹 GET BY SLUG
    async findBySlug(ctx) {

        const { slug } = ctx.params;

        const data = await strapi.entityService.findMany(
            'api::temple.temple',
            {
                filters: {
                    Slug: slug,
                },
                populate,
            }
        );

        if (!data[0]) {
            return ctx.notFound(`Temple with slug "${slug}" not found`);
        }

        ctx.body = data[0];
    },

}));