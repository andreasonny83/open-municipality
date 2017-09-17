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

import { AuthGuard } from './auth-guard.service';
import { AuthService, AuthServiceConfig } from './auth.service';
import { FirebaseService } from './firebase.service';

import { environment } from 'environments/environment';

@NgModule({
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'open-municipality'),
  ],
  providers: [
    AngularFireAuth,
    AuthService,
    AuthGuard,
    FirebaseService,
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
