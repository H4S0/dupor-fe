import DocsLayout from '../docs-layout';
import Heading from '../docs-components/text-style/heading';
import Description from '../docs-components/text-style/description';

export default function CreatingClass() {
  return (
    <DocsLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 py-12">
        <div className="lg:col-span-8 space-y-10">
          <Heading>🏫 Class Management</Heading>
          <Description>
            Only the <strong>Director</strong> can create and manage class data.
            Each class must be associated with a main professor, contain a list
            of students, and have a fully defined timetable. This page outlines
            the complete workflow for managing classes.
          </Description>

          <section id="required-fields" className="space-y-4">
            <h2 className="text-xl font-semibold">📝 Required Fields</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Class Name:</strong> A unique name for the class (e.g.,
                1A, 2B).
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Maximum Students:</strong> The upper limit of students
                that the class can contain.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Main Professor:</strong> A professor who is assigned to
                the class. One professor can be a main professor for{' '}
                <em>only one</em> class.
              </div>
            </div>
          </section>

          <section id="students" className="space-y-4">
            <h2 className="text-xl font-semibold">
              👥 Adding & Managing Students
            </h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Initial Assignment:</strong> Students can be assigned
                during class creation.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Dynamic Management:</strong> Students can be added or
                removed at any time by the Director.
              </div>
            </div>
          </section>

          <section id="timetable" className="space-y-4">
            <h2 className="text-xl font-semibold">🗓️ Timetable Structure</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Daily Schedule:</strong> The timetable is created for
                each day of the week.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Subjects per Day:</strong> You can add as many subjects
                as needed per day.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Time Range:</strong> Each day has a{' '}
                <strong>start time</strong> (e.g., 7:00 AM) and{' '}
                <strong>end time</strong> (e.g., 1:00 PM).
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Subject Assignment:</strong> Each subject must be linked
                to:
                <ul className="list-disc ml-6 mt-1">
                  <li>A Professor</li>
                  <li>The Subject</li>
                  <li>A Classroom ID</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="announcements" className="space-y-4">
            <h2 className="text-xl font-semibold">📢 Class Announcements</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Authorized Roles:</strong> Class announcements can be
                made by the <strong>Main Professor</strong> and the{' '}
                <strong>Director</strong>.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Use Cases:</strong> Announcements may include schedule
                changes, event reminders, or other class-related information.
              </div>
            </div>
          </section>

          <section id="updates" className="space-y-4">
            <h2 className="text-xl font-semibold">✏️ Class Updates</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Who Can Update:</strong> Only the{' '}
                <strong>Director</strong> can modify class information.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Editable Data:</strong> Class name, main professor,
                student list, timetable, and max students can be edited at any
                time.
              </div>
            </div>
          </section>

          <p className="mt-8 text-base leading-relaxed">
            Managing classes accurately ensures that professors and students are
            aligned with the correct academic structure. The Director should
            handle all updates carefully to maintain consistency across the
            system.
          </p>
        </div>

        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-muted border p-4 rounded-lg space-y-2">
            <h3 className="text-lg font-semibold mb-2">On this page</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#required-fields"
                  className="hover:underline text-muted-foreground"
                >
                  📝 Required Fields
                </a>
              </li>
              <li>
                <a
                  href="#students"
                  className="hover:underline text-muted-foreground"
                >
                  👥 Students
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
                  href="#updates"
                  className="hover:underline text-muted-foreground"
                >
                  ✏️ Updates
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </DocsLayout>
  );
}
