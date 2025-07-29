import AppLayout from '@/components/additional/dashboard-layout';
import FormSection from '@/components/profile-tabs/form-section';
import ProfileCard from '@/components/profile-tabs/profile-card';
import TabSelectionCard from '@/components/profile-tabs/tab-selection-main-card';
import { useAllUsers, useCertainUser } from '@/hooks/queries/users';
import { sessionAuth } from '@/lib/session';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export enum ActiveTabs {
  account = 'account',
  grades = 'grades',
  notification = 'notification',
  attendance = 'attendance',
}

const CertainUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const sessionUser = sessionAuth.getUser();
  const { data } = useCertainUser(userId);
  const { data: currentParent } = useCertainUser(data?.data?.parentId);
  const { data: allUsersData } = useAllUsers();
  const [activeTab, setActiveTab] = useState<ActiveTabs>(ActiveTabs.account);

  if (!sessionUser) {
    return navigate('/login');
  }

  if (!data?.data) {
    return <p>loading</p>;
  }

  const parents = allUsersData?.data?.filter((user) => user.role === 'parent');
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto w-full px-4 py-6 md:py-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4">
            <ProfileCard user={data.data} />
            <TabSelectionCard
              sessionUser={sessionUser}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              user={data.data}
            />
          </div>

          <div className="w-full md:w-2/3 lg:w-3/4">
            <FormSection
              user={data.data}
              activeTab={activeTab}
              parents={parents}
              currentParent={currentParent?.data}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CertainUser;
