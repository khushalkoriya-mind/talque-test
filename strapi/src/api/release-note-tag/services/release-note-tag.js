'use strict';

/**
 * release-note-tag service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::release-note-tag.release-note-tag');
