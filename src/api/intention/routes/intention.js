'use strict';

/**
 * intention router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::intention.intention');
