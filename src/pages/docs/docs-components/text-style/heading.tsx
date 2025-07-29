import React from 'react';

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="text-primary text-3xl font-semibold">{children}</h3>;
};

export default Heading;
