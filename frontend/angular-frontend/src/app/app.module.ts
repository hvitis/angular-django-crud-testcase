import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './signin/signin.component';

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
  declarations: [AppComponent, DashboardComponent, SigninComponent],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    AppRoutingModule
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
