'use strict';

/**
 * `global-populate` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    console.log(ctx.query);
    strapi.log.info('In global-populate middleware.');

    await next();
  };
};
