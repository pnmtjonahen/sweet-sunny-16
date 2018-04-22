import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the NightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-night',
    templateUrl: 'night.html',
})
export class NightPage {
    iso: number = 0;
    aperture: number = 0;
    apertureValues = ["f2", "f2.8", "f4", "f5.6", "f8", "f11", "f16", "f22"];
    isoValues = ["100", "200", "400", "800", "1600", "3200"];

    nightShutterspeed = [
        ["6s  ", "15s ", "36s  ", "1m30s  ", "3m30s", "8m50s", "21m30s", "52m50s"],
        ["2.5s", "6s  ", "15s  ", "  36s  ", "1m30s", "3m30s", "8m50s", "21m30s"],
        ["1s  ", "2.5s", " 6s  ", "  15s  ", "36s", "1m30s", "3m30s", "8m50s"],
        ["1/2s", "1s  ", " 2.5s", "   6s  ", "15s", "36s", "1m30s", "3m30s"],
        ["1/4s", "1/2s", " 1s  ", "   2.5s", "6s", "15s", "36s", "1m30s"],
        ["1/8s", "1/4s", " 1/2s", "   1s  ", "2.5s", "6s", "15s", "36s"]
    ];

    shutter = this.nightShutterspeed[0][0];
    
    isoValue() {
        return this.isoValues[this.iso];
    }

    apertureValue() {
        return this.apertureValues[this.aperture];
    }
    recalcShutter() {
        this.shutter = this.nightShutterspeed[this.iso][this.aperture];
    }


}
