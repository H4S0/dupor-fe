import React from 'react';
import DocsLayout from '../docs-layout';
import Heading from '../docs-components/text-style/heading';
import Description from '../docs-components/text-style/description';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const roleCard = [
  {
    role: 'Director',
    description: 'Manages the entire school system and user access.',
  },
  {
    role: 'Professor',
    description: 'Creates announcements and tracks student attendance.',
  },
  {
    role: 'Parent',
    description: 'Views student attendance and announcements.',
  },
  {
    role: 'Student',
    description: 'Accesses announcements and class info.',
  },
];

const Introduction = () => {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="flex flex-col items-start gap-2">
          <Heading>Introduction</Heading>
          <Description>
            Dupor is a modern, full-featured school management system designed
            to simplify and streamline daily operations for schools, teachers,
            and administrators. It offers an intuitive interface and robust
            backend infrastructure to handle everything from student enrollment
            and class scheduling to attendance tracking and announcements. Built
            with a focus on performance, security, and ease of use, Dupor
            provides a centralized platform for managing core academic workflows
            in an efficient and reliable way.
          </Description>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roleCard.map((item, index) => (
            <Card
              key={index}
              variant="card"
              className="hover:bg-secondary transition-colors duration-300 ease-in-out"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">{index + 1}</span>
                  {item.role}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Heading>Why use Dupor?</Heading>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
            <li>Simplifies day-to-day school operations</li>
            <li>Reduces paperwork and administrative overhead</li>
            <li>Provides a clear, organized view of student and class data</li>
            <li>
              Improves communication through an integrated announcement system
            </li>
            <li>
              Built with clean, scalable code and a developer-friendly
              architecture
            </li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
};

export default Introduction;
