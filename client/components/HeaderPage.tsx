import 'react-toastify/dist/ReactToastify.css';
import style from './HeaderPage.module.scss'; 
import { NavLink } from 'react-router-dom';
import React from 'react';

export const HeaderBar = () => {

  const categories = [
    { path: 'ski', name: 'Лыжи' },
    { path: 'bars', name: 'Бары' },
    {  path: 'exhibition',  name:'Выставка' },
    { path: 'parties', name: 'Вечеринки' },
    { path: 'museums', name: 'Музеи' },
    { path: 'football', name: 'Футбол' },
    { path: 'cinema', name: 'Кино' }, 
    { path: 'concerts', name: 'Концерты' },
    { path: 'restaurants', name: 'Рестораны' },
    { path: 'theaters', name: 'Театры' },
  ];

  return (
    <div className={style.headerContainer}>
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