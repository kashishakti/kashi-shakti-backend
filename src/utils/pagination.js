'use strict';

/**
 * Shared pagination helper.
 *
 * Reads `?page=` and `?pageSize=` from ctx.query.
 *
 * @param {object} ctx  - Koa context
 * @param {number} [defaultPageSize=10]
 */
const getPagination = (ctx, defaultPageSize = 10) => {
  const page     = Math.max(1, parseInt(ctx.query.page     ?? 1,              10));
  const pageSize = Math.max(1, parseInt(ctx.query.pageSize ?? defaultPageSize, 10));

  return {
    page,
    pageSize,
    start: (page - 1) * pageSize,
    limit: pageSize,
  };
};

/**
 * Sets pagination metadata as response headers.
 * Make sure to expose these in your CORS config:
 *   X-Total-Count, X-Page, X-Page-Size, X-Page-Count
 *
 * @param {object} ctx
 * @param {number} page
 * @param {number} pageSize
 * @param {number} total
 */
const setPaginationHeaders = (ctx, page, pageSize, total) => {
  const pageCount = Math.ceil(total / pageSize);

  ctx.set('X-Page',        String(page));
  ctx.set('X-Page-Size',   String(pageSize));
  ctx.set('X-Total-Count', String(total));
  ctx.set('X-Page-Count',  String(pageCount));
};

module.exports = { getPagination, setPaginationHeaders };
