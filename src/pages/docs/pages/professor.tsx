import Description from '../docs-components/text-style/description';
import Heading from '../docs-components/text-style/heading';
import DocsLayout from '../docs-layout';

export default function Professor() {
  return (
    <DocsLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 py-12">
        <div className="lg:col-span-8">
          <Heading>Professor Role Overview</Heading>
          <Description>
            Professors play a vital role in the daily academic activities of
            students. They are responsible for managing grades, attendance, and
            communication for the classes and subjects they are assigned to.
            Below is a breakdown of actions and privileges granted to the
            professor role.
          </Description>

          <section id="class-involvement" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">🏫 Class Involvement</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Main Class Access:</strong> Professors assigned as main
                professors can manage their assigned class entirely.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Associated Classes:</strong> Professors can interact
                with other classes they’re connected to through the timetable
                (for specific subjects).
              </div>
            </div>
          </section>

          <section id="attendance" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📋 Attendance Management</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Mark Attendance:</strong> Professors can take attendance
                for subjects they teach in any class they’re assigned to.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>View Attendance Records:</strong> Professors can view
                past attendance submissions.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Absence Explanation:</strong> If a student is marked{' '}
                <em>absent</em>, parents can send an absence explanation to
                justify the reason (e.g., illness, travel).
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Review Explanations:</strong> Professors can{' '}
                <span className="font-medium">accept</span> or{' '}
                <span className="font-medium">decline</span> the parent’s
                explanation. If accepted, the absence remains recorded. If
                declined, the absence is converted to <em>unabsent</em> and
                removed from the student’s absence history.
              </div>
            </div>
          </section>

          <section id="grades" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📊 Grade Management</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Add Grades:</strong> Professors can grade students based
                on tests, activities, or interviews for the subjects they’re
                assigned.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>View Grades:</strong> Professors can track grade history
                and performance per subject.
              </div>
            </div>
          </section>

          <section id="class-viewer" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">🔍 View Class Info</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Check Class List:</strong> View all students enrolled in
                any of the professor’s associated classes.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Timetable Access:</strong> View subjects and periods
                across the week for planning and reference.
              </div>
            </div>
          </section>

          <p className="mt-8 text-base leading-relaxed">
            Professors are a core part of the system's daily use. Their tools
            are designed to simplify classroom management, improve
            communication, and make grading and attendance seamless.
          </p>
        </div>

        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-muted border p-4 rounded-lg space-y-2">
            <h3 className="text-lg font-semibold mb-2">On this page</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#class-involvement"
                  className="hover:underline text-muted-foreground"
                >
                  🏫 Class Involvement
                </a>
              </li>
              <li>
                <a
                  href="#attendance"
                  className="hover:underline text-muted-foreground"
                >
                  📋 Attendance
                </a>
              </li>
              <li>
                <a
                  href="#grades"
                  className="hover:underline text-muted-foreground"
                >
                  📊 Grades
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
                  href="#class-viewer"
                  className="hover:underline text-muted-foreground"
                >
                  🔍 Class Viewer
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </DocsLayout>
  );
}
