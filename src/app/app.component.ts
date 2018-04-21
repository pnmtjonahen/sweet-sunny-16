import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AboutPage} from '../pages/about/about';
import {TabsPage} from '../pages/tabs/tabs';


@Component({
    templateUrl: 'app.html'
})
export class SunnyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = TabsPage;
    pages: Array<{title: String, component: any}>;

    constructor(public menu: MenuController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.pages = [
            {title: 'Home', component: TabsPage},
            {title: 'About', component: AboutPage}
        ];

    }
    openPage(page): void {
        this.nav.setRoot(page.component);
        this.menu.close();
    }
}

