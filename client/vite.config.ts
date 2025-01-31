import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import envCompatible from 'vite-plugin-env-compatible';

// Загрузка переменных окружения из .env файлов
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    envCompatible(), // Добавление плагина для совместимости с переменными окружения
  ],
  
})
