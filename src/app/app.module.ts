import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WithAutoSubscribeComponent } from './subs/with-autosubscribe.component';
import { WithoutAutoSubscribeComponent } from './subs/without-autosubscribe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortalModule } from '@angular/cdk/portal';
import { SubscribeGuardComponent } from './subs/subscribe-guard.component';

@NgModule({
  declarations: [
    AppComponent,
    WithoutAutoSubscribeComponent,
    WithAutoSubscribeComponent,
    SubscribeGuardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PortalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
