import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from 'environments/environment';

// import { AuthGuard } from './shared/auth-guard.service';
import { AuthService } from './shared/auth.service';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'open-municipality'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
  ],
  providers: [
    AngularFireAuth,
    AuthService,
    // AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
