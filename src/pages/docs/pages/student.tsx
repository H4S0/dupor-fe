import Description from '../docs-components/text-style/description';
import Heading from '../docs-components/text-style/heading';
import DocsLayout from '../docs-layout';

export default function Student() {
  return (
    <DocsLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 py-12">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <Heading>🎓 Student Role Overview</Heading>
          <Description>
            Students have a read-only role within the school management system.
            Their experience is designed for clarity, transparency, and easy
            access to academic and class-related updates. Below is a breakdown
            of what students can view inside the platform.
          </Description>

          {/* Profile Info */}
          <section id="profile-info" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">👤 Personal Information</h2>
            <div className="border border-muted rounded-lg p-4 bg-muted/40">
              Students can view their own profile details, including name,
              class, and other essential academic information.
            </div>
          </section>

          {/* Grades */}
          <section id="grades" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📚 Grades</h2>
            <div className="border border-muted rounded-lg p-4 bg-muted/40">
              Access to all personal grades. Grades can be filtered by subject
              for easier tracking of academic performance.
            </div>
          </section>

          {/* Attendance */}
          <section id="attendance" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📝 Attendance</h2>
            <div className="border border-muted rounded-lg p-4 bg-muted/40">
              Students can monitor their attendance history, status (Absent or
              Unabsent), and explanations (if any were added by a parent).
            </div>
          </section>

          {/* Announcements */}
          <section id="announcements" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📢 Announcements</h2>
            <div className="border border-muted rounded-lg p-4 bg-muted/40">
              Students receive school-wide and class-specific announcements
              shared by professors or school staff.
            </div>
          </section>

          {/* Notifications */}
          <section id="notifications" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">🔔 Notifications</h2>
            <div className="border border-muted rounded-lg p-4 bg-muted/40">
              Direct updates sent specifically to a student, such as private
              notes or reminders.
            </div>
          </section>

          {/* Timetable */}
          <section id="timetable" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">🗓️ Timetable</h2>
            <div className="border border-muted rounded-lg p-4 bg-muted/40">
              View the complete weekly class schedule including subjects and
              professors assigned to each period.
            </div>
          </section>

          <p className="mt-8 text-base leading-relaxed">
            Students are not able to make any changes inside the system. Their
            dashboard is strictly for viewing educational progress and staying
            informed on everything happening in their class and school.
          </p>
        </div>

        {/* Sticky TOC */}
        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-muted border p-4 rounded-lg space-y-2">
            <h3 className="text-lg font-semibold mb-2">On this page</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#profile-info"
                  className="hover:underline text-muted-foreground"
                >
                  👤 Personal Info
                </a>
              </li>
              <li>
                <a
                  href="#grades"
                  className="hover:underline text-muted-foreground"
                >
                  📚 Grades
                </a>
              </li>
              <li>
                <a
                  href="#attendance"
                  className="hover:underline text-muted-foreground"
                >
                  📝 Attendance
                </a>
              </li>
              <li>
                <a
                  href="#announcements"
                  className="hover:underline text-muted-foreground"
                >
                  📢 Announcements
                </a>
              </li>
              <li>
                <a
                  href="#notifications"
                  className="hover:underline text-muted-foreground"
                >
                  🔔 Notifications
                </a>
              </li>
              <li>
                <a
                  href="#timetable"
                  className="hover:underline text-muted-foreground"
                >
                  🗓️ Timetable
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </DocsLayout>
  );
}
