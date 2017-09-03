import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
 } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

// import { AuthGuard } from './auth-guard.service';
import { AuthService, AuthServiceConfig } from './auth.service';

import { environment } from 'environments/environment';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase, 'open-municipality'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

  ],
  providers: [
    AuthService,
    AngularFireAuth,
  ],
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
      if (parentModule) {
        throw new Error(
          'CoreModule is already loaded. Import it in the AppModule only');
      }
    }

  static forRoot(config: AuthServiceConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: AuthServiceConfig, useValue: config }
      ]
    };
  }
}
