import { LogOutIcon, MoreVerticalIcon, UserCircleIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { User } from '@/context/auth-context';
import { SidebarMain } from './sidebar-main';
import DashboardSidebarHeader from './dashboard-sidebar-header';
import { useItemsByRole } from './sidebar-items';

export function AppSidebar({
  user,
  logout,
}: {
  user: User;
  logout: () => void;
}) {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { navMain } = useItemsByRole(user.role);

  return (
    <Sidebar collapsible="icon">
      <DashboardSidebarHeader />
      <SidebarContent>
        <SidebarMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <AvatarImage />
                    <AvatarFallback className="rounded-lg">
                      <img src={user.image} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user.firstName}, {user.lastName}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.role}
                    </span>
                  </div>
                  <MoreVerticalIcon className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
              >
                <NavLink to="/dashboard/user-profile">
                  <DropdownMenuItem>
                    <UserCircleIcon />
                    Account
                  </DropdownMenuItem>
                </NavLink>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
