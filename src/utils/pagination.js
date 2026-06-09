'use strict';

/**
 * Shared pagination helper.
 *
 * Reads `?page=` and `?pageSize=` from ctx.query and returns
 * { page, pageSize, start, limit } ready for entityService.findMany().
 *
 * @param {object} ctx  - Koa context
 * @param {number} [defaultPageSize=10]
 */
const getPagination = (ctx, defaultPageSize = 10) => {
  const page     = Math.max(1, parseInt(ctx.query.page     ?? 1,               10));
  const pageSize = Math.max(1, parseInt(ctx.query.pageSize ?? defaultPageSize,  10));

  return {
    page,
    pageSize,
    start: (page - 1) * pageSize,
    limit: pageSize,
  };
};

/**
 * Builds the standard pagination meta object to include in responses.
 *
 * @param {number} page
 * @param {number} pageSize
 * @param {number} total
 */
const buildPaginationMeta = (page, pageSize, total) => ({
  page,
  pageSize,
  total,
  pageCount: Math.ceil(total / pageSize),
});

module.exports = { getPagination, buildPaginationMeta };
