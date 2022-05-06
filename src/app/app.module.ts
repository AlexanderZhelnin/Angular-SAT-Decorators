import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WithAutoSubscribeComponent } from './subcribs/with-autosubscribe.component';
import { WithoutAutoSubscribeComponent } from './subcribs/without-autosubscribe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortalModule } from '@angular/cdk/portal';
import { SubscribeGuardComponent } from './subcribs/subscribe-guard.component';

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
