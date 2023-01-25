# Bob integration

## Requirements

1. Node version ^16.17.1
2. VSCode.

## Start project

1. Run

   ```shell
       $ npm install
   ```

2. Running server with wherever the next command:
   ```shell
       $ npm start
   ```

The project is running on http://127.0.0.1:3000

## Dev Guide

### Branch prefixes

How to name your supporting branch prefixes?

- Feature branches? [feature/]
- Release branches? [release/]
- Hotfix branches? [hotfix/]
- Support branches? [support/]
- Enhancement branches? [enhancement/]

Example:
`$ git checkout -b feature/my-awesome-feature`

Reference: [Git Flow](https://github.com/vivebamba/wiki/blob/revision/content/guidelines/git-flow.md)

### Testing

The project counts with unit and integration tests scripts run by jest and cypress,
respectively. If you want to do TDD, we recommend you to run interactive commands, so
you will test your code immediately after changes are made.

1. Running test
   ```shell
       $ npm run test
   ```
2. Run e2e testing tool in interactive mode
   ```shell
       $ npm run cy:open
   ```
3. Run e2e testing tool in command line
   ```shell
       $ npm run cy:run
   ```
   > Important: Before running e2e tests, make sure you are running the frontend
   > application in port 3000

### Linting

eslint will return errors and provide feedback of any line in the code that breaks the
linting rules that the project has been configured with. What rules those are? You can check them
in `.eslintrc.js` file.

1. Running lint
   ```shell
       $ npm run lint
   ```
2. Running lint fix
   ```shell
       $ npm run lint:fix
   ```

### Code formatting

prettier will handle the code formatting using provided configuration rules.
Make sure you configure your IDE or text editor so prettier runs on code
formatting tasks.

### Git hooks

Husky is the tool that allows running commands in reaction of the execution of git tasks.

#### Pre-commit

Runs lint-staged command that executes the lint tool on the code and tries to fix all linting detected errors.

#### Pre-push

Run cy:run command that executes cypress test detected integration errors
