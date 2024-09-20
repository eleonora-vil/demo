import NavigationIcons from '@/components/icons/navigation-icons';
import { twMerge } from 'tailwind-merge';

export default function DesignSystem() {
  const colors = ['bg-primary', 'bg-secondary', 'bg-orange', 'bg-green', 'bg-white'];
  return (
    <div className="grid grid-cols-2">
      <section className="space-y-4 text-primary">
        <h1>Typography</h1>
        <div className="flex justify-between items-center">
          <div>H1</div>
          <div className="text-h1">Almost before…</div>
        </div>
        <div className="flex justify-between items-center">
          <div>H2</div>
          <div className="text-h2">Almost before…</div>
        </div>
        <div className="flex justify-between items-center">
          <div>H3</div>
          <div className="text-h3">Almost before…</div>
        </div>
        <div className="flex justify-between items-center">
          <div>H4</div>
          <div className="text-h4">Almost before…</div>
        </div>
        <div className="flex justify-between items-center">
          <div>H5</div>
          <div className="text-h5">Almost before…</div>
        </div>
        <div className="flex justify-between items-center">
          <div>H6</div>
          <div className="text-h6">Almost before…</div>
        </div>
      </section>
      <section className="space-y-4">
        <h1>Color</h1>
        <div className="flex gap-4">
          {colors.map((color) => (
            <div className={twMerge('w-12 h-12 border-2 rounded-full', color)} key={`color schema ${color}`}></div>
          ))}
        </div>
      </section>
      <section>
        <div>Icons</div>
        <div className="flex justify-between">
          <span>Navigation menu</span>
          <div className="flex justify-center items-center">
            <NavigationIcons icon="home" />
          </div>
        </div>
      </section>
    </div>
  );
}
