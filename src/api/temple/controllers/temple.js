'use strict';

/**
 * temple controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const { getPagination, setPaginationHeaders } = require('../../../utils/pagination');

const populate = {
    FeaturedImage: media,
    SEO: seo,
    TempleBlock: dynamicZones.commonDynamicZone,
};

module.exports = createCoreController('api::temple.temple', ({ strapi }) => ({

    async find(ctx) {
        const { page, pageSize, start, limit } = getPagination(ctx);
        const { locale } = ctx.query;
        const [data, total] = await Promise.all([
            strapi.entityService.findMany('api::temple.temple', {
                populate, sort: { createdAt: 'desc' }, start, limit, locale,
            }),
            strapi.entityService.count('api::temple.temple', { locale }),
        ]);
        setPaginationHeaders(ctx, page, pageSize, total);
        ctx.body = data;
    },

    async findOne(ctx) {
        const { id } = ctx.params;
        const { locale } = ctx.query;
        const data = await strapi.entityService.findOne('api::temple.temple', id, { populate, locale });
        if (!data) return ctx.notFound(`Temple with id "${id}" not found`);
        ctx.body = data;
    },

    async findBySlug(ctx) {
        const { slug } = ctx.params;
        const { locale } = ctx.query;
        const data = await strapi.entityService.findMany('api::temple.temple', {
            filters: { Slug: slug }, populate, locale,
        });
        if (!data[0]) return ctx.notFound(`Temple with slug "${slug}" not found`);
        ctx.body = data[0];
    },

}));