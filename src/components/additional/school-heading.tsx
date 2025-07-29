import { School } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';

export default function SchoolHeading() {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-8">
        <School className="w-16 h-16 text-school-blue" />
      </div>

      <h1 className="text-3xl font-bold text-primary">MSŠT</h1>
      <p className="font-semibold">Your gateway to educational excellence</p>
      <NavLink to="/docs/introduction">
        <Button variant="link">View documentaion</Button>
      </NavLink>
    </div>
  );
}
