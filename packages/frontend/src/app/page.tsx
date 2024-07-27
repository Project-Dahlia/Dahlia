import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(options);

  console.log('session', session?.user);

  return (
    <main>
      {session ? (
        <h1>Logged in as {session?.user?.name}</h1>
      ) : (
        <h1>Not logged in</h1>
      )}
    </main>
  );
}
