'use strict';

/**
 * vrat service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::vrat.vrat');
