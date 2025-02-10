import 'react-toastify/dist/ReactToastify.css';
import style from './HeaderPage.module.scss';
import { NavLink } from 'react-router-dom';

export const HeaderBar = ({ isDarkMode }) => {
  const categories = [
    { path: 'restaurants', name: 'Рестораны' },
    { path: 'concerts', name: 'Концерты' },
    { path: 'exhibitions', name: 'Выставка' },
    { path: 'extreme', name: 'Экстрим' },
    { path: 'theaters', name: 'Театр' },
    { path: 'sports', name: 'Спортивное событие' },
    { path: 'festivals', name: 'Фестиваль' },
    { path: 'seminars', name: 'Семинар' },
    { path: 'bars', name: 'Бар' },
    { path: 'shashlyk', name: 'Шашлык' },
    { path: 'lectures', name: 'Лекция' },
  ];

  return (
    <div className={`${style.headerContainer} ${isDarkMode ? style.darkMode : style.lightMode}`}>
      {categories.map((category) => (
        <NavLink
          key={category.path}
          to={`/eventType/${category.path}`}
          className={({ isActive }) =>
            `${style.navLink} ${isActive ? style.navLinkActive : ''}`
          }
        >
          {category.name}
        </NavLink>
      ))}
    </div>
  );
};