import { useTheme } from 'features/useTheme';
import { FC, PropsWithChildren } from 'react';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  return <div className={`theme-${theme}`}>{children}</div>;
};

export default ThemeProvider;
