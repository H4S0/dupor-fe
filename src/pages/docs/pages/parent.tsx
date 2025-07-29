import Description from '../docs-components/text-style/description';
import Heading from '../docs-components/text-style/heading';
import DocsLayout from '../docs-layout';

export default function Parent() {
  return (
    <DocsLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 py-12">
        <div className="lg:col-span-8">
          <Heading>👪 Parent Role Overview</Heading>
          <Description>
            The Parent role is designed to help guardians stay informed about
            their child’s academic performance and attendance. This includes
            monitoring class activities, reviewing grades, and explaining
            absences when necessary. Below is a breakdown of what parents can do
            within the platform.
          </Description>

          <section id="attendance" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📆 Attendance Overview</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>View Attendance Records:</strong> Parents can see a full
                list of their child’s attendance records, organized by subject
                and date, directly from the Attendance tab on the student’s
                page.
              </div>

              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Notification Status:</strong> After a professor responds
                to the explanation, the parent will receive a notification about
                whether it was approved or rejected.
              </div>
            </div>
          </section>

          <section id="grades" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📚 Grade Visibility</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>View Grades:</strong> Parents can view all grades their
                child receives — filtered by subject. This helps them stay
                updated on performance across interviews, tests, and activities.
              </div>
            </div>
          </section>

          <section id="class-info" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">🏫 Class Information</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Class Details:</strong> Parents can access information
                about the student’s class, including the assigned professors and
                subjects being taught.
              </div>
            </div>
          </section>

          <section id="announcements" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📢 Announcements</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Global Announcements:</strong> These messages are sent
                by the school administration and are visible to all users.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Class Announcements:</strong> Parents can also view
                updates shared by professors about specific class activities,
                changes, or events.
              </div>
            </div>
          </section>

          <p className="mt-8 text-base leading-relaxed">
            The Parent role is focused on transparency and communication between
            school and home. With real-time updates, explanations, and direct
            access to key student data, parents can play an active role in
            supporting their child’s education journey.
          </p>
        </div>

        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-muted border p-4 rounded-lg space-y-2">
            <h3 className="text-lg font-semibold mb-2">On this page</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#attendance"
                  className="hover:underline text-muted-foreground"
                >
                  📆 Attendance
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
                  href="#class-info"
                  className="hover:underline text-muted-foreground"
                >
                  🏫 Class Info
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
            </ul>
          </div>
        </aside>
      </div>
    </DocsLayout>
  );
}
