# Dahlia Parking App

Welcome to the Dahlia parking app project! This app provides an on-demand parking solution for everyday use.

## Getting Started

Follow these steps to set up and run the project:

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher) or yarn (v1.x or higher)
- PostgreSQL (v12 or higher)

### Installation

#### 1. Install Root Package

To set up the root package, install dependencies, and configure Husky pre-commit hooks and the Lerna build system:

```bash
npm install
# or
yarn install
```

This will install all necessary dependencies and set up the Husky pre-commit hooks.

#### 2. Frontend Setup

Navigate to './packages/frontend/' directory and install the dependencies

```bash
cd ./packages/frontend
npm install
# or
yarn install
```

To run the development server:

```bash
next dev
# or
yarn dev
```

To run the test scripts:

```bash
npm test
# or
yarn test
```

#### 3. Backend Setup

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
#### 4. Databse Setup
To set up a PostgreSQL connection using Sequelize for your backend:

4.1 Install Sequelize

```bash
npm install --save sequelize
```

4.2 Install the driver for your database (Postgres in our case)

```bash
npm install --save pg pg-hstore
```

4.3 Install Sequelize CLI 

Globally:

```bash
npm install -g sequelize-cli
```

Or Install as a Dev Dependency:

```bash
npm install sequelize-cli --save-dev
```

4.4 Set Up environment variables for development and for test using .env.example from the backend folder

4.5 Initialize the Database

```bash
npx sequelize db:create
```
This will create the database specified in your .env file.

4.5 PostgreSQL Role

Create a Role:

```sql
CREATE ROLE your_db_username WITH LOGIN PASSWORD 'your_db_password';
```

Grant the role privileges to create databases:

```sql
ALTER ROLE your_db_username CREATEDB;
```

4.6 Create a PostgreSQL database

```sql
CREATE DATABASE your_db_name WITH OWNER your_db_username;
```

4.7 Verify Existing Databases and Roles

Check Existing Databases:
```sql
\l
```
Check Existing Roles:
```sql
\du
```

4.8 Migrations

Run migration:
```sql
npx sequelize db:migrate
```

Create a new migration:
```sql
npx sequelize migration:generate --name migration-name
```

Undo the last migration:
```sql
npx sequelize db:migrate:undo
```

Undo all migrations:
```sql
npx sequelize db:migrate:undo:all
```

### Contributing

We welcome contributions to improve this project. Please fork the repository and submit a pull request.

### Licensing

This project is licensed under the MIT License.
