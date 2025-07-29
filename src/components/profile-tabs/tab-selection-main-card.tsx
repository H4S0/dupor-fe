import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { User as UserIcon, Bell, SettingsIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { User } from '@/context/auth-context';
import { ActiveTabs } from '@/pages/dashboard/director/certain-user';

interface TabSelectionCardProps {
  activeTab: ActiveTabs;
  setActiveTab: (value: ActiveTabs) => void;
  user?: User | undefined | null;
  sessionUser: User;
}

const TabSelectionMainCard = ({
  activeTab,
  setActiveTab,
  user,
  sessionUser,
}: TabSelectionCardProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Tabs
          orientation="vertical"
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as ActiveTabs)}
          className="w-full"
        >
          <TabsList className="flex flex-col items-stretch h-auto bg-transparent p-0">
            {(sessionUser?.role === 'director' ||
              sessionUser?._id === user?._id) && (
              <TabsTrigger
                value={ActiveTabs.account}
                className="justify-start px-4 py-2 data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-md"
              >
                <UserIcon size={16} className="mr-2" />
                Account
              </TabsTrigger>
            )}

            {user?.role === 'student' && (
              <>
                <TabsTrigger
                  value={ActiveTabs.grades}
                  className="justify-start px-4 py-2 data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-none"
                >
                  <SettingsIcon size={16} className="mr-2" />
                  Grades
                </TabsTrigger>

                {sessionUser?.role !== 'parent' && (
                  <TabsTrigger
                    value={ActiveTabs.attendance}
                    className="justify-start px-4 py-2 data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-none"
                  >
                    <Bell size={16} className="mr-2" />
                    Attendance
                  </TabsTrigger>
                )}
              </>
            )}

            <TabsTrigger
              value={ActiveTabs.notification}
              className="justify-start px-4 py-2 data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-md"
            >
              <Bell size={16} className="mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TabSelectionMainCard;
