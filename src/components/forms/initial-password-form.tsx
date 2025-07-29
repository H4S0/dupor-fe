import { setInitialPassword } from '@/lib/api/user';
import { Button } from '../ui/button';

const SetInitialPassword = ({ userId }: { userId: string }) => {
  return (
    <div className="w-48 space-y-1">
      <Button
        variant="secondary"
        className="w-full"
        onClick={async () => {
          await setInitialPassword(userId);
        }}
      >
        Set initial password
      </Button>
    </div>
  );
};

export default SetInitialPassword;
