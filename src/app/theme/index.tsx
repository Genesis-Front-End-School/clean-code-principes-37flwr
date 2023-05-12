import { useTheme } from 'features/useTheme';
import React, { FC, PropsWithChildren } from 'react';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  console.log(theme);
  return <div className={`theme-${theme}`}>{children}</div>;
};

export default ThemeProvider;
