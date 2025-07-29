import AnnouncementCard from '@/components/additional/announcement-card';
import AppLayout from '@/components/additional/dashboard-layout';
import TimetableTab from '@/components/certain-class-tabs/timetable-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStudentClass } from '@/hooks/queries/class';
import { useAllUsers } from '@/hooks/queries/users';

const StudentClass = () => {
  const classData = useStudentClass();
  const { data: allUsers } = useAllUsers();

  if (!classData?.data?.data?.classInfo) {
    return <AppLayout>must be provided</AppLayout>;
  }

  const professors = allUsers?.data?.filter(
    (item) => item.role === 'professor'
  );

  return (
    <AppLayout>
      {' '}
      <Tabs defaultValue="data" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="data">Announcements</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
        </TabsList>
        <TabsContent value="data">
          <div className="flex flex-col gap-3 mt-3">
            {classData.data?.data?.classInfo?.announcements.map((item) => (
              <AnnouncementCard
                announcement={item}
                key={item._id}
                classId={classData.data.data?.classInfo?._id}
              />
            ))}
          </div>
        </TabsContent>

        <TimetableTab
          professors={professors}
          classId={classData.data?.data?.classInfo?._id}
          timetable={classData.data?.data?.timetables}
        />
      </Tabs>
    </AppLayout>
  );
};

export default StudentClass;
