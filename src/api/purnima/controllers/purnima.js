'use strict';

/**
 * purnima controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const related = require('../../../utils/populate/related');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const { getPagination, setPaginationHeaders } = require('../../../utils/pagination');

const populate = {
    FeaturedImage: media,
    PurnimaMonth: true,
    PurnimaTimings: true,
    Deity: true,
    NextPurnimaLink: related.relatedPurnima,
    SEO: seo,
    PurnimaBlock: dynamicZones.commonDynamicZone,
};

module.exports = createCoreController('api::purnima.purnima', ({ strapi }) => ({

    async find(ctx) {
        const { page, pageSize, start, limit } = getPagination(ctx);
        const [data, total] = await Promise.all([
            strapi.entityService.findMany('api::purnima.purnima', {
                populate, sort: { PurnimaDate: 'asc' }, start, limit,
            }),
            strapi.entityService.count('api::purnima.purnima'),
        ]);
        setPaginationHeaders(ctx, page, pageSize, total);
        ctx.body = data;
    },

    async findOne(ctx) {
        const { id } = ctx.params;
        const data = await strapi.entityService.findOne('api::purnima.purnima', id, { populate });
        if (!data) return ctx.notFound(`Purnima with id "${id}" not found`);
        ctx.body = data;
    },

    async findBySlug(ctx) {
        const { slug } = ctx.params;
        const data = await strapi.entityService.findMany('api::purnima.purnima', {
            filters: { Slug: slug }, populate,
        });
        if (!data[0]) return ctx.notFound(`Purnima with slug "${slug}" not found`);
        ctx.body = data[0];
    },

}));