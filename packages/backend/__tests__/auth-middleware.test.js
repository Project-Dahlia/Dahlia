jest.mock('jsonwebtoken');

const jwt = require('jsonwebtoken');
const {
  authMiddleware,
  generateToken,
  sanitizeUserData
} = require('../src/middleware/auth-middleware');

beforeEach(() => {
  jest.clearAllMocks();
  process.env.JWT_SECRET = 'test-secret';
});

describe('generateToken', () => {
  it('should call jwt.sign with correct payload and return a token', () => {
    const mockUser = { id: 1, email: 'test@example.com' };
    const mockToken = 'mocked.jwt.token';
    jwt.sign.mockReturnValue(mockToken);

    const token = generateToken(mockUser);

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 1, email: 'test@example.com' },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    );
    expect(token).toBe(mockToken);
  });

  it('should include userId and email in the token payload', () => {
    const mockUser = { id: 42, email: 'another@example.com' };
    jwt.sign.mockReturnValue('another.token');

    generateToken(mockUser);

    const [[payload]] = jwt.sign.mock.calls;
    expect(payload).toEqual({ userId: 42, email: 'another@example.com' });
  });
});

describe('sanitizeUserData', () => {
  it('should remove password and deletedAt from user data', () => {
    const mockUser = {
      toJSON: () => ({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        deletedAt: '2024-01-01'
      })
    };

    const result = sanitizeUserData(mockUser);

    expect(result).not.toHaveProperty('password');
    expect(result).not.toHaveProperty('deletedAt');
    expect(result).toHaveProperty('id', 1);
    expect(result).toHaveProperty('name', 'Test User');
    expect(result).toHaveProperty('email', 'test@example.com');
  });

  it('should preserve other user fields', () => {
    const mockUser = {
      toJSON: () => ({
        id: 5,
        name: 'Jane Doe',
        email: 'jane@example.com',
        googleId: 'google-123',
        password: 'secret',
        deletedAt: null
      })
    };

    const result = sanitizeUserData(mockUser);

    expect(result).toHaveProperty('googleId', 'google-123');
    expect(result).not.toHaveProperty('password');
    expect(result).not.toHaveProperty('deletedAt');
  });

  it('should not mutate data when password and deletedAt are absent', () => {
    const mockUser = {
      toJSON: () => ({
        id: 3,
        name: 'No Password',
        email: 'nopw@example.com'
      })
    };

    const result = sanitizeUserData(mockUser);

    expect(result).toEqual({ id: 3, name: 'No Password', email: 'nopw@example.com' });
  });
});

describe('authMiddleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = { header: jest.fn() };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  it('should return 401 when no token is provided', () => {
    mockReq.header.mockReturnValue(undefined);

    authMiddleware(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Access denied, no token provided'
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next() and set req.user when token is valid', () => {
    mockReq.header.mockReturnValue('Bearer valid-token');
    const decoded = { userId: 1, email: 'test@example.com' };
    jwt.verify.mockReturnValue(decoded);

    authMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockReq.user).toEqual(decoded);
  });

  it('should return 400 when token is invalid', () => {
    mockReq.header.mockReturnValue('Bearer bad-token');
    jwt.verify.mockImplementation(() => {
      throw new Error('jwt malformed');
    });

    authMiddleware(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should strip Bearer prefix before verifying', () => {
    mockReq.header.mockReturnValue('Bearer my-token');
    jwt.verify.mockReturnValue({ userId: 1 });

    authMiddleware(mockReq, mockRes, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(
      'my-token',
      process.env.JWT_SECRET
    );
  });
});
