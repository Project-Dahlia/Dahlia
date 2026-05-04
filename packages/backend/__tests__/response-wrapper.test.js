const responseWrapper = require('../src/utils/response-wrapper');

describe('responseWrapper', () => {
  let mockRes;

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('should call res.status with the provided status code', () => {
    responseWrapper(mockRes, 200, {}, 'OK');
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it('should call res.json with correct structure including status, message, and data', () => {
    responseWrapper(mockRes, 200, { id: 1 }, 'Success');
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 200,
      message: 'Success',
      data: { id: 1 }
    });
  });

  it('should default data to empty object when not provided', () => {
    responseWrapper(mockRes, 400, undefined, 'Bad Request');
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 400,
      message: 'Bad Request',
      data: {}
    });
  });

  it('should default message to empty string when not provided', () => {
    responseWrapper(mockRes, 500, {});
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 500,
      message: '',
      data: {}
    });
  });

  it('should handle 201 status with nested data', () => {
    const data = { user: { id: 2, name: 'Alice' }, token: 'abc123' };
    responseWrapper(mockRes, 201, data, 'Created');
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 201,
      message: 'Created',
      data
    });
  });

  it('should handle 404 status with empty data and a message', () => {
    responseWrapper(mockRes, 404, {}, 'Not Found');
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 404,
      message: 'Not Found',
      data: {}
    });
  });
});
