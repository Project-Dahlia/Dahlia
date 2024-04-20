import { Button } from './ui/button';
import { MainNav } from './main-nav';

export function Header() {
  return (
    <header
      className="sticky top-0 h-14 bg-white px-2 backdrop-blur-xl sm:flex sm:justify-between"
      data-testid="header-container"
    >
      <div className="container flex items-center justify-around">
        <MainNav />
        <div className="flex justify-end">
          <nav className="mx-4 flex items-center gap-6 py-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-400 bg-white px-4 font-bold"
              aria-label="Login"
            >
              Login
            </Button>
            <Button
              variant="default"
              className="px-4 font-bold"
              size="sm"
              aria-label="Register"
            >
              Register
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
