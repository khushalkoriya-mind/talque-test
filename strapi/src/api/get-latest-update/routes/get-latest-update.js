'use strict';

/**
 * get-latest-update router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::get-latest-update.get-latest-update');
