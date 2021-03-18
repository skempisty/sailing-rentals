# Simple-Project-Template

This is a template for a basic unirepo for a standard MERN stack application. Contains
scaffolding code for front and backend.

## Development

#### Install dependencies

- Yarn `npm install -g yarn`

#### Run from terminal

1. `npm install`

2. `npm run dev`

Starts development server (port 5000) and frontend app (port 3000).

Find frontend at:

`http://localhost:3000/`

## Testing (TBD)

`npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Production
package.json scripts set up for hosting on heroku specifically

### Hosting
Currently hosted for free on one Heroku dyno (server).
> https://dashboard.heroku.com/apps/nps-yacht-club

### Heroku Tasks
A lot of deployment tools are included on Heroku such as
- **Deploy** (https://dashboard.heroku.com/apps/nps-yacht-club/deploy/github). Can
  also be set to automatically deploy when master branch is updated.
- **Environment (env) Variables** (https://dashboard.heroku.com/apps/nps-yacht-club/settings).
  This is found under `Config Vars`. These are populated in the code the same way
  `env` vars show up. Such as `process.env.VAR_NAME`.

### Database
Using ClearDB MySQL _ignite_ server. This is a small (5mb storage) free sql server that'll 
let us get through the development stage. May require a DB change before final
delivery depending on usage.

Find DB access information in Heroku Config Vars

### Build for production locally
`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
