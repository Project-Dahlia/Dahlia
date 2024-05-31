import type { Account, NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  signInWithCredentials,
  registerWithCredentials,
  signInWithGoogle
} from '@/lib/auth';

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

        if (name) {
          // Handle registration
          const user = await registerWithCredentials(name, email, password);
          return user ? user : null; // Return user or null if registration fails
        } else {
          // Handle login
          const user = await signInWithCredentials(email, password);
          return user ? user : null; // Return user or null if login fails
        }
      }
    })
  ],
  pages: {
    signIn: '/api/auth/login'
  },
  callbacks: {
    async signIn({ user, account }) {
      const { name, email } = user as User;
      const { providerAccountId: googleId, access_token: token } =
        account as Account;

      if (account?.provider === 'google') {
        // Handle sign in with Google

        // check if name exists
        if (!name || !email || !googleId || !token) {
          throw new Error('Missing parameters for Google sign-in');
        }

        console.log(name, email, googleId, token);
        const userData = await signInWithGoogle(name, email, googleId, token);
        return !!userData; // return true if user exists, otherwise false
      }

      // Additional checks for other providers (e.g., CredentialsProvider)
      return true; // Assuming all other sign-ins are allowed
    },
    async redirect({ url, baseUrl }) {
      // Custom redirect logic, if needed
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user }) {
      // Add custom fields to the token, if necessary
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom fields to the session, if necessary
      if (token) {
        // session.user = token.id;
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
  }
};
