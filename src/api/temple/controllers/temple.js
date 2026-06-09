'use strict';

/**
 * temple controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const { getPagination, buildPaginationMeta } = require('../../../utils/pagination');

const populate = {
    FeaturedImage: media,
    SEO: seo,
    TempleBlock: dynamicZones.commonDynamicZone,
};

module.exports = createCoreController('api::temple.temple', ({ strapi }) => ({

    // 🔹 GET ALL (paginated)
    async find(ctx) {
        const { page, pageSize, start, limit } = getPagination(ctx);
        const [data, total] = await Promise.all([
            strapi.entityService.findMany('api::temple.temple', {
                populate,
                sort: { createdAt: 'desc' },
                start,
                limit,
            }),
            strapi.entityService.count('api::temple.temple'),
        ]);
        ctx.body = { data, pagination: buildPaginationMeta(page, pageSize, total) };
    },

    // 🔹 GET BY ID
    async findOne(ctx) {
        const { id } = ctx.params;
        const data = await strapi.entityService.findOne('api::temple.temple', id, { populate });
        if (!data) return ctx.notFound(`Temple with id "${id}" not found`);
        ctx.body = data;
    },

    // 🔹 GET BY SLUG
    async findBySlug(ctx) {
        const { slug } = ctx.params;
        const data = await strapi.entityService.findMany('api::temple.temple', {
            filters: { Slug: slug },
            populate,
        });
        if (!data[0]) return ctx.notFound(`Temple with slug "${slug}" not found`);
        ctx.body = data[0];
    },

}));