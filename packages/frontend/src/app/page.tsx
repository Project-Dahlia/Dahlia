import React, { useEffect, useState } from 'react';
import { getServerSession, Session } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

const Home = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getServerSession(options);
      setSession(session);
    };

    fetchSession();
  }, []);

  return (
    <main>
      {session ? (
        <h1>Logged in as {session?.user?.name}</h1>
      ) : (
        <h1>Not logged in</h1>
      )}
    </main>
  );
};

export default Home;
