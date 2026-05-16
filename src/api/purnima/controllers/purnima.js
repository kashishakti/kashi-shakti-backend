'use strict';

/**
 * purnima controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// 🔹 Shared populates
const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const related = require('../../../utils/populate/related');
const dynamicZones = require('../../../utils/populate/dynamicZones');

const populate = {

    // 🔹 Media
    FeaturedImage: media,

    // 🔹 Components
    PurnimaMonth: true,
    PurnimaTimings: true,
    Deity: true,

    // 🔹 Related
    NextPurnimaLink: related.relatedPurnima,

    // 🔹 SEO
    SEO: seo,

    // 🔹 Dynamic Zone
    PurnimaBlock: dynamicZones.commonDynamicZone,

};

module.exports = createCoreController('api::purnima.purnima', ({ strapi }) => ({

    // 🔹 GET ALL
    async find(ctx) {

        const data = await strapi.entityService.findMany(
            'api::purnima.purnima',
            {
                populate,
                sort: { PurnimaDate: 'asc' },
            }
        );

        ctx.body = data;
    },

    // 🔹 GET BY ID
    async findOne(ctx) {

        const { id } = ctx.params;

        const data = await strapi.entityService.findOne(
            'api::purnima.purnima',
            id,
            {
                populate,
            }
        );

        if (!data) {
            return ctx.notFound(`Purnima with id "${id}" not found`);
        }

        ctx.body = data;
    },

    // 🔹 GET BY SLUG
    async findBySlug(ctx) {

        const { slug } = ctx.params;

        const data = await strapi.entityService.findMany(
            'api::purnima.purnima',
            {
                filters: {
                    Slug: slug,
                },
                populate,
            }
        );

        if (!data[0]) {
            return ctx.notFound(`Purnima with slug "${slug}" not found`);
        }

        ctx.body = data[0];
    },

}));