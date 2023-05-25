import { useContext } from 'react';
import { PipContext } from 'app/context/PipProvider';

export const usePip = () => useContext(PipContext);
