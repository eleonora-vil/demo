import Logo from './logo';
import UserNav from './user-nav';
import Unigate from './unigate';
import Typography from '@/components/Typography';

export default function Header() {
  return (
    <header className="bg-primary flex justify-between pl-2 pr-5 py-3 sticky top-0 z-[10]">
      <div className="text-primary-foreground items-center justify-center flex">
        <Logo />
      </div>
      <div className="flex gap-4 items-center">
        <Unigate />
        <UserNav />
      </div>
    </header>
  );
}
