// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {IEnvironmentInterface} from "../app/interface/environment.interface";

export const environment: IEnvironmentInterface = {
  apiKey: 'AIzaSyDWv7tcYFFlG9hi6cK0k4vzK-7Pqx8l9fY',
  production: false,
  fbDbUrl: 'https://search-angular-default-rtdb.europe-west1.firebasedatabase.app'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
