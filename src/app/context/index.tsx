import React, { PropsWithChildren } from 'react';
import PipProvider from './PipProvider';

const ContextProviders = ({ children }: PropsWithChildren) => {
  return <PipProvider>{children}</PipProvider>;
};

export default ContextProviders;
