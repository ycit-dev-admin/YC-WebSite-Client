// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false,
  apiUrlBase: '/api',
  //apiUrlBase: "https://localhost:6001/api"
  openIdConnectSettings: {
    authority: 'https://localhost:5001/',
    client_id: 'yc-client',
    redirect_uri: 'http://localhost:4200/signin-oidc',
    scope: 'openid profile email restapi',
    response_type: 'id_token token',
    post_logout_redirect_uri: 'http://localhost:4200/',
    silent_redirect_uri: 'http://localhost:4200/redirect-silentrenew',
    automaticSilentRenew: true,  //先註解掉避免一直重新連線
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.