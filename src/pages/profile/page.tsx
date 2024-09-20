import TitleBanner from '@/components/title-banner';
import { useEffect } from 'react';
import ProfileForm from './components/ProfileForm';

export default function ProfilePage() {
  useEffect(() => {
    document.title = "Profile - FAMS"
  }, [])
  return (
    <div>
      <TitleBanner title={'Profile'} />
      <div>
        <ProfileForm />
      </div>
    </div>
  );
}
