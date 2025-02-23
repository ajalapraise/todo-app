# Todo App
This is a simple todo app built with Next.js and ChakraUI. It is a simple app that allows users to add, delete, and mark todos as completed. 
Features include: the dag and drop feature, search, and edit tasks.



## Getting started
- Clone this repo

```shell
git clone https://github.com/ajalapraise/todo-app.git
```

- Create a new branch with a name relecting what you intend to work on

```shell
git checkout -b <branch-name>
```

- Install pnpm if you don't have it already installed on your machine, it is the package manager we're using in this project.

```shell
npm i -g pnpm

```

- Get all the project dependencies

```shell
pnpm i
```

- Run the command below to start the dev server. The local address should be **localhost:3000**
```shell
pnpm run dev
```

- When you're done with your changes, send a PR to the dev branch.

## Reviewing an open PR

To review an open PR locally &mdash; on your machine, follow the steps below

Fetch the PR branch: Use the PR number to fetch the branch:

```bash
git fetch origin pull/<PR_NUMBER>/head:<BRANCH_NAME>
```

Replace:
- `<PR_NUMBER>` with the Pull Request number.
- `<BRANCH_NAME>` with a name you'd like to give the branch locally.

For example:
```bash
git fetch origin pull/42/head:ajala-dev
```

Check out the fetched branch:

```bash
git checkout ajala-dev
```

## Tools

These are the tools (or tech) we're using in this repo. The list would increase as we progress.

- [ChakraUI v3](https://www.chakra-ui.com/docs/get-started/installation) for our design system and UI components. 
-Icons set from [Lucide](https://lucide.dev/)
- [nuqs](https://nuqs.47ng.com/docs): for a global URL store.


