import Description from '../docs-components/text-style/description';
import Heading from '../docs-components/text-style/heading';
import DocsLayout from '../docs-layout';

export default function AbsentExplanation() {
  return (
    <DocsLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 py-12">
        <div className="lg:col-span-8">
          <Heading>✏️ Sending Absent Explanation (For Parents)</Heading>
          <Description>
            This guide explains how parents can submit an absent explanation
            when their child has been marked as absent in a subject. It ensures
            smooth communication between parents and professors and provides an
            official record for each case.
          </Description>

          <section id="when-to-use" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📌 When Can You Send It?</h2>
            <div className="border border-muted rounded-lg p-4 bg-muted/40">
              Parents can only submit an absent explanation **if the student's
              attendance status is marked as "Absent"**. This status is assigned
              by the professor after a scheduled subject.
            </div>
          </section>

          <section id="where-to-find" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📍 Where to Find It</h2>
            <div className="border border-muted rounded-lg p-4 bg-muted/40">
              Navigate to your child’s <strong>User Page</strong> and click on
              the <strong>Attendance</strong> tab. Here, you’ll see all
              attendance records grouped by subject and date. If a record is
              marked as <code>Absent</code>, an{' '}
              <strong>"Add Explanation"</strong> button will appear beside it.
            </div>
          </section>

          <section id="how-to-submit" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📝 How to Submit</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                1. Click the <strong>Add Explanation</strong> button next to the
                absent record.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                2. A pop-up form will appear where you can type your explanation
                in a free-form text area. This can be short or long, depending
                on your needs.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                3. Once done, click <strong>Submit</strong> to send the
                explanation to the professor.
              </div>
            </div>
          </section>

          <section id="after-submission" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">✅ What Happens Next?</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                - The professor receives a notification about your explanation.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                - They can either <strong>Accept</strong> (which deletes the
                absence) or <strong>Decline</strong> (which changes it to
                <code>Unabsent</code>).
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                - You will be notified about the final decision directly in the
                system.
              </div>
            </div>
          </section>

          <p className="mt-8 text-base leading-relaxed">
            This feature is designed to keep attendance transparent and to give
            parents a fair chance to explain unavoidable absences. Professors
            will carefully review each explanation and make a decision based on
            the context provided.
          </p>
        </div>

        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-muted border p-4 rounded-lg space-y-2">
            <h3 className="text-lg font-semibold mb-2">On this page</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#when-to-use"
                  className="hover:underline text-muted-foreground"
                >
                  📌 When to Use
                </a>
              </li>
              <li>
                <a
                  href="#where-to-find"
                  className="hover:underline text-muted-foreground"
                >
                  📍 Where to Find
                </a>
              </li>
              <li>
                <a
                  href="#how-to-submit"
                  className="hover:underline text-muted-foreground"
                >
                  📝 How to Submit
                </a>
              </li>
              <li>
                <a
                  href="#after-submission"
                  className="hover:underline text-muted-foreground"
                >
                  ✅ What Happens Next
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </DocsLayout>
  );
}
