import AppLayout from '@/components/additional/dashboard-layout';
import ProfileCard from '@/components/profile-tabs/profile-card';
import TabSelectionCard from '@/components/profile-tabs/tab-selection-main-card';
import { useParentStudent } from '@/hooks/queries/parent';
import { sessionAuth } from '@/lib/session';
import { useState } from 'react';
import { ActiveTabs } from '../director/certain-user';
import { useNavigate } from 'react-router-dom';

const ParentStudent = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabs>(ActiveTabs.account);
  const sessionUser = sessionAuth.getUser();
  const studentData = useParentStudent();
  const navigate = useNavigate();

  if (!studentData.data?.data) {
    return <p>loading</p>;
  }

  if (!sessionUser) {
    return navigate('/login');
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto w-full px-4 py-6 md:py-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4">
            <ProfileCard user={studentData.data?.data} />
            <TabSelectionCard
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              user={studentData.data?.data}
              sessionUser={sessionUser}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ParentStudent;
