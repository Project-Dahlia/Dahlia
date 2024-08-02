import axios from 'axios';
import { User } from 'next-auth';

export async function signInWithCredentials(email: string, password: string) {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/v1/auth/login`,
      {
        email,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const user = response.data;
    console.log('response', user);

    return user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        throw new Error('Invalid credentials');
      }
    }
    throw new Error('An error occurred while signing in');
  }
}

export async function registerWithCredentials(
  name: string,
  email: string,
  password: string
) {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/v1/auth/register`,
      {
        name,
        email,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const user = response.data;
    console.log('response', user);

    return user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        throw new Error('Failed to register');
      }
    }
    throw new Error('An error occurred while registering');
  }
}

export async function signInWithGoogle(
  name: string,
  email: string,
  googleId: string,
  token: string
): Promise<User | null> {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/v1/auth/google-login`,
      {
        name,
        email,
        googleId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    const user = response.data;
    console.log('google user 1', user);

    return user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        throw new Error('Failed to authenticate with Google');
      }
    }
    throw new Error('An error occurred while signing in with Google');
  }
}
