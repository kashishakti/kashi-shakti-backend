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
        const [data, total] = await Promise.all([
            strapi.entityService.findMany('api::menu.menu', {
                populate,
                sort: { createdAt: 'asc' },
                start,
                limit,
            }),
            strapi.entityService.count('api::menu.menu'),
        ]);

        setPaginationHeaders(ctx, page, pageSize, total);
        ctx.body = data;
    },

    // 🔹 GET MENU BY ID
    async findOne(ctx) {
        const { id } = ctx.params;

        const data = await strapi.entityService.findOne(
            'api::menu.menu',
            id,
            {
                populate,
            }
        );

        if (!data) {
            return ctx.notFound(`Menu with id "${id}" not found`);
        }

        ctx.body = data;
    },

}));