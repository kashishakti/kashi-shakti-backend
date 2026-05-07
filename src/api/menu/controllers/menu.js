'use strict';

/**
 * menu controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const populate = {
    // shared.link has no media/relations
    NavLink: true,
};

module.exports = createCoreController('api::menu.menu', ({ strapi }) => ({

    // 🔹 GET ALL MENUS
    async find(ctx) {
        const data = await strapi.entityService.findMany(
            'api::menu.menu',
            {
                populate,
                sort: { createdAt: 'asc' },
            }
        );

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

        ctx.body = data;
    },

}));