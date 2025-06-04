'use strict';

/**
 * all-feature service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::all-feature.all-feature');
