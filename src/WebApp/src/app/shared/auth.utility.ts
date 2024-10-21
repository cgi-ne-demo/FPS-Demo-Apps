import { inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map } from 'rxjs';

export class AuthUtility {

    private oktaStateService = inject(OktaAuthStateService);

    public isAuthenticated$ = this.oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
}
