Requirements:
To Develop an application where:
1. the user can type an address into a text field and display the results on a map. 
1.1.

2. to have a chart that shows the results grouped by type.

3. to be built with Angular (4, 5 or 6), 
4. LeafletJS (for the map) 
5. d3 (for the chart). 






# Implementation
1. A Nx Workspace has been used to sustain a suite of applications that share libraries, as a mono-repo
2. The packages from https://github.com/Asymmetrik/ngx-leaflet have been installed to aid in this prototype
3. a shared ui-module lib has been created to hold ui elements (meant to be shared easily among apps user, admin, etc., in the suite):
3.1 the input-ui-component
3.2 the map-ui-component
3.3 the chart-ui-component
# improvements
1. the chart-ui-component 
1.1 to be created as a lazy-loaded ui-lib: https://github.com/nrwl/workshop-nx-labs/blob/master/organizing-code-in-a-workspace/lab-2.md
1.2 to appear as a modal component


# How to run the user-portal app
1. Clone this repository
```
git clone <https://....git>
```

2. Hydrate dependencies and start development server
```
cd <nxSuiteFolder>
npm i
npm run user-portal
```
This will start a development server at :
`** Angular Live Development Server is listening on localhost:4201, open your browser on http://localhost:4201/ **`


# About
# IaNxWorkspaceName

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx).

## Nrwl Extensions for Angular (Nx)

<a href="https://nrwl.io/nx"><img src="https://preview.ibb.co/mW6sdw/nx_logo.png"></a>

Nx is an open source toolkit for enterprise Angular applications.

Nx is designed to help you create and build enterprise grade Angular applications. It provides an opinionated approach to application project structure and patterns.

## Quick Start & Documentation

[Watch a 5-minute video on how to get started with Nx.](http://nrwl.io/nx)

## Generate your first application

Run `ng generate app myapp` to generate an application. When using Nx, you can create multiple applications and libraries in the same CLI workspace. Read more [here](http://nrwl.io/nx).

## Development server

Run `ng serve --app=myapp` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name --app=myapp` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build --app=myapp` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
