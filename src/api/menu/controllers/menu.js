'use strict';

/**
 * menu controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { getPagination, setPaginationHeaders } = require('../../../utils/pagination');

const populate = {
    // shared.link has no media/relations
    NavLink: true,
};

module.exports = createCoreController('api::menu.menu', ({ strapi }) => ({

    // 🔹 GET ALL MENUS
    async find(ctx) {
        const { page, pageSize, start, limit } = getPagination(ctx);
        const { locale } = ctx.query;
        const [data, total] = await Promise.all([
            strapi.entityService.findMany('api::menu.menu', {
                populate,
                sort: { createdAt: 'asc' },
                start,
                limit,
                locale,
            }),
            strapi.entityService.count('api::menu.menu', { locale }),
        ]);

        setPaginationHeaders(ctx, page, pageSize, total);
        ctx.body = data;
    },

    // 🔹 GET MENU BY ID
    async findOne(ctx) {
        const { id } = ctx.params;
        const { locale } = ctx.query;

        const data = await strapi.entityService.findOne(
            'api::menu.menu',
            id,
            {
                populate,
                locale,
            }
        );

        if (!data) {
            return ctx.notFound(`Menu with id "${id}" not found`);
        }

        ctx.body = data;
    },

}));