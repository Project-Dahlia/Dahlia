import { User } from 'next-auth';

export async function signInWithCredentials(email: string, password: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  const user = await response.json();
  console.log('response', user);

  return user;
}

export async function registerWithCredentials(
  name: string,
  email: string,
  password: string
) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to register');
  }

  const user = await response.json();

  console.log('response', user);

  return user;
}

export async function signInWithGoogle(
  name: string,
  email: string,
  googleId: string,
  token: string
): Promise<User | null> {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/auth/google-login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, email, googleId })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to authenticate with Google');
  }

  const user = await response.json();

  console.log('google user 1', user);

  return user;
}
