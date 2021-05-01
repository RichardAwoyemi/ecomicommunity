// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAGWFMDwK51OU3FqfZ1XF11Wf_-P5SYv2k",
    authDomain: "ecomi-community.firebaseapp.com",
    projectId: "ecomi-community",
    storageBucket: "ecomi-community.appspot.com",
    messagingSenderId: "158709385260",
    appId: "1:158709385260:web:684a87e1cb9274a353e989",
    measurementId: "G-GVM90YYPXJ"
  },
  firebaseApiUrl: 'https://europe-west2-ecomi-community.cloudfunctions.net',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
