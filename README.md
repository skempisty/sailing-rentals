# NPS Yacht Club site 

                         _._
                          :.
                          : :
                          :  .
                         .:   :
                        : :    .
                       :  :     :
                      .   :      .
                     :    :       :
                    :     :        .
                   .      :         :
                  :       :          .
                 :        :           :
                .=w=w=w=w=:            .
                          :=w=w=w=w=w=w=.   ....
           <--._______:U~~~~~~~~\_________.:---/
            \      ____===================____/
.,-~"^"~-,.,-~"^"~-,.,-~"^"~-,.,-~"^"~-,.,-~"^"~-,.,-~"^"~-,.,-~"^"~-,.,-~"^"~-,.,-~"^"~-,.


## Development

#### Install dependencies

- Stable with node `v13.12.0`. Use Nvm to ensure this node version is used
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
- **Restart Server** Look for `Restart all dynos` under the `More` dropdown next
  to `Open app`. Sometimes you want to just restart the server instead of deploying
  master all over again.
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

### Build for Heroku locally
This is useful to try a Heroku deploy locally so we don't have to push to master in
order to try a heroku deploy.

`heroku local`