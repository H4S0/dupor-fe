import { SidebarTrigger } from '../ui/sidebar';
import { ModeToggle } from '../theme-provider/mode-toggle';
import { Bread } from './breadcrumb';

const DashboardNavbar = () => {
  return (
    <nav className=" border-b h-14 flex items-center justify-between p-5 bg-sidebar">
      <div className="flex items-center gap-7">
        <SidebarTrigger />
        <Bread />
      </div>
      <ModeToggle />
    </nav>
  );
};

export default DashboardNavbar;
