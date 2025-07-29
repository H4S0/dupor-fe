import React, { forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Class } from '@/lib/api';
import { formatDate } from '@/lib/format-date';
import { Timer, User, Users2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

type ClassCardProps = {
  classData: Class;
};

const ClassCard = forwardRef<HTMLDivElement, ClassCardProps>(
  ({ classData }, ref) => {
    return (
      <Card ref={ref} variant="card" className="my-3">
        <CardHeader>
          <CardTitle>{classData.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 " />
            <p className="text-sm font-medium">{classData.mainProfessor}</p>
          </div>
          <div className="flex items-center gap-2 ">
            <Users2 className="w-5 h-5" />
            <p className="text-sm font-medium">
              {classData.students.length} / {classData.numberOfStudents}{' '}
              students
            </p>
          </div>
          <div className="flex items-center gap-2  text-xs italic">
            <Timer className="w-4 h-4" />
            <time dateTime={classData.createdAt}>
              {formatDate(classData.createdAt)}
            </time>
          </div>
        </CardContent>
        <CardFooter>
          <NavLink
            to={`/dashboard/all-classes/${classData._id}`}
            className="w-full"
          >
            <Button className="w-full">View Class</Button>
          </NavLink>
        </CardFooter>
      </Card>
    );
  }
);

export default ClassCard;
