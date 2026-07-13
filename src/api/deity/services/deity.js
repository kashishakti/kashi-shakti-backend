'use strict';

/**
 * deity service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::deity.deity');
