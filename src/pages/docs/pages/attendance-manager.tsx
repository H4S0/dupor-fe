import Description from '../docs-components/text-style/description';
import Heading from '../docs-components/text-style/heading';
import DocsLayout from '../docs-layout';

export default function AttendanceManager() {
  return (
    <DocsLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 py-12">
        <div className="lg:col-span-8">
          <Heading>📋 Attendance Management</Heading>

          <Description>
            Attendance plays a key role in school discipline and parent
            communication. Professors in this system are equipped with a
            straightforward but powerful attendance feature that allows them to
            record, track, and manage attendance efficiently — all within the
            student’s user profile.
          </Description>

          <section id="access" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📌 Where to Access It</h2>
            <p>
              The <strong>Attendance Tab</strong> is located on each
              <strong> Student User Page</strong>. Professors can navigate to a
              student’s profile and click on the Attendance tab to manage
              records.
            </p>
          </section>

          <section id="who-can-create" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">
              ✅ Who Can Create Attendance
            </h2>
            <p>
              Only professors who are either the <strong>main professor</strong>{' '}
              of a class, or are assigned to a subject in that class through the
              timetable, can create attendance records.
            </p>
          </section>

          <section id="creating" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📝 Creating Attendance</h2>
            <p>The attendance form includes the following fields:</p>
            <ul className="list-disc list-inside ml-4">
              <li>
                <strong>Subject Name:</strong> Chosen from the professor's
                assigned subjects.
              </li>
              <li>
                <strong>Status:</strong> Either <code>Absent</code> or{' '}
                <code>Unabsent</code>.
              </li>
              <li>
                <strong>Date:</strong> The day the attendance applies to.
              </li>
            </ul>
            <p>
              Once submitted, the record appears immediately in the Attendance
              tab, grouped and filterable by subject.
            </p>
          </section>

          <section id="explanations" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">
              🧾 Parent Absence Explanation
            </h2>
            <p>
              If a student is marked <strong>Absent</strong>, their parent can
              submit an <strong>absence explanation</strong> message.
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>
                Professors receive a notification in the “View All Attendance”
                section for their main class.
              </li>
              <li>
                The professor can either <strong>Accept</strong> or{' '}
                <strong>Decline</strong> the explanation.
              </li>
              <li>
                If declined, the absence is flipped to <code>Unabsent</code>.
              </li>
            </ul>
          </section>

          <section id="viewing" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">🔍 Viewing Attendance</h2>
            <p>
              All attendance entries are shown within the student's Attendance
              Tab. Professors can:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Group records by subject</li>
              <li>View them chronologically</li>
              <li>Filter by specific subject</li>
            </ul>
          </section>

          <p className="mt-8 text-base leading-relaxed">
            This attendance system ensures accurate tracking, transparency, and
            better collaboration between professors and parents.
          </p>
        </div>

        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-muted border p-4 rounded-lg space-y-2">
            <h3 className="text-lg font-semibold mb-2">On this page</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#access"
                  className="hover:underline text-muted-foreground"
                >
                  📌 Where to Access It
                </a>
              </li>
              <li>
                <a
                  href="#who-can-create"
                  className="hover:underline text-muted-foreground"
                >
                  ✅ Who Can Create Attendance
                </a>
              </li>
              <li>
                <a
                  href="#creating"
                  className="hover:underline text-muted-foreground"
                >
                  📝 Creating Attendance
                </a>
              </li>
              <li>
                <a
                  href="#explanations"
                  className="hover:underline text-muted-foreground"
                >
                  🧾 Parent Explanation
                </a>
              </li>
              <li>
                <a
                  href="#viewing"
                  className="hover:underline text-muted-foreground"
                >
                  🔍 Viewing Attendance
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </DocsLayout>
  );
}
