'use strict';

/**
 * get-latest-update service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::get-latest-update.get-latest-update');
