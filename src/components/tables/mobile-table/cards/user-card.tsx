import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { User } from '@/context/auth-context';
import { Key, User as UserIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { forwardRef } from 'react';
import { deleteUser } from '@/lib/api/user';
import { useQueryClient } from '@tanstack/react-query';

const UserCard = forwardRef<HTMLDivElement, { userData: User }>(
  ({ userData }, ref) => {
    const queryClient = useQueryClient();

    return (
      <Card ref={ref} variant="card" className="my-3">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {userData.firstName} {userData.lastName}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 text-sm mt-1">
            <Key className="w-4 h-4" />
            <span>{userData.jmb}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            <Badge>{userData.role}</Badge>
          </div>

          <div className="text-sm">
            First time login:{' '}
            <span className="font-medium">
              {userData.isFirstLogin ? 'Yes' : 'No'}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-center w-full gap-2">
          <NavLink
            to={`/dashboard/all-users/${userData._id}`}
            className="w-full"
          >
            <Button className="w-full">View User</Button>
          </NavLink>
          <Button
            className="w-full"
            variant="outline"
            onClick={async () => {
              await deleteUser(userData._id);
              queryClient.invalidateQueries({
                queryKey: ['paginatedUsers'],
              });
              queryClient.refetchQueries({ queryKey: ['paginatedUsers'] });
            }}
          >
            Delete user
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

export default UserCard;
