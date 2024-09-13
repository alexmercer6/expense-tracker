// src/data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { ExpenseItem } from './entities/ExpenseItem.entity';
import { Expense } from './entities/Expense.entity';

// Load .env file
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: 1433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // Disable synchronize in production
  migrations: ['src/migrations/*.js'], // Path to migration files
  entities: ['dist/**/*.entity.js'],
  logging: true,
  subscribers: ['src/migrations/'],
  options: {
    trustServerCertificate: true, // Accept self-signed certificates
  },
});
