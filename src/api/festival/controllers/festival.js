'use strict';

/**
 * festival controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const related = require('../../../utils/populate/related');
const { getPagination, setPaginationHeaders } = require('../../../utils/pagination');

const populate = {
    FeaturedImage: media,
    HinduMonth: true,
    Deity: true,
    SEO: seo,
    FestivalTimings: true,
    FestivalBlock: dynamicZones.commonDynamicZone,
    NextFestivalLink: related.relatedFestivals,
};

module.exports = createCoreController('api::festival.festival', ({ strapi }) => ({

    async find(ctx) {
        const { year, month } = ctx.query;

        // month without year is meaningless — reject it explicitly
        if (month && !year) {
            return ctx.badRequest('`month` requires `year` to also be specified. Example: ?year=2025&month=11');
        }

        const { page, pageSize, start, limit } = getPagination(ctx);

        const pad = (n) => String(n).padStart(2, '0');
        let dateFilter = {};

        if (year) {
            const y = parseInt(year, 10);

            if (isNaN(y)) {
                return ctx.badRequest('Invalid year.');
            }

            if (month) {
                const m = parseInt(month, 10);

                if (isNaN(m) || m < 1 || m > 12) {
                    return ctx.badRequest('Invalid month. Must be between 1 and 12.');
                }

                const lastDay = new Date(y, m, 0).getDate();

                dateFilter = {
                    Date: { $gte: `${y}-${pad(m)}-01`, $lte: `${y}-${pad(m)}-${pad(lastDay)}` },
                };

            } else {
                dateFilter = {
                    Date: { $gte: `${y}-01-01`, $lte: `${y}-12-31` },
                };
            }
        }

        const [data, total] = await Promise.all([
            strapi.entityService.findMany('api::festival.festival', {
                filters: dateFilter, populate, sort: { Date: 'asc' }, start, limit,
            }),
            strapi.entityService.count('api::festival.festival', { filters: dateFilter }),
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