import {Component} from '@angular/core';

import {DayPage} from '../day/day';
import {NightPage} from '../night/night';

@Component({
    templateUrl: 'tabs.html',
})
export class TabsPage {
    dayRoot = DayPage;
    nightRoot = NightPage;

    constructor() {}


}
