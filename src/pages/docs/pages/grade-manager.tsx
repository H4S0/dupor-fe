import Description from '../docs-components/text-style/description';
import Heading from '../docs-components/text-style/heading';
import DocsLayout from '../docs-layout';

export default function GradeManager() {
  return (
    <DocsLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 py-12">
        <div className="lg:col-span-8">
          <Heading>📊 Grade Management for Professors</Heading>
          <Description>
            Professors have the ability to manage and assign student grades
            directly from the user profile page. This section covers everything
            related to how professors can add and view grades within the system.
          </Description>

          <section id="creating-grades" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">✍️ Creating a Grade</h2>
            <p>
              Professors who are either the main professor of a class or are
              assigned to a subject via the class timetable are authorized to
              create grades for students.
            </p>
            <p>The grade entry form includes the following fields:</p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>
                <strong>Subject Name:</strong> Must match one of the professor’s
                assigned subjects.
              </li>
              <li>
                <strong>Grade:</strong> A value between 1 and 5.
              </li>
              <li>
                <strong>Status:</strong> Type of assessment –{' '}
                <code>interview</code>, <code>test</code>, or{' '}
                <code>activity</code>.
              </li>
              <li>
                <strong>Date:</strong> The date the grade was given.
              </li>
            </ul>
            <p>
              This form is located under the <strong>"Grades"</strong> tab on
              the selected user’s page.
            </p>
          </section>

          <section id="viewing-grades" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📂 Viewing Grades</h2>
            <p>
              Once grades are submitted, professors can view them immediately on
              the same page in the “View All Grades” section.
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>
                <strong>Filter by Subject:</strong> Grades can be filtered per
                subject for better clarity.
              </li>
              <li>
                <strong>Chronological View:</strong> All grades are shown with
                date and assessment type for context.
              </li>
            </ul>
            <p>
              This enables professors to maintain a clean and organized grading
              history for each student they work with.
            </p>
          </section>

          <p className="mt-8 text-base leading-relaxed">
            This grading system ensures professors have a structured,
            permission-based flow for evaluating students, while maintaining
            clarity and traceability across subjects.
          </p>
        </div>

        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-muted border p-4 rounded-lg space-y-2">
            <h3 className="text-lg font-semibold mb-2">On this page</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#creating-grades"
                  className="hover:underline text-muted-foreground"
                >
                  ✍️ Creating a Grade
                </a>
              </li>
              <li>
                <a
                  href="#viewing-grades"
                  className="hover:underline text-muted-foreground"
                >
                  📂 Viewing Grades
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </DocsLayout>
  );
}
