import Description from '../docs-components/text-style/description';
import Heading from '../docs-components/text-style/heading';
import DocsLayout from '../docs-layout';

export default function TestCreation() {
  return (
    <DocsLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 py-12">
        <div className="lg:col-span-8">
          <Heading>📄 AI Test Creation Tool</Heading>
          <Description>
            This feature allows professors to create test questions instantly
            using AI. By simply providing the subject name, number of tasks, and
            the main topic, the system uses a powerful LLM (Large Language
            Model) to generate well-structured, relevant tasks for a complete
            test — ready for review and editing.
            <br />
            <span className="text-primary font-semibold">
              Professors can freely modify the generated content using a
              built-in rich-text editor. This allows full control over task
              difficulty, formatting, and extra notes.
            </span>
          </Description>

          <section id="creation-steps" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">🛠️ How to Create a Test</h2>
            <ul className="list-disc list-inside ml-2 space-y-2">
              <li>
                Enter the <strong>Subject Name</strong> (e.g., "Mathematics")
              </li>
              <li>
                Specify the <strong>Number of Tasks</strong> (e.g., 5)
              </li>
              <li>
                Provide a brief <strong>Topic Description</strong> (e.g.,
                "Linear Equations")
              </li>
              <li>
                Click <strong>Generate</strong> — the system will create a
                complete test using LLM
              </li>
            </ul>
          </section>

          <section id="editing" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">📝 Editing the Test</h2>
            <p>
              Once generated, the test will be displayed inside a rich editor
              powered by TipTap. This allows you to:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>Edit instructions or questions</li>
              <li>Add additional formatting (headings, bold text, etc.)</li>
              <li>Insert equations, images, or annotations</li>
              <li>Manually write your own tasks if preferred</li>
            </ul>
            <p>
              The editor is flexible and supports keyboard shortcuts,
              markdown-style syntax, and more.
            </p>
          </section>

          <section id="tips" className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold">💡 Tips for Best Results</h2>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>
                Use precise subject and topic descriptions (e.g. "Biology –
                Photosynthesis")
              </li>
              <li>
                Start with 3–5 tasks for faster generation and higher quality
              </li>
              <li>
                Always review and personalize the generated tasks before saving
              </li>
              <li>Try multiple topic phrasings to get varied results</li>
            </ul>
          </section>

          <p className="mt-8 text-base leading-relaxed">
            The AI test creator helps you save hours of writing effort while
            providing you full control to adjust the final test. It’s designed
            to assist — not replace — your expertise as a professor.
          </p>
        </div>

        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-muted border p-4 rounded-lg space-y-2">
            <h3 className="text-lg font-semibold mb-2">On this page</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#creation-steps"
                  className="hover:underline text-muted-foreground"
                >
                  🛠️ How to Create a Test
                </a>
              </li>
              <li>
                <a
                  href="#editing"
                  className="hover:underline text-muted-foreground"
                >
                  📝 Editing the Test
                </a>
              </li>
              <li>
                <a
                  href="#tips"
                  className="hover:underline text-muted-foreground"
                >
                  💡 Tips for Best Results
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </DocsLayout>
  );
}
