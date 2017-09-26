// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  version: 'DEV',
  firebase: {
    apiKey: 'AIzaSyADlNqki2TR46QBYRjD5wpRrc3eFVXB3Hw',
    authDomain: 'open-municipality.firebaseapp.com',
    databaseURL: 'https://open-municipality.firebaseio.com',
    projectId: 'open-municipality',
    storageBucket: 'open-municipality.appspot.com',
    messagingSenderId: '597188393440'
  }
};
