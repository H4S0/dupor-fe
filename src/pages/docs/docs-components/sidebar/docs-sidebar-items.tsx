import { Separator } from '@/components/ui/separator';
import { Link, NavLink } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import sidebarItems from './sidebar-items-data';

const DocsSidebar = () => {
  return (
    <div className="flex flex-row justify-between items-start h-full">
      <div className="flex flex-col gap-2 w-52">
        <NavLink to="/dashboard">
          <Card
            className="flex items-center gap-2 text-primary font-semibold"
            variant="card"
          >
            <ArrowLeft />
            <p>Dashboard</p>
          </Card>
        </NavLink>
        {sidebarItems.map((item) => {
          const isDirector = item.title === 'Director';
          const isProfessor = item.title === 'Professor';
          const isStudent = item.title === 'Student';
          const isParent = item.title === 'Parent';
          return (
            <div key={item.path}>
              {isDirector && <Separator className="my-2" />}
              {isProfessor && <Separator className="my-2" />}
              {isStudent && <Separator className="my-2" />}
              {isParent && <Separator className="my-2" />}

              <Link
                to={item.path}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-2 rounded hover:bg-gray-800"
              >
                {item.title}
              </Link>
            </div>
          );
        })}
      </div>
      <Separator orientation="vertical" className="h-full mr-2" />
    </div>
  );
};

export default DocsSidebar;
