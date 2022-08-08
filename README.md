To start server outside docker, you need start docker-compose with postgres database in folder postgres, and then start server  
Logging system and exception filter located in src/logger, uncautchedException and unhandledRejection catch in src/main.ts with process events  
3 log levels - 0: [log, error, warn], 1: [debug], 2: [verbose]  
Logs write into LOG_DIR_FILE(env variable), into folder logs, in with folder exist log folder(for logs), error folder(for errors and warnings), debug folder(for debug and verbose), files is named with current time
Auth system located into src/modules/auth folder and src/auth.guard.ts file
If have some questions discord: whyTurtle#3475
# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
