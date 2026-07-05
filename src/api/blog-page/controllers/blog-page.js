'use strict';

/**
 * blog-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const related = require('../../../utils/populate/related');
const seo = require('../../../utils/populate/seo');

const populate = {
  FeaturedBlog: related.relatedBlogs,
  EditorsPicks: related.relatedBlogs,
  PopularThisWeek: related.relatedBlogs,
  SEO: seo,
};

module.exports = createCoreController('api::blog-page.blog-page', ({ strapi }) => ({
  async find(ctx) {
    const { locale } = ctx.query;
    const data = await strapi.entityService.findMany('api::blog-page.blog-page', {
      populate,
      locale,
    });
    ctx.body = data;
  },
}));
