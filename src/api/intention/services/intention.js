'use strict';

/**
 * intention service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::intention.intention');
