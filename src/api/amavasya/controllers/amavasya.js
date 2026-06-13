'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const media = require('../../../utils/populate/media');
const seo = require('../../../utils/populate/seo');
const dynamicZones = require('../../../utils/populate/dynamicZones');
const related = require('../../../utils/populate/related');
const { getPagination, setPaginationHeaders } = require('../../../utils/pagination');

const populate = {
    FeaturedImage: media,
    AmavasyaMonth: true,
    AmavasyaTimings: true,
    Deity: true,
    NextAmavasyaLink: related.relatedAmavasya,
    SEO: seo,
    AmavasyaBlock: dynamicZones.commonDynamicZone,
};

module.exports = createCoreController('api::amavasya.amavasya', ({ strapi }) => ({

    async find(ctx) {
        const { year, month, locale } = ctx.query;

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
                    AmavasyaDate: { $gte: `${y}-${pad(m)}-01`, $lte: `${y}-${pad(m)}-${pad(lastDay)}` },
                };

            } else {
                dateFilter = {
                    AmavasyaDate: { $gte: `${y}-01-01`, $lte: `${y}-12-31` },
                };
            }
        }

        const [data, total] = await Promise.all([
            strapi.entityService.findMany('api::amavasya.amavasya', {
                filters: dateFilter, populate, sort: { AmavasyaDate: 'asc' }, start, limit, locale,
            }),
            strapi.entityService.count('api::amavasya.amavasya', { filters: dateFilter, locale }),
        ]);

        setPaginationHeaders(ctx, page, pageSize, total);
        ctx.body = data;
    },

    async findOne(ctx) {
        const { id } = ctx.params;
        const { locale } = ctx.query;
        const data = await strapi.entityService.findOne('api::amavasya.amavasya', id, { populate, locale });
        if (!data) return ctx.notFound(`Amavasya with id "${id}" not found`);
        ctx.body = data;
    },

    async findBySlug(ctx) {
        const { slug } = ctx.params;
        const { locale } = ctx.query;
        const data = await strapi.entityService.findMany('api::amavasya.amavasya', {
            filters: { Slug: slug }, populate, locale,
        });
        if (!data[0]) return ctx.notFound(`Amavasya with slug "${slug}" not found`);
        ctx.body = data[0];
    },

}));