import AnnouncementCard from '@/components/additional/announcement-card';
import AppLayout from '@/components/additional/dashboard-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sessionAuth } from '@/lib/session';
import { useParams } from 'react-router-dom';
import TimetableTab from '@/components/certain-class-tabs/timetable-tab';
import StudentTab from '@/components/certain-class-tabs/student-tab';
import ClassSettingsTab from '@/components/certain-class-tabs/class-settings-tab';
import CreateAnnouncementModal from '@/components/additional/create-announcement-modal';
import { useAllUsers } from '@/hooks/queries/users';
import { useClassById } from '@/hooks/queries/class';

const CertainClass = () => {
  const { classId } = useParams();
  const sessionUser = sessionAuth.getUser();
  const { data: allUsers } = useAllUsers();

  const { data: classData } = useClassById(classId);

  const professors = allUsers?.data?.filter(
    (item) => item.role === 'professor'
  );

  if (!classData?.data?.classInfo) {
    return <p>must be provided</p>;
  }

  const students = allUsers?.data?.filter((item) => item.role === 'student');
  const isMainProfessor =
    sessionUser?._id === classData.data.classInfo.mainProfessor;

  return (
    <AppLayout>
      <Tabs defaultValue="data" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="data">Class</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="data">
          <div>
            <CreateAnnouncementModal isMainProfessor={isMainProfessor} />
          </div>
          <div className="flex flex-col gap-3 mt-3">
            {classData?.data?.classInfo?.announcements.map((item) => (
              <AnnouncementCard
                announcement={item}
                key={item._id}
                classId={classData.data?.classInfo?._id}
              />
            ))}
          </div>
        </TabsContent>
        <StudentTab
          classId={classData?.data?.classInfo?._id}
          students={students}
        />
        <TimetableTab
          professors={professors}
          classId={classData.data.classInfo._id}
          timetable={classData.data.timetables}
        />
        <ClassSettingsTab
          classData={classData.data.classInfo}
          professors={professors}
        />
      </Tabs>
    </AppLayout>
  );
};

export default CertainClass;
