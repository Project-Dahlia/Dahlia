jest.mock('../src/models/user', () => ({
  findOne: jest.fn(),
  create: jest.fn()
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn()
}));

jest.mock('../src/middleware/auth-middleware', () => ({
  generateToken: jest.fn(),
  sanitizeUserData: jest.fn(),
  authMiddleware: jest.fn()
}));

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({ sendMail: jest.fn() })
}));

const {
  register,
  login,
  googleLogin
} = require('../src/controller/auth-controller');

const User = require('../src/models/user');
const bcrypt = require('bcrypt');
const {
  generateToken,
  sanitizeUserData
} = require('../src/middleware/auth-middleware');

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
  process.env.JWT_SECRET = 'test-secret';
});

// ─── register ────────────────────────────────────────────────────────────────

describe('register', () => {
  it('should return 400 when required fields are missing', async () => {
    const req = { body: { name: 'Alice' } };
    const res = buildRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'All fields are required' })
    );
  });

  it('should return 400 when email is already in use', async () => {
    User.findOne.mockResolvedValue({ id: 1, email: 'taken@example.com' });

    const req = {
      body: { name: 'Alice', email: 'taken@example.com', password: 'pass123' }
    };
    const res = buildRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Email already in use' })
    );
  });

  it('should return 201 and create a user when data is valid', async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed-password');
    const mockUser = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      password: 'hashed-password'
    };
    User.create.mockResolvedValue(mockUser);
    generateToken.mockReturnValue('jwt-token');
    sanitizeUserData.mockReturnValue({ id: 1, name: 'Alice', email: 'alice@example.com' });

    const req = {
      body: { name: 'Alice', email: 'alice@example.com', password: 'pass123' }
    };
    const res = buildRes();

    await register(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith('pass123', 10);
    expect(User.create).toHaveBeenCalledWith({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'hashed-password'
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'User created successfully' })
    );
  });

  it('should return 500 when an unexpected error occurs', async () => {
    User.findOne.mockRejectedValue(new Error('DB error'));

    const req = {
      body: { name: 'Alice', email: 'alice@example.com', password: 'pass123' }
    };
    const res = buildRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Internal server error' })
    );
  });
});

// ─── login ───────────────────────────────────────────────────────────────────

describe('login', () => {
  it('should return 400 when email or password are missing', async () => {
    const req = { body: { email: 'user@example.com' } };
    const res = buildRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Email and password are required' })
    );
  });

  it('should return 401 when user is not found', async () => {
    User.findOne.mockResolvedValue(null);

    const req = { body: { email: 'unknown@example.com', password: 'pass' } };
    const res = buildRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Invalid credentials' })
    );
  });

  it('should return 401 when password does not match', async () => {
    User.findOne.mockResolvedValue({ id: 1, email: 'user@example.com', password: 'hashed' });
    bcrypt.compare.mockResolvedValue(false);

    const req = { body: { email: 'user@example.com', password: 'wrongpass' } };
    const res = buildRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Invalid credentials' })
    );
  });

  it('should return 200 with token and sanitized user on success', async () => {
    const mockUser = { id: 1, email: 'user@example.com', password: 'hashed' };
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    generateToken.mockReturnValue('jwt-token');
    sanitizeUserData.mockReturnValue({ id: 1, email: 'user@example.com' });

    const req = { body: { email: 'user@example.com', password: 'correct' } };
    const res = buildRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Login successful' })
    );
  });

  it('should return 500 when an unexpected error occurs', async () => {
    User.findOne.mockRejectedValue(new Error('DB failure'));

    const req = { body: { email: 'user@example.com', password: 'pass' } };
    const res = buildRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Internal server error' })
    );
  });
});

// ─── googleLogin ─────────────────────────────────────────────────────────────

describe('googleLogin', () => {
  it('should return 400 when email or googleId are missing', async () => {
    const req = { body: { email: 'user@example.com' } };
    const res = buildRes();

    await googleLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Email and Google ID are required' })
    );
  });

  it('should return 200 when existing user has matching googleId', async () => {
    const mockUser = {
      id: 1,
      email: 'user@example.com',
      googleId: 'google-123'
    };
    User.findOne.mockResolvedValue(mockUser);
    sanitizeUserData.mockReturnValue({ id: 1, email: 'user@example.com' });

    const req = {
      body: { email: 'user@example.com', name: 'User', googleId: 'google-123' }
    };
    const res = buildRes();

    await googleLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Login successful' })
    );
  });

  it('should return 401 when existing user googleId does not match', async () => {
    const mockUser = {
      id: 1,
      email: 'user@example.com',
      googleId: 'different-google-id'
    };
    User.findOne.mockResolvedValue(mockUser);

    const req = {
      body: { email: 'user@example.com', name: 'User', googleId: 'google-123' }
    };
    const res = buildRes();

    await googleLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Invalid credentials' })
    );
  });

  it('should create a new user and return 201 when no existing user is found', async () => {
    User.findOne.mockResolvedValue(null);
    const newUser = { id: 2, email: 'new@example.com', googleId: 'google-456' };
    User.create.mockResolvedValue(newUser);
    sanitizeUserData.mockReturnValue({ id: 2, email: 'new@example.com' });

    const req = {
      body: { email: 'new@example.com', name: 'New User', googleId: 'google-456' }
    };
    const res = buildRes();

    await googleLogin(req, res);

    expect(User.create).toHaveBeenCalledWith({
      name: 'New User',
      email: 'new@example.com',
      googleId: 'google-456'
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'User created successfully' })
    );
  });

  it('should return 500 when an unexpected error occurs', async () => {
    User.findOne.mockRejectedValue(new Error('DB error'));

    const req = {
      body: { email: 'user@example.com', name: 'User', googleId: 'google-123' }
    };
    const res = buildRes();

    await googleLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Internal server error' })
    );
  });
});
