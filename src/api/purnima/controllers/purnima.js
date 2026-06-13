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
                    PurnimaDate: { $gte: `${y}-${pad(m)}-01`, $lte: `${y}-${pad(m)}-${pad(lastDay)}` },
                };

            } else {
                dateFilter = {
                    PurnimaDate: { $gte: `${y}-01-01`, $lte: `${y}-12-31` },
                };
            }
        }

        const [data, total] = await Promise.all([
            strapi.entityService.findMany('api::purnima.purnima', {
                filters: dateFilter, populate, sort: { PurnimaDate: 'asc' }, start, limit,
            }),
            strapi.entityService.count('api::purnima.purnima', { filters: dateFilter }),
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