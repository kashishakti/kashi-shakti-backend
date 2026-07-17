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

const controller = require('../src/api/vrat-katha/controllers/vrat-katha');

function makeCtx(query = {}) {
  const ctx = {
    query,
    body: null,
    _badRequestMsg: null,
    badRequest: jest.fn(function (msg) { this._badRequestMsg = msg; }),
    set: jest.fn(),
  };
  return ctx;
}

const VALID_TYPES = ['Ekadashi', 'Pradosh', 'Amavasya', 'Purnima', 'Festival', 'Other'];

describe('Vrat Katha Controller - find()', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockFindMany.mockResolvedValue([{ id: 1, Type: 'Ekadashi' }]);
    mockCount.mockResolvedValue(1);
  });

  test('TC-U1: No type param - filters is empty, 200', async () => {
    const ctx = makeCtx({ locale: 'en' });
    await controller.find(ctx);
    expect(ctx.badRequest).not.toHaveBeenCalled();
    expect(mockFindMany).toHaveBeenCalledWith('api::vrat-katha.vrat-katha', expect.objectContaining({ filters: {} }));
    expect(ctx.body).toEqual([{ id: 1, Type: 'Ekadashi' }]);
  });

  VALID_TYPES.forEach((type) => {
    test(`TC-U2 (${type}): Valid type passes Type filter to findMany`, async () => {
      const ctx = makeCtx({ type });
      await controller.find(ctx);
      expect(ctx.badRequest).not.toHaveBeenCalled();
      expect(mockFindMany).toHaveBeenCalledWith('api::vrat-katha.vrat-katha', expect.objectContaining({ filters: { Type: type } }));
    });
  });

  test('TC-U3: count() receives same filters as findMany()', async () => {
    const ctx = makeCtx({ type: 'Pradosh' });
    await controller.find(ctx);
    expect(mockCount).toHaveBeenCalledWith('api::vrat-katha.vrat-katha', expect.objectContaining({ filters: { Type: 'Pradosh' } }));
  });

  ['invalid', 'Random123', 'ekadashi', 'EKADASHI'].forEach((type) => {
    test(`TC-U4 (${type}): Invalid type returns badRequest, findMany NOT called`, async () => {
      const ctx = makeCtx({ type });
      await controller.find(ctx);
      expect(ctx.badRequest).toHaveBeenCalledTimes(1);
      expect(ctx._badRequestMsg).toMatch(/allowed values/i);
      expect(mockFindMany).not.toHaveBeenCalled();
    });
  });

  test('TC-U5: Error message lists all valid enum values', async () => {
    const ctx = makeCtx({ type: 'NotAType' });
    await controller.find(ctx);
    VALID_TYPES.forEach((v) => expect(ctx._badRequestMsg).toContain(v));
  });

  test('TC-U6: Pagination headers are set', async () => {
    mockCount.mockResolvedValue(42);
    const ctx = makeCtx({ page: '2', pageSize: '10' });
    await controller.find(ctx);
    expect(ctx.set).toHaveBeenCalledWith('X-Total-Count', '42');
    expect(ctx.set).toHaveBeenCalledWith('X-Page', '2');
    expect(ctx.set).toHaveBeenCalledWith('X-Page-Size', '10');
  });

});
