import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  signInWithCredentials,
  registerWithCredentials,
  signInWithGoogle
} from '@/lib/auth';
import { IUserData } from '@/types/next-auth';

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text', optional: true }
      },
      async authorize(credentials) {
        const { email, password, name } = credentials as {
          email: string;
          password: string;
          name?: string;
        };

        let userData;

        if (name) {
          // Handle registration
          userData = await registerWithCredentials(name, email, password);
        } else {
          // Handle login
          userData = await signInWithCredentials(email, password);
        }

        if (userData) {
          return userData;
        }
      }
    })
  ],
  pages: {
    signIn: '/api/auth/login'
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          const { name, email } = user;
          const googleId = profile?.sub;
          const token = account.access_token;

          if (!name || !email || !googleId || !token) {
            throw new Error('Missing parameters for Google sign-in');
          }

          const userData = await signInWithGoogle(name, email, googleId, token);
          if (userData) {
            return true;
          }
        } catch (error) {
          console.error('Google sign-in error:', error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user = token as IUserData;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60 // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET as string
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  }
};
