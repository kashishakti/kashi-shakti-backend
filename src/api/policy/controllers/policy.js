'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');

const populate = {

    SEO: seo,

    PolicyBlock: dynamicZones.commonDynamicZone,

};

module.exports = createCoreController('api::policy.policy', ({ strapi }) => ({

    // 🔹 GET ALL
    async find(ctx) {
        const data = await strapi.entityService.findMany(
            'api::policy.policy',
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
            'api::policy.policy',
            id,
            {
                populate,
            }
        );

        if (!data) {
            return ctx.notFound(`Policy with id "${id}" not found`);
        }

        ctx.body = data;
    },

    // 🔹 GET BY SLUG
    async findBySlug(ctx) {

        const { slug } = ctx.params;

        const data = await strapi.entityService.findMany(
            'api::policy.policy',
            {
                filters: {
                    Slug: slug,
                },
                populate,
            }
        );

        if (!data[0]) {
            return ctx.notFound(`Policy with slug "${slug}" not found`);
        }

        ctx.body = data[0];
    },

}));
