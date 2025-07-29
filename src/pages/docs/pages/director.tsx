import Description from '../docs-components/text-style/description';
import Heading from '../docs-components/text-style/heading';
import DocsLayout from '../docs-layout';

export default function Director() {
  return (
    <DocsLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 py-12">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <Heading>Director Role Overview</Heading>
          <Description>
            The Director has full administrative access to the school management
            system. This role is responsible for overseeing all users, classes,
            schedules, and communications within the platform. Below is a
            breakdown of the key responsibilities and actions available to the
            Director.
          </Description>

          {/* User Management */}
          <section id="user-management" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">👥 User Management</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Create Users:</strong> Add students, teachers, or other
                admins.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Manage Users:</strong> Edit, deactivate, or delete
                existing users.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Assign Roles:</strong> Set user permissions (e.g.,
                professor, admin).
              </div>
            </div>
          </section>

          {/* Class Management */}
          <section id="class-management" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">🏫 Class Management</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Create Class:</strong> Define new classes with relevant
                info.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Add Students:</strong> Assign students to classes.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Assign Main Professor:</strong> Link a main professor.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Link Additional Professors:</strong> Add more
                subject-specific staff.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Manage Class Info:</strong> Edit or delete class data.
              </div>
            </div>
          </section>

          {/* Timetable */}
          <section id="timetable" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">🗓️ Timetable Management</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Create Timetable:</strong> Build weekly schedules.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Edit Timetable:</strong> Adjust periods or professors.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Assign Subjects:</strong> Map professors to subjects.
              </div>
            </div>
          </section>

          {/* Announcements */}
          <section id="announcements" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">
              📢 Announcements & Notifications
            </h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Global Announcements:</strong> Notify all users.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Class Notifications:</strong> Share class updates.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>User Notifications:</strong> Send direct messages.
              </div>
            </div>
          </section>

          {/* Additional Controls */}
          <section id="controls" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">🛠️ Additional Controls</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Reset Passwords:</strong> Help users regain access.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Audit Logs:</strong> Track changes (if available).
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Manage School Info:</strong> Update branding & details.
              </div>
            </div>
          </section>

          <p className="mt-8 text-base leading-relaxed">
            This documentation provides a full overview of the Director's role.
            Only trusted personnel should be given this access due to its
            system-wide permissions.
          </p>
        </div>

        {/* Sticky TOC */}
        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-muted border p-4 rounded-lg space-y-2">
            <h3 className="text-lg font-semibold mb-2">On this page</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#user-management"
                  className="hover:underline text-muted-foreground"
                >
                  👥 User Management
                </a>
              </li>
              <li>
                <a
                  href="#class-management"
                  className="hover:underline text-muted-foreground"
                >
                  🏫 Class Management
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
                  href="#controls"
                  className="hover:underline text-muted-foreground"
                >
                  🛠️ Controls
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </DocsLayout>
  );
}
