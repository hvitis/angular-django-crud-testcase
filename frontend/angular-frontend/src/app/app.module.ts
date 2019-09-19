import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './signin/signin.component';
import { UserEditComponent } from './dashboard/user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';
import { AngularIbanModule } from 'angular-iban';

// Using 3rd party npm package for frontEnd OAuth
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      '256846098397-b4nb3bdkodne82v08q2u0da873e1gh3g.apps.googleusercontent.com'
    )
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SigninComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularIbanModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
