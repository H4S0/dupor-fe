import Icons from '@/components/additional/icons';
import SchoolHeading from '@/components/additional/school-heading';
import NewPasswordForm from '@/components/forms/new-password';
import React from 'react';

const SetPassword = () => {
  return (
    <div className="relative p-5">
      <SchoolHeading />
      <Icons />

      <div className="relative z-50">
        <NewPasswordForm />
      </div>
    </div>
  );
};

export default SetPassword;
