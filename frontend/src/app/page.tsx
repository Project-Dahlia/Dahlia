import { Button } from "@/components/ui/button";

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
    </main>
  );
}
