import dotenv from 'dotenv';
dotenv.config();

// application
export const PORT: number = Number(process.env.PORT) || 3000;
export const NODE_ENV: string = process.env.NODE_ENV || 'dev';
export const BASE_URL = `http://127.0.0.1:${PORT}`;

// database
export const DB_HOST: string =
  process.env.DB_HOST || 'mongodb://127.0.0.1:27017';

export const DB: string = process.env.DB || 'pollution';
export const DB_PARAMETERS: string = process.env.DB_PARAMETERS || '';

/*
    cors
    add allowed origins options in your env separated by comma
    eg. CORS_ALLOWED_ORIGINS=http://localhost:3000,https://example.com
    */
export const CORS_ALLOWED_ORIGINS =
  process.env.CORS_ALLOWED_ORIGINS?.split(',') ||
  (['http://localhost:3000'] as string[]);
