# Dahlia Parking App Backend

Follow these steps to set up and run the project:

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher) or yarn (v1.x or higher)
- PostgreSQL (v12 or higher)

## Backend Setup

Navigate to the './packages/backend/' and install dependencies:

```bash
cd ./packages/backend
npm install
# or
yarn install
```

To run development server:

```bash
npm start
# or
yarn start
```

```bash
npm test
# or
yarn test
```

## Database Setup

To set up a PostgreSQL connection using Sequelize for your backend:

### 1. Install Sequelize

```bash
npm install --save sequelize
```

### 2. Install the driver for your database (Postgres in our case)

```bash
npm install --save pg pg-hstore
```

### 3. Install Sequelize CLI

Globally:

```bash
npm install -g sequelize-cli
```

Or Install as a Dev Dependency:

```bash
npm install sequelize-cli --save-dev
```

### 4. Set Up environment variables for development and for test using .env.example from the backend folder

### 5. Initialize the Database

```bash
npx sequelize db:create
```

This will create the database specified in your .env file.

### 6. PostgreSQL Role

Create a Role:

```sql
CREATE ROLE your_db_username WITH LOGIN PASSWORD 'your_db_password';
```

Grant the role privileges to create databases:

```sql
ALTER ROLE your_db_username CREATEDB;
```

### 7. Create a PostgreSQL database (optional)

Note: This step is unnecessary if you've already created the database using Sequelize CLI in step 5. If you prefer manual creation, you can skip step 5 and manually run the following:

```sql
CREATE DATABASE your_db_name WITH OWNER your_db_username;
```

### 8. Verify Existing Databases and Roles

Check Existing Databases:

```sql
\l
```

Check Existing Roles:

```sql
\du
```

### 9. Migrations

Run migration:

```bash
npx sequelize db:migrate
```

Create a new migration:

```bash
npx sequelize migration:generate --name migration-name
```

Undo the last migration:

```bash
npx sequelize db:migrate:undo
```

Undo all migrations:

```bash
npx sequelize db:migrate:undo:all
```
### Documentation

Checkout the sequelize documentation for further help - [link](https://sequelize.org/docs/v6/getting-started/)
