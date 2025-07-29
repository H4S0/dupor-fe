import Description from '../docs-components/text-style/description';
import Heading from '../docs-components/text-style/heading';
import DocsLayout from '../docs-layout';

const GettingStarted = () => {
  return (
    <DocsLayout>
      <div className=" space-y-8">
        <Heading>Getting Started: How to Log In</Heading>

        <Description>
          Welcome to Dupor! To access your personalized dashboard, you need to
          log in with your unique credentials. Here’s a quick guide on how to
          log in:
        </Description>

        <section className="space-y-4">
          <Heading>Login Form Fields</Heading>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>User JMB</strong>
              <br />
              Enter your unique user number assigned by the government. This
              number identifies you within the system.
            </li>
            <li>
              <strong>Password</strong>
              <br />
              Enter your secure password. Make sure it matches the password you
              set during account creation or received from your administrator.
            </li>
            <li>
              <strong>Role Selection</strong>
              <br />
              Select your role from the dropdown menu before logging in. It is
              important to choose the correct role to access the right dashboard
              and permissions. The available roles are:
              <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                <li>Director</li>
                <li>Professor</li>
                <li>Parent</li>
                <li>Student</li>
              </ul>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <Heading>Important Notes</Heading>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Make sure you enter the correct combination of user number,
              password, and role. If any of these are incorrect, you will not be
              able to log in.
            </li>
            <li>
              If you have trouble logging in, contact your system administrator
              or school IT support for assistance.
            </li>
            <li>
              Your role selection affects the features and data you can access
              in Dupor.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <Heading>Quick Tips</Heading>
          <ul className="list-disc list-inside space-y-1">
            <li>Double-check your user number for any typos.</li>
            <li>Passwords are case-sensitive.</li>
            <li>
              Always log out after your session, especially when using a shared
              or public computer.
            </li>
          </ul>
        </section>

        <p>
          Once logged in successfully, you will be redirected to your dashboard
          where you can start managing or viewing school information based on
          your role.
        </p>

        <p className="italic">Happy learning and managing with Dupor!</p>
      </div>
    </DocsLayout>
  );
};

export default GettingStarted;
