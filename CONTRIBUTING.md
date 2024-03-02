# 📚 Contributing Guidelines

✨ Thank you for taking the time to contribute to Project Dahlia!
Here are some important processes and guidelines this project follows.

**Disclaimer:** _this guide is currently aimed towards internal developers, but will continue to be updated for outside contributors later on._

## 📝 Issues

We try to keep our issues organized and purposeful, so that's why we provide templates for you to create them.

The main issues we think will be created more often are `🚀 Feature Request` and `🐛 Bug Report`, which you can choose [here](https://github.com/Project-Dahlia/Dahlia/issues/new/choose).

You may find other issue formats that we use internally:
- `🚄 CI` - CI/CD automation
- `📖 Docs` - improvements or addition to documentation
- `✨ Polish` - refactoring and cleanup
- `⚙️ Setup` - focuses on setting up new infrastructure, technologies, scripts, etc.
- `📔 Task` - tasks / stories that contains subtasks
- `🧪 Tests` - testing related

Note that this is a tentative list of issue formats that are currently in use, and is subject to change in the future.

We are currently considering adding a `📖 Docs` issue template soon.

## 💻 Development

> 📨 If you want the quick version, we have installation instructions in [README](./README.md) as well.

When developing a solution, you will need to setup the project locally and install dependencies.

Make sure you have:
- Git `v2.44.0`
- Node `v20.11.1`
- npm `v10.2.4`

Once you have these tools installed on your machine, you can verify their versions:
```
git --version
git version 2.44.0

node -v
v20.11.1

npm -v
v10.2.4
```

TODO: `nvm` for managing `node` and `npm` versions

From there, clone the repository (SSH recommended):
```
git clone git@github.com:Project-Dahlia/Dahlia.git
```

Then, checkout to your own development branch to work in:
```
git checkout -b your-development-branch
```

We follow a loose convention for branch names
```
[type]/gh-[issue number]/[summary of task]

gh-16/setup-ci-frontend-tests
docs/gh-16/fix-typos
```
where `16` is the issue number.

## 📏 Code Consistency

We have conventions that are enforced within our code to maintain consistency.

### Linters

We use ESLint and Prettier.

We have pre-commit git hooks that will run and format your code when you commit. Once you push your code remotely and make a pull request, we have GitHub Actions workflows that run the same checks again in a consistent cloud environment. Sometimes, Git GUI clients will bypass git hooks, so this acts as another layer of precaution.

### Commits

We use [`commitlint`](https://commitlint.js.org) to enforce [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

### Testing

We encourage writing unit and integration tests.

Our workflows will also run tests for each pull request and each push to `dev` branch.

## ⛓️ Pull Requests

Once you have made your changes, you can make a pull request from your development branch into `dev`, via GitHub.

We have a PR template for you to fill out, in order to make the code review process faster for you and easier for us.

Filling out the PR template will tell us **what** and **why** you made the changes. Your code will tell us **how** those changes are made. If there are additional contexts that are not obvious through the code (i.e. specific commands to generate the code), please include those. Screenshots are also encouraged, especially if the changes are frontend related.

## 🚀 Releases

We use [`lerna`](https://lerna.js.org/docs/api-reference/commands) to manage our releases, package versioning, and changelogs.
