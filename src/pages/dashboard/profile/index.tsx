import AppLayout from '@/components/additional/dashboard-layout';
import FormSection from '@/components/profile-tabs/form-section';
import ProfileCard from '@/components/profile-tabs/profile-card';
import TabSelectionCard from '@/components/profile-tabs/tab-selection-main-card';
import { sessionAuth } from '@/lib/session';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActiveTabs } from '../director/certain-user';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabs>(ActiveTabs.account);
  const user = sessionAuth.getUser();
  const navigation = useNavigate();

  if (!user) {
    return navigation('/login');
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto w-full px-4 py-6 md:py-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4">
            <ProfileCard user={user} />
            <TabSelectionCard
              sessionUser={user}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <div className="w-full md:w-2/3 lg:w-3/4">
            <FormSection activeTab={activeTab} user={user} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
