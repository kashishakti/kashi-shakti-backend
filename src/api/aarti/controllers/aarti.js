'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const { getPagination, buildPaginationMeta } = require('../../../utils/pagination');

const populate = {

    FeaturedImage: media,

    Deity: true,

    SEO: seo,

    AartiBlock: dynamicZones.commonDynamicZone,

};

module.exports = createCoreController('api::aarti.aarti', ({ strapi }) => ({

    // 🔹 GET ALL (paginated)
    async find(ctx) {

        const { page, pageSize, start, limit } = getPagination(ctx);

        const [data, total] = await Promise.all([
            strapi.entityService.findMany('api::aarti.aarti', {
                populate,
                start,
                limit,
            }),
            strapi.entityService.count('api::aarti.aarti'),
        ]);

        ctx.body = {
            data,
            pagination: buildPaginationMeta(page, pageSize, total),
        };
    },

    // 🔹 GET BY ID
    async findOne(ctx) {

        const { id } = ctx.params;

        const data = await strapi.entityService.findOne(
            'api::aarti.aarti',
            id,
            { populate }
        );

        if (!data) {
            return ctx.notFound(`Aarti with id "${id}" not found`);
        }

        ctx.body = data;
    },

    // 🔹 GET BY SLUG
    async findBySlug(ctx) {

        const { slug } = ctx.params;

        const data = await strapi.entityService.findMany(
            'api::aarti.aarti',
            {
                filters: { Slug: slug },
                populate,
            }
        );

        if (!data[0]) {
            return ctx.notFound(`Aarti with slug "${slug}" not found`);
        }

        ctx.body = data[0];
    },

}));
