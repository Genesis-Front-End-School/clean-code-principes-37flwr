import { FallbackProps } from 'react-error-boundary';

export interface IExtendedError extends Error {
  response?: string;
}

export interface IErrorFallbackProps extends Omit<FallbackProps, 'error'> {
  error: IExtendedError;
}
