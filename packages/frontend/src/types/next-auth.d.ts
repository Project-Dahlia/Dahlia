import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface IUser extends DefaultUser {
  id: string;
  name: string | null;
  email: string | null;
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

interface IUserData extends IUser, JWT {}

// Extend the next-auth types with our custom types
declare module 'next-auth' {
  interface Session {
    user: IUser & DefaultSession['user'];
  }

  interface User extends IUser {}
}

declare module 'next-auth/jwt' {
  interface JWT extends IUser {}
}

// Export IUserData for use in components
export type { IUserData };
