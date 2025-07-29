import Description from '../docs-components/text-style/description';
import Heading from '../docs-components/text-style/heading';
import DocsLayout from '../docs-layout';

const Notification = () => {
  return (
    <DocsLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 py-12">
        <div className="lg:col-span-8 space-y-10">
          <Heading>📩 User Notifications</Heading>
          <Description>
            Notifications allow the <strong>Director</strong> to communicate
            directly with specific users. These messages are only visible to the
            user they are assigned to and are accessible through their profile.
          </Description>

          <section id="creating-notification" className="space-y-4">
            <h2 className="text-xl font-semibold">🔧 Creating Notifications</h2>
            <div className="grid gap-4">
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Access Path:</strong> The Director navigates to the{' '}
                <em>All Users</em> tab.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Selecting User:</strong> Locate and select the user to
                open their user profile page.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Notification Panel:</strong> On the user’s page, the
                Director opens the <em>Notifications</em> tab.
              </div>
              <div className="border border-muted rounded-lg p-4 bg-muted/40">
                <strong>Creating Notification:</strong> The Director writes and
                submits a notification, which is then assigned to that user.
              </div>
            </div>
          </section>

          <section id="visibility" className="space-y-4">
            <h2 className="text-xl font-semibold">
              👁️ Who Can See Notifications?
            </h2>
            <div className="border border-muted rounded-lg p-4 bg-muted/40">
              Only the <strong>targeted user</strong> can see the notification.
              Notifications are not shared or visible to other users or roles.
            </div>
          </section>

          <section id="user-access" className="space-y-4">
            <h2 className="text-xl font-semibold">
              👤 User Notification Access
            </h2>
            <div className="border border-muted rounded-lg p-4 bg-muted/40">
              Users can view their notifications by going to their{' '}
              <strong>Profile Page</strong>. The notifications are located in
              the <strong>bottom-left corner</strong> of the profile layout.
            </div>
          </section>

          <p className="mt-8 text-base leading-relaxed">
            This feature is ideal for sending individual reminders, personal
            updates, or private announcements. Directors should use this
            responsibly to keep communication targeted and clear.
          </p>
        </div>

        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-muted border p-4 rounded-lg space-y-2">
            <h3 className="text-lg font-semibold mb-2">On this page</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#creating-notification"
                  className="hover:underline text-muted-foreground"
                >
                  🔧 Creating Notifications
                </a>
              </li>
              <li>
                <a
                  href="#visibility"
                  className="hover:underline text-muted-foreground"
                >
                  👁️ Visibility
                </a>
              </li>
              <li>
                <a
                  href="#user-access"
                  className="hover:underline text-muted-foreground"
                >
                  👤 User Access
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </DocsLayout>
  );
};

export default Notification;
