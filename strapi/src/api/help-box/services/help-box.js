'use strict';

/**
 * help-box service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::help-box.help-box');
