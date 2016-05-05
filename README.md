# My Angular Boilerplate

Angular boilerplate to kick start new project with SASS, TypeScript, Browserify and Gulp

## Requirement

- node.js >= 4.0

## Structure Convention
- `src/app/main.ts` : main entry point
- `src/app/components` : shared component
- `src/app/{view}` : view componet
- `src/app/*/*.module.ts` : angular module definition
- `src/app/*/*.controller.ts` : angular controller definition
- `src/app/*/*.component.ts` : angular component definition
- `src/app/*/*.service.ts` : angular service definition
- `src/app/*/*.directive.ts` : angular directive definition
- `src/app/*/*.spec.ts` : testing specs
- `src/app/*/*.html` : html template for angular
- `src/sass/*.scss` : SASS stylesheets
- `src/locales/{bcp47}.json` : i18n translations
- `typings` : downloaded typings definition
- `wwwroot` : output directory

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

publish optimized css & js to output directory

```sh
$ gulp release
```
