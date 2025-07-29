import AttendanceCard from '@/components/additional/attendance-card';
import AppLayout from '@/components/additional/dashboard-layout';
import { useAttendance } from '@/hooks/queries/attendance';

const StudentAttendance = () => {
  const attendanceData = useAttendance();

  return (
    <AppLayout>
      {attendanceData.data?.data?.map((item) => (
        <div className="mx-auto max-w-6xl" key={item._id}>
          <AttendanceCard data={item} />
        </div>
      ))}
    </AppLayout>
  );
};

export default StudentAttendance;
