import AnnouncementCard from '@/components/additional/announcement-card';
import CreateAnnouncementModal from '@/components/additional/create-announcement-modal';
import AppLayout from '@/components/additional/dashboard-layout';
import MainStudentTab from '@/components/certain-class-tabs/main-student-tab';
import TimetableTab from '@/components/certain-class-tabs/timetable-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMainClass } from '@/hooks/queries/class';
import { sessionAuth } from '@/lib/session';

const MainClass = () => {
  const sessionUser = sessionAuth.getUser();
  const mainClass = useMainClass();

  if (mainClass.isFetching) {
    return <AppLayout>loading</AppLayout>;
  }

  if (!mainClass.data?.mainClass) {
    return <AppLayout>this profesor doesnt have main class</AppLayout>;
  }

  const isMainProfessor =
    sessionUser?._id === mainClass.data.mainClass.mainProfessor;

  return (
    <AppLayout>
      <Tabs defaultValue="data" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="data">Class</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        <TabsContent value="data">
          <div>
            <CreateAnnouncementModal isMainProfessor={isMainProfessor} />
          </div>
          <div className="flex flex-col gap-3">
            {mainClass.data.mainClass.announcements?.map((item) => (
              <AnnouncementCard
                announcement={item}
                key={item._id}
                classId={mainClass.data.mainClass?._id}
              />
            ))}
          </div>
        </TabsContent>
        <MainStudentTab classId={mainClass.data.mainClass._id} />
        <TimetableTab
          classId={mainClass.data.mainClass._id}
          timetable={mainClass.data.mainClassTimetable}
        />
      </Tabs>
    </AppLayout>
  );
};

export default MainClass;
