import {
  signInWithCredentials,
  registerWithCredentials,
  signInWithGoogle
} from '@/lib/auth';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.clearAllMocks();
  process.env.BACKEND_URL = 'http://localhost:3001';
});

// ─── signInWithCredentials ────────────────────────────────────────────────────

describe('signInWithCredentials', () => {
  it('should return user data on successful sign-in', async () => {
    const mockUser = { data: { id: 1, email: 'user@example.com', token: 'jwt' } };
    mockedAxios.post.mockResolvedValue(mockUser);

    const result = await signInWithCredentials('user@example.com', 'password');

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:3001/api/v1/auth/login',
      { email: 'user@example.com', password: 'password' },
      expect.objectContaining({ headers: { 'Content-Type': 'application/json' } })
    );
    expect(result).toEqual(mockUser.data);
  });

  it('should throw "Invalid credentials" on 401 response', async () => {
    const axiosError = {
      isAxiosError: true,
      response: { status: 401 }
    };
    mockedAxios.post.mockRejectedValue(axiosError);
    mockedAxios.isAxiosError.mockReturnValue(true);

    await expect(signInWithCredentials('bad@example.com', 'wrong')).rejects.toThrow(
      'Invalid credentials'
    );
  });

  it('should throw a generic error on non-401 axios errors', async () => {
    const axiosError = {
      isAxiosError: true,
      response: { status: 500 }
    };
    mockedAxios.post.mockRejectedValue(axiosError);
    mockedAxios.isAxiosError.mockReturnValue(true);

    await expect(signInWithCredentials('user@example.com', 'pass')).rejects.toThrow(
      'An error occurred while signing in'
    );
  });

  it('should throw a generic error on network failure', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Network Error'));
    mockedAxios.isAxiosError.mockReturnValue(false);

    await expect(signInWithCredentials('user@example.com', 'pass')).rejects.toThrow(
      'An error occurred while signing in'
    );
  });
});

// ─── registerWithCredentials ──────────────────────────────────────────────────

describe('registerWithCredentials', () => {
  it('should return user data on successful registration', async () => {
    const mockUser = { data: { id: 2, name: 'Alice', email: 'alice@example.com' } };
    mockedAxios.post.mockResolvedValue(mockUser);

    const result = await registerWithCredentials('Alice', 'alice@example.com', 'pass123');

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:3001/api/v1/auth/register',
      { name: 'Alice', email: 'alice@example.com', password: 'pass123' },
      expect.objectContaining({ headers: { 'Content-Type': 'application/json' } })
    );
    expect(result).toEqual(mockUser.data);
  });

  it('should throw "Failed to register" on 400 response', async () => {
    const axiosError = {
      isAxiosError: true,
      response: { status: 400 }
    };
    mockedAxios.post.mockRejectedValue(axiosError);
    mockedAxios.isAxiosError.mockReturnValue(true);

    await expect(
      registerWithCredentials('Bob', 'existing@example.com', 'pass123')
    ).rejects.toThrow('Failed to register');
  });

  it('should throw a generic error on network failure', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Network Error'));
    mockedAxios.isAxiosError.mockReturnValue(false);

    await expect(
      registerWithCredentials('Bob', 'bob@example.com', 'pass123')
    ).rejects.toThrow('An error occurred while registering');
  });
});

// ─── signInWithGoogle ─────────────────────────────────────────────────────────

describe('signInWithGoogle', () => {
  it('should return user data on successful Google sign-in', async () => {
    const mockUser = { data: { id: 3, email: 'guser@gmail.com', googleId: 'g-123' } };
    mockedAxios.post.mockResolvedValue(mockUser);

    const result = await signInWithGoogle('G User', 'guser@gmail.com', 'g-123', 'id-token');

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:3001/api/v1/auth/google-login',
      { name: 'G User', email: 'guser@gmail.com', googleId: 'g-123' },
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer id-token'
        }
      })
    );
    expect(result).toEqual(mockUser.data);
  });

  it('should throw "Failed to authenticate with Google" on 401 response', async () => {
    const axiosError = {
      isAxiosError: true,
      response: { status: 401 }
    };
    mockedAxios.post.mockRejectedValue(axiosError);
    mockedAxios.isAxiosError.mockReturnValue(true);

    await expect(
      signInWithGoogle('G User', 'guser@gmail.com', 'bad-id', 'token')
    ).rejects.toThrow('Failed to authenticate with Google');
  });

  it('should throw a generic error on network failure', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Network Error'));
    mockedAxios.isAxiosError.mockReturnValue(false);

    await expect(
      signInWithGoogle('G User', 'guser@gmail.com', 'g-123', 'token')
    ).rejects.toThrow('An error occurred while signing in with Google');
  });
});
