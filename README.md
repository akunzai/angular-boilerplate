# My Angular Boilerplate

Angular boilerplate to kick start new project with SASS, TypeScript, Browserify and Gulp

## Requirement

- node.js >= 4.0

## [Style Guide](https://github.com/johnpapa/angular-styleguide)

## Structure Convention(https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#folders-by-feature-structure)

- `src/app/components/` : standalone components folder
- `src/app/layout/`: shared components folder
- `src/app/services/`: shared service folder
- `src/app/{feature}/` : feature folder
- `src/app/*/*.module.ts` : angular module definition
- `src/app/*/*.config.ts` : angular module configuration
- `src/app/*/*.route.ts` : angular routing configuration
- `src/app/*/*.controller.ts` : angular controller definition
- `src/app/*/*.component.ts` : angular component definition
- `src/app/*/*.service.ts` : angular service/factory definition
- `src/app/*/*.directive.ts` : angular directive definition
- `src/app/*/*.spec.ts` : testing specs
- `src/app/*/*.html` : html template for angular
- `src/app/*/*.scss` : application stylesheets
- `typings` : downloaded typings definition
- `wwwroot` : website root directory
- `wwwroot/locales/{bcp47}.json` : i18n translations

## Before Building

install global packages

```
$ npm install -g gulp typings
```

run npm install at project root

```sh
$ npm install
```

## Start Developing

watch and serve at http://localhost:7000

```sh
$ npm start
```

## Run Testing

```sh
$ npm test
```

## Publish

publish optimized css & js to website root directory

```sh
$ gulp release
```
