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

### Contributing

We welcome contributions to improve this project. Please fork the repository and submit a pull request.

### Licensing

This project is licensed under the MIT License.
