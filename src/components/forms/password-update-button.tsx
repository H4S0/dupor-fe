import { UserRole } from '@/context/auth-context';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { updateUserPasswordRequest } from '@/lib/api/user';

const PasswordUpdateButton = ({
  role,
  isFirstLogin,
}: {
  role: UserRole | undefined;
  isFirstLogin: boolean | undefined;
}) => {
  const navigate = useNavigate();
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          disabled={!isFirstLogin && role !== 'director'}
          className="w-48"
        >
          Password reset request
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Password Update</AlertDialogTitle>
          <AlertDialogDescription>
            You can only update your password once through this system. If you
            need to update it again in the future, you will have to contact your
            director. Are you sure you want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={async () => {
              try {
                const res = await updateUserPasswordRequest();

                if (res?.resetUrl) {
                  navigate(res.resetUrl);
                }
              } catch (err) {
                console.error('Failed to request password update:', err);
              }
            }}
          >
            Proceed
          </AlertDialogAction>

          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasswordUpdateButton;
