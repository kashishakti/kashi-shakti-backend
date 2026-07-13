'use strict';

/**
 * mantra service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mantra.mantra');
