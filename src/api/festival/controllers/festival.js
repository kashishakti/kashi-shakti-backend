'use strict';

/**
 * festival controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const { getPagination, setPaginationHeaders } = require('../../../utils/pagination');

const populate = {
    FeaturedImage: media,
    HinduMonth: true,
    Deity: true,
    SEO: seo,
    FestivalBlock: {
        on: {
            'shared.fa-qs': dynamicZones.commonDynamicZone.on['shared.fa-qs'],
            'shared.link':  dynamicZones.commonDynamicZone.on['shared.link'],
        },
    },
};

module.exports = createCoreController('api::festival.festival', ({ strapi }) => ({

    async find(ctx) {
        const { page, pageSize, start, limit } = getPagination(ctx);
        const [data, total] = await Promise.all([
            strapi.entityService.findMany('api::festival.festival', {
                populate, sort: { Date: 'asc' }, start, limit,
            }),
            strapi.entityService.count('api::festival.festival'),
        ]);
        setPaginationHeaders(ctx, page, pageSize, total);
        ctx.body = data;
    },

    async findOne(ctx) {
        const { id } = ctx.params;
        const data = await strapi.entityService.findOne('api::festival.festival', id, { populate });
        if (!data) return ctx.notFound(`Festival with id "${id}" not found`);
        ctx.body = data;
    },

    async findBySlug(ctx) {
        const { slug } = ctx.params;
        const data = await strapi.entityService.findMany('api::festival.festival', {
            filters: { Slug: slug }, populate,
        });
        if (!data[0]) return ctx.notFound(`Festival with slug "${slug}" not found`);
        ctx.body = data[0];
    },

}));