import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

import { OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { authInterceptor } from './auth.interceptor';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-02813652.okta.com/oauth2/default',
  clientId: '0oakd5mxb2h7tSROt5d7',
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ['openid', 'offline_access', 'profile']
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(OktaAuthModule.forRoot({ oktaAuth }))
  ]
};