import React from 'react';
import './styles.scss';

const ChangeThemeButton = ({
  onClick,
  currentTheme,
}: {
  onClick: () => any;
  currentTheme: 'base' | 'alternative';
}) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        onClick={onClick}
        checked={currentTheme === 'alternative'}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default ChangeThemeButton;
