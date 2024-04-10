import Button from '@/components/buttons/Button';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('../components/map/Map'), {
  ssr: false
});

export default function Home() {
  return (
    <main>
      Dahlia
      <div className=" flex gap-4 py-4">
        <Button variant="outline">Button</Button>
        <Button>Button</Button>
        <Button variant="destructive">Button</Button>
        <Button variant="ghost">Button</Button>
        <Button variant="link">Button</Button>
      </div>
      <div>
        <DynamicMap />
      </div>
    </main>
  );
}
