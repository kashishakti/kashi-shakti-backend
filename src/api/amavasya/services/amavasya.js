'use strict';

/**
 * amavasya service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::amavasya.amavasya');
