import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SunnyApp } from './app.component';
import { AboutPage} from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { NightPage } from '../pages/night/night';
import { DayPage } from '../pages/day/day';

@NgModule({
  declarations: [
    SunnyApp,
    DayPage,
    AboutPage,
    TabsPage,
    NightPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(SunnyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SunnyApp,
    DayPage,
    AboutPage,
    TabsPage,
    NightPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
