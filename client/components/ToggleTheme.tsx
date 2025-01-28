import React from 'react';
import styles from '../components/Toggle.module.scss';

interface ThemeToggleProps {
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  return (
    <button onClick={toggleTheme} className={styles.themeToggle}>
      Переключить тему
    </button>
  );
};

export default ThemeToggle;