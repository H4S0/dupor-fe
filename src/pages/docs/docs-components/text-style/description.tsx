import React from 'react';

const Description = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-md w-3/4">{children}</p>;
};

export default Description;
