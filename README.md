# Bloggy Publisher

This repo contains the front-end code for Bloggy's publisher UI.

## Command Line Interfaces

-   `npm install`: install dependencies

-   `npm run lint` to check code style, lint rules and TypeScript compilation

-   `npm run lint:fix` to fix auto-fixable code style problems

-   `npm run start:dev` to start the front end in development mode. Make sure the back end is running before starting the front end.

## Directory Structure of `src/`

<pre>
├── assets/                                (static assets)
├── components/                            (reusable components)
├── layouts/                               (reusable layouts)
├── locales/                               (i18n)
├── models/                                (redux models incl. state, reducers & effects)***
├── pages/
│   ├── 404.tsx
│   ├── Admin.tsx
│   ├── Authorized.tsx
│   ├── Welcome.less
│   ├── Welcome.tsx 
│   ├── document.ejs                      (loading page)
│   └── user/                             (pages related to user activities)
│       └── login/                        (login page)
│           ├── components/               (smaller components of login page)
│           |   ├── LoginContext.tsx
│           |   ├── LoginItem.tsx
│           |   ├── LoginSubmit.tsx
│           |   ├── LoginTab.tsx
│           |   ├── index.less
│           |   ├── index.tsx
│           |   └── map.tsx
│           ├── index.tsx                (main component of login page)***
│           ├── locales/                 (i18n of login page)
│           └── style.less               (stylesheet of login page)
├── services/                            (send requests to server)***
├── manifest.json                        (meta information about the website)
├── global.less                          (global styles)
├── typings.d.ts                         (TypeScript definitions)
└── utils/                               (utility functions)
</pre>

## Todo

To better understand the project structure:

-   Read through the files & directories that are labelled with `***` **in detail**, but do **not** read anything else in detail.

-   Start the back end and the front end. Open Chrome's developer tools and open the "Network" tab to inspect how the front end interacts with the back end.

-   Make use of type declarations. The return type and parameter types reveal a lot about a function.

## Project Dependencies

-   react: main framework
-   react-redux: global state management
-   dva: an abstraction layer over redux to support asynchronous side effects
-   ant design: UI library that provides ready-to-use UI components like buttons, text areas, side bars, etc.

## Resources

-   [react documentation](https://reactjs.org)
-   [redux documentation](https://redux.js.org)
-   [react-redux documentation](documentation)
-   [dva documentation](https://dvajs.com)
-   [ant design component API](https://ant.design/components/overview/)
-   [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)

## FAQ

-   In `src/models/`, I see `reducers` as well as `effects`. I know `reducers` from redux tutorials, but what are `effects`?

> In redux, `reducers` are **pure functions** that takes a previous state and an action, and returns the next state. However, communication with the back end is asynchronous and produces side effects, which means it is **impure**. `effects` are APIs provided by `dva` (a framework that integrates redux and redux-saga) that convert side effects into pure functions. For more information: [dva concepts](https://dvajs.com/guide/concepts.html#effect)
