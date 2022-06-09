# My Angular Boilerplate

[![Build Status][ci-badge]][ci] [![Code Coverage][codecov-badge]][codecov]

[ci]: https://github.com/akunzai/angular-boilerplate/actions?query=workflow%3ACI
[ci-badge]: https://github.com/akunzai/angular-boilerplate/workflows/CI/badge.svg
[codecov]: https://codecov.io/gh/akunzai/angular-boilerplate
[codecov-badge]: https://codecov.io/gh/akunzai/angular-boilerplate/branch/main/graph/badge.svg?token=YXI83KW11M

[Angular](http://angular.io/) boilerplate to kick-start new project with SCSS + Bootstrap

## Requirement

- [Node.js](https://nodejs.org)
- [Yarn package manager](https://yarnpkg.com/)
- [Angular CLI](https://angular.io/cli)

## Getting Started

```sh
# activate the yarn package manager
corepack enable

# install npm packages
yarn install

# watch and serve a dev server at http://localhost:4200/
yarn start

# Running unit tests
yarn test

# build the project in production mode. The build artifacts will be stored in the `dist/` directory
yarn build

# extracts i18n messages from source code
yarn i18n:extract
```

## Reference

- [Angular ESLint](https://github.com/angular-eslint/angular-eslint)
- [Angular i18n Library - ngx-translate](https://github.com/ngx-translate/core)
- [Angular Jest Preset](https://github.com/thymikee/jest-preset-angular)
- [Angular Testing Library](https://testing-library.com/docs/angular-testing-library/intro/), [Best practices](https://dev.to/matheusmichels/writing-efficient-tests-with-angular-og5)
- [Mock Service Worker](https://mswjs.io/docs/)
