# My AngularJS Boilerplate

AngularJS boilerplate to kick-start new project with SASS, TypeScript and Webpack

## Requirement

- [Node.js](https://nodejs.org)
- [Webpack](https://webpack.github.io)

## Style Guide

- [Angular 1 Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
- [Angular 2 Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html)

## Structure Convention

- `src/app/{feature}/` : create folders named for the feature they represent
- `src/app/*/shared/`: cross feature's shared folder
- `src/app/*/index.ts` : imports, aggregates, and re-exports items. (We call this technique a barrel)
- `src/app/*/*.model.ts` : domain model class definition
- `src/app/*/*.module.ts` : angular module definition
- `src/app/*/*.config.ts` : angular module configuration
- `src/app/*/*.route.ts` : angular routing configuration
- `src/app/*/*.controller.ts` : angular controller definition
- `src/app/*/*.component.ts` : angular component definition
- `src/app/*/*.service.ts` : angular service/factory definition
- `src/app/*/*.directive.ts` : angular directive definition
- `src/app/*/*.spec.ts` : testing specs
- `src/app/*/*.html` : view template
- `src/app/*/*.scss` : component styles
- `src/app/styles/*.scss`: global styles
- `src/app/locales/{locale}.json` : i18n locale messages
- `dist` : output directory

## Before Building

run npm install at project root

```sh
npm install
```

## Start Developing

watch and serve at http://127.0.0.1:8080/webpack-dev-server/ in memory

```sh
npm start
```

## Publish

publish optimized css & js to website root directory

```sh
npm run release
```
