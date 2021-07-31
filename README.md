# Movies List

## NPM Commands

`next:dev` - runs the next dev server

`next:build` - builds next for prod

`next:export` - exports static next HTML to `<rootDir>/html`

`nodemon` - runs node dev server, hot reloads on changes to `<rootDir>/express/**/*.js`. Use for development along with `tsc:watch:server`.

`codegen:generate` - scrapes our GQL server and generates our TS types + React hooks base on GQL schema. All types + hooks placed in `<rootDir>/types/generated.types.ts`. Note -- the server needs to be running on process.env.NODE_PORT for this to work (either `docker-compose up` or `nodemon`)

`test` - runs all tests

`test:watch` - runs all tests on watch mode

`storybook` - starts the storybook server

`tsc:build:server` - compiles JS within the `express` dir

`tsc:watch:server` - watches the `express` dir for changes to `**/*.ts`

### Next steps

1. Husky integration
2. DB seeding work
