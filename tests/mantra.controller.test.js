'use strict';

const mockFindMany = jest.fn();
const mockCount    = jest.fn();

const mockStrapi = {
  entityService: {
    findMany: mockFindMany,
    count:    mockCount,
  },
};

jest.mock('@strapi/strapi', () => ({
  factories: {
    createCoreController: (_uid, factory) =>
      factory ? factory({ strapi: mockStrapi }) : {},
  },
}));

const controller = require('../src/api/mantra/controllers/mantra');

function makeCtx(query = {}) {
  const ctx = {
    query,
    body: null,
    set: jest.fn(),
  };
  return ctx;
}

describe('Mantra Controller - find()', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockFindMany.mockResolvedValue([]);
    mockCount.mockResolvedValue(0);
  });

  test('TC-U1: No params - filters is empty object', async () => {
    const ctx = makeCtx({});
    await controller.find(ctx);
    expect(mockFindMany).toHaveBeenCalledWith('api::mantra.mantra', expect.objectContaining({ filters: {} }));
    expect(ctx.body).toEqual([]);
  });

  test('TC-U2: deity param only - filters has deity.Slug', async () => {
    const ctx = makeCtx({ deity: 'lakshmi' });
    await controller.find(ctx);
    expect(mockFindMany).toHaveBeenCalledWith('api::mantra.mantra', expect.objectContaining({
      filters: { deity: { Slug: 'lakshmi' } },
    }));
  });

  test('TC-U3: intention param only - filters has intention.Slug', async () => {
    const ctx = makeCtx({ intention: 'wealth' });
    await controller.find(ctx);
    expect(mockFindMany).toHaveBeenCalledWith('api::mantra.mantra', expect.objectContaining({
      filters: { intention: { Slug: 'wealth' } },
    }));
  });

  test('TC-U4: Both deity + intention - AND filter applied', async () => {
    const ctx = makeCtx({ deity: 'lakshmi', intention: 'wealth' });
    await controller.find(ctx);
    expect(mockFindMany).toHaveBeenCalledWith('api::mantra.mantra', expect.objectContaining({
      filters: {
        deity:     { Slug: 'lakshmi' },
        intention: { Slug: 'wealth' },
      },
    }));
  });

  test('TC-U5: count() receives same filters as findMany()', async () => {
    const ctx = makeCtx({ deity: 'lakshmi', intention: 'wealth' });
    await controller.find(ctx);
    expect(mockCount).toHaveBeenCalledWith('api::mantra.mantra', expect.objectContaining({
      filters: { deity: { Slug: 'lakshmi' }, intention: { Slug: 'wealth' } },
    }));
  });

  test('TC-U6: deity and intention are populated in query', async () => {
    const ctx = makeCtx({});
    await controller.find(ctx);
    expect(mockFindMany).toHaveBeenCalledWith('api::mantra.mantra', expect.objectContaining({
      populate: { deity: true, intention: true },
    }));
  });

  test('TC-U7: Pagination headers are set', async () => {
    mockCount.mockResolvedValue(5);
    const ctx = makeCtx({ page: '1', pageSize: '5' });
    await controller.find(ctx);
    expect(ctx.set).toHaveBeenCalledWith('X-Total-Count', '5');
    expect(ctx.set).toHaveBeenCalledWith('X-Page', '1');
    expect(ctx.set).toHaveBeenCalledWith('X-Page-Size', '5');
  });

  test('TC-U8: Nonexistent deity slug - returns empty array (no 400)', async () => {
    mockFindMany.mockResolvedValue([]);
    const ctx = makeCtx({ deity: 'this-does-not-exist' });
    await controller.find(ctx);
    expect(ctx.body).toEqual([]);
    // No error thrown, no badRequest
    expect(ctx.body).not.toBeNull();
  });

});
