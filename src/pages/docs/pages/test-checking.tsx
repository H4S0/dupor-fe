import Description from '../docs-components/text-style/description';
import Heading from '../docs-components/text-style/heading';
import DocsLayout from '../docs-layout';

export default function TestChecking() {
  return (
    <DocsLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 py-12">
        <div className="lg:col-span-8">
          <Heading>🧠 AI Test Evaluation Tool</Heading>
          <Description>
            This feature allows professors to evaluate student tests using
            AI-powered OCR (Optical Character Recognition) and smart scoring.
            It’s designed to save time, reduce manual errors, and assist in
            grading handwritten or digital test submissions.
            <br />
            <span className="text-primary font-semibold">
              Note: While this tool provides helpful grading automation,
              professors should always review and confirm the final evaluation.
            </span>
          </Description>

          <section id="overview" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">🚀 How It Works</h2>
            <ul className="list-disc list-inside ml-2 space-y-2">
              <li>
                Professors upload a clean image of a student's test — either
                handwritten, printed, or typed.
              </li>
              <li>
                They must first define the test structure: tasks and maximum
                points for each.
              </li>
              <li>
                Once uploaded, the system uses OCR and AI to extract responses
                and generate scores.
              </li>
              <li>
                The LLM (Large Language Model) also suggests a structured result
                summary per task.
              </li>
            </ul>
          </section>

          <section id="task-form" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📝 Task Input Form</h2>
            <p>
              Before uploading a test, professors define the evaluation criteria
              by listing tasks.
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>
                <strong>Task Description:</strong> (e.g., “Solve the integral”)
              </li>
              <li>
                <strong>Max Points:</strong> (e.g., 10)
              </li>
              <li>You can dynamically add or remove tasks as needed.</li>
            </ul>
          </section>

          <section id="upload-process" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">
              📸 Uploading the Test Image
            </h2>
            <p>
              After the form is completed, upload a clear image of the student's
              answer sheet. Ensure the image is:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>
                <strong>Readable</strong>
              </li>
              <li>
                <strong>Not cropped</strong>
              </li>
              <li>Formats supported: JPG, PNG, PDF</li>
            </ul>
            <p>The system will begin analyzing and scoring once uploaded.</p>
          </section>

          <section id="llm-editor" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">
              🧾 Reviewing the AI Evaluation
            </h2>
            <p>
              After scoring, the system generates a result summary using LLM.
              This summary:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>
                Lists scores per task (e.g., <code>Task 1 – 7 / 10</code>)
              </li>
              <li>May include short feedback or reasoning</li>
              <li>
                Appears inside a <strong>TipTap editor</strong> for manual
                review
              </li>
            </ul>
            <p>
              Professors can freely edit the LLM response in the editor — change
              wording, adjust scores, or write additional comments before
              confirming results.
            </p>
          </section>

          <section id="finalize" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">✅ Finalizing Results</h2>
            <p>
              Once reviewed, professors can approve and save the evaluation. The
              data can then be stored, exported, or linked to student records.
            </p>
            <p className="text-sm text-muted-foreground">
              Reminder: Always confirm AI-generated results for fairness and
              correctness.
            </p>
          </section>
        </div>

        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-muted border p-4 rounded-lg space-y-2">
            <h3 className="text-lg font-semibold mb-2">On this page</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#overview"
                  className="hover:underline text-muted-foreground"
                >
                  🚀 How It Works
                </a>
              </li>
              <li>
                <a
                  href="#task-form"
                  className="hover:underline text-muted-foreground"
                >
                  📝 Task Input Form
                </a>
              </li>
              <li>
                <a
                  href="#upload-process"
                  className="hover:underline text-muted-foreground"
                >
                  📸 Uploading the Test Image
                </a>
              </li>
              <li>
                <a
                  href="#llm-editor"
                  className="hover:underline text-muted-foreground"
                >
                  🧾 Reviewing the AI Evaluation
                </a>
              </li>
              <li>
                <a
                  href="#finalize"
                  className="hover:underline text-muted-foreground"
                >
                  ✅ Finalizing Results
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </DocsLayout>
  );
}
