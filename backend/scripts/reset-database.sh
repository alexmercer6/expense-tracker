#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Step 1: Drop all tables
echo "Dropping all tables from the ExpenseTrackerDB database..."
sqlcmd -S localhost -d ExpenseTrackerDB -U sa -P SQLConnect1 -C -Q "
USE [ExpenseTrackerDB];

-- Drop foreign key constraints
DECLARE @sql NVARCHAR(MAX) = N'';

SELECT @sql += N'ALTER TABLE [' + s.name + N'].[' + t.name + N'] DROP CONSTRAINT [' + fk.name + N'];'
FROM sys.foreign_keys AS fk
INNER JOIN sys.tables AS t ON fk.parent_object_id = t.object_id
INNER JOIN sys.schemas AS s ON t.schema_id = s.schema_id;

EXEC sp_executesql @sql;

-- Drop all tables
SET @sql = N'';

SELECT @sql += N'DROP TABLE [' + s.name + N'].[' + t.name + N'];'
FROM sys.tables AS t
INNER JOIN sys.schemas AS s ON t.schema_id = s.schema_id;

EXEC sp_executesql @sql;
"

# Step 2: Run migrations to recreate tables
echo "Running TypeORM migrations to reset the schema..."
npm run clean
npm run build
npm run db:migrate

echo "Database has been reset."
