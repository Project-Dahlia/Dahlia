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

#### 4. Husky hooks

- In case you are unable to execute husky hooks

Use below 2 commands on command line:

```bash
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

- In case of the warning message "husky - '~/.huskyrc' is DEPRECATED"

Use below commands on command line:

```bash
mkdir -p ~/.config/husky
mv ~/.huskyrc ~/.config/husky/init.sh
npm install -g npm
```

- In case of error message "TypeError: args.at is not a function"

Usually indicates an issue with the compatibility between the Node.js version and the JavaScript code you are trying to run.

Install NVM if you do not have it already:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

```

Install the latest LTS version of Node.js and set the installed version as the default:

```bash
nvm install --lts
nvm use --lts
nvm alias default lts/*
```

Verify the installation:

```bash
node -v
npm -v
```

- Run Hooks Manually

```bash
.husky/pre-commit
```

- For errors related to branch name or commit message format:
  Please note: We follow a loose convention for branch names

```bash
[type]/gh-[issue number]/[summary of task]

gh-16/setup-ci-frontend-tests
docs/gh-16/fix-typos
```

where `16` is the issue number.

For commit message format checkout -- [link](https://www.conventionalcommits.org/en/v1.0.0/)

### Contributing

We welcome contributions to improve this project. Please fork the repository and submit a pull request.

### Licensing

This project is licensed under the MIT License.
