'use strict';

/**
 * pradosh controller
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
    HinduMonth: true,
    Muhurat: true,
    DayPradoshaTime: true,
    TrayodashiTithi: true,
    Deity: true,

    // 🔹 Related
    NextPradoshLink: related.relatedPradosh,

    // 🔹 SEO
    SEO: seo,

    // 🔹 Dynamic Zone
    PradoshBlock: dynamicZones.commonDynamicZone,

};

module.exports = createCoreController('api::pradosh.pradosh', ({ strapi }) => ({

    // 🔹 GET ALL
    async find(ctx) {

        const data = await strapi.entityService.findMany(
            'api::pradosh.pradosh',
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
            'api::pradosh.pradosh',
            id,
            {
                populate,
            }
        );

        if (!data) {
            return ctx.notFound(`Pradosh with id "${id}" not found`);
        }

        ctx.body = data;
    },

    // 🔹 GET BY SLUG
    async findBySlug(ctx) {

        const { slug } = ctx.params;

        const data = await strapi.entityService.findMany(
            'api::pradosh.pradosh',
            {
                filters: {
                    Slug: slug,
                },
                populate,
            }
        );

        if (!data[0]) {
            return ctx.notFound(`Pradosh with slug "${slug}" not found`);
        }

        ctx.body = data[0];
    },

}));