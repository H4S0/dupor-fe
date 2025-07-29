import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import UpdatingUserForm from '../../forms/updating-user';
import PasswordUpdateButton from '../../forms/password-update-button';
import { User } from '@/context/auth-context';
import SetInitialPassword from '@/components/forms/initial-password-form';
import { sessionAuth } from '@/lib/session';

export type AccountTabProps = {
  user: User;
  parents?: User[] | undefined | null;
  currentParent?: User | null;
};

const AccountTab = ({ user, parents, currentParent }: AccountTabProps) => {
  const sessionUser = sessionAuth.getUser();

  return (
    <Card variant="card">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        <UpdatingUserForm
          key={user._id}
          user={user}
          parents={parents}
          currentParent={currentParent}
        />

        <div className="p-4">
          {sessionUser?._id === user._id && (
            <>
              <div className="mb-2 font-semibold text-lg">
                Password Update Notice
              </div>
              <p className="text-sm mb-4">
                You can update your password only once. If you need to change it
                again, please contact your director.
              </p>
              <PasswordUpdateButton
                role={user?.role}
                isFirstLogin={user?.isFirstLogin}
              />
            </>
          )}
          <div className="flex flex-col items-start gap-2 mt-5">
            {sessionUser?.role === 'director' && (
              <SetInitialPassword userId={user._id} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountTab;
