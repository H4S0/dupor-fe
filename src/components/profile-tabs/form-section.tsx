import AccountTab from './tabs/account-tab';
import { User } from '@/context/auth-context';
import AttendanceTab from './tabs/attendance-tab';
import GradesTab from './tabs/grades-tab';
import NotificationTab from './tabs/notification-tab';
import { ActiveTabs } from '@/pages/dashboard/director/certain-user';

type FormSectionProps = {
  activeTab: ActiveTabs;
  user: User;
  parents?: User[] | undefined | null;
  currentParent?: User | null;
};

const FormSection = ({
  activeTab,
  user,
  parents,
  currentParent,
}: FormSectionProps) => {
  return (
    <div>
      {activeTab === ActiveTabs.account && (
        <AccountTab
          user={user}
          currentParent={currentParent}
          parents={parents}
        />
      )}
      {activeTab === ActiveTabs.attendance && <AttendanceTab user={user} />}
      {activeTab === ActiveTabs.grades && <GradesTab user={user} />}
      {activeTab === ActiveTabs.notification && (
        <NotificationTab userId={user._id} />
      )}
    </div>
  );
};

export default FormSection;
