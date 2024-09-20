/* eslint-disable react/jsx-key */
import TitleBanner from '@/components/title-banner';
import { Button } from '@/components/ui/button';
import TabsDashboard from './components/TabsDashboard';
import useAuthorized from '@/hooks/useAuthorized';
import AccesDeniedPage from '../access-denied';

export default function HomePage() {
  const isAccessable = useAuthorized({ requestTo: 'home', actionType: 'view' });
  return (
    <div>
      {isAccessable ? (
        <div className="space-y-4">
          <TitleBanner title="Overall: New Design System" component={[<Button>Test</Button>]} />
          <TabsDashboard />
        </div>
      ) : (
        <AccesDeniedPage />
      )}
    </div>
  );
}
