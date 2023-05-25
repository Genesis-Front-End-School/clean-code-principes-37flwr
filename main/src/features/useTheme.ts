import { themeActions } from 'store/ducks/theme';
import { useAppDispatch, useAppSelector } from 'store/hooks';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.Theme);

  const nextTheme = theme === 'light' ? 'dark' : 'light';

  const changeTheme = () => dispatch(themeActions.changeTheme(nextTheme));

  return { theme, changeTheme };
};
