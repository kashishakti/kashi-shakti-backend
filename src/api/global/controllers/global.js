'use strict';

/**
 * global controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::global.global', ({ strapi }) => ({

//   async find(ctx) {
//     const data = await strapi.entityService.findMany('api::global.global', {
//       populate: {
//         Header: {
//           populate: '*',   // deep populate header
//         },
//         Footer: {
//           populate: '*',   // deep populate footer
//         },
//       },
//     });

//     ctx.body = data;
//   },

// }));

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::global.global', ({ strapi }) => ({

  async find(ctx) {
    const data = await strapi.entityService.findMany('api::global.global', {
      populate: {
        Header: {
          populate: {
            Logo: {
              populate: {
                image: {
                  fields: ['url', 'formats', 'name'],
                },
              },
            },
            menu: true,
          },
        },
        Footer: {
          populate: {
            Logo: {
              populate: {
                image: {
                  fields: ['url', 'formats', 'name'],
                },
              },
            },
            menus: true,
            SocialLinks: {
              populate: {
                image: {
                  fields: ['url', 'formats', 'name'],
                },
              },
            },
          },
        },
      },
    });

    ctx.body = data;
  },

}));