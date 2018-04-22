import {Component} from '@angular/core';
import {ToastController} from 'ionic-angular';

@Component({
    selector: 'page-day',
    templateUrl: 'day.html'
})
export class DayPage {
    iso: number = 4;
    weather: number = 4;
    currentShutter: number = 9;
    shutter: number = 9;
    currentAperture: number = 7;
    aperture: number = 7;
    weatherValues = ["open shade / sunset, no shadows", "heavy overcast, no shadows", "overcast, shadows barely visible", "sunny, shadows with soft edges", "bright sun, distinct shadows"];
    apertureValues = ["f1.4", "f1.7", "f2.8", "f4", "f5.6", "f8", "f11", "f16", "f22"];
    shutterValues = ["1s", "2s", "1/4s", "1/8s", "1/15s", "1/30s", "1/60s", "1/125s", "1/250s", "1/500s", "1/1000s", "1/2000s", "1/4000s"];
    isoValues = ["25", "50", "100", "200", "400", "800", "1600", "3200"];
    priority: string = "N";

    sunnySisxteenShutterSpeed = [
        // 25, 50, 100, 200, 400, 800, 1600, 3200
        [12, -1, -1, -1, -1, -1, -1, -1],
        [11, 12, -1, -1, -1, -1, -1, -1],
        [10, 11, 12, -1, -1, -1, -1, -1],
        [9, 10, 11, 12, -1, -1, -1, -1],
        [8, 9, 10, 11, 12, -1, -1, -1],
        [7, 8, 9, 10, 11, 12, -1, -1],
        [6, 7, 8, 9, 10, 11, 12, -1],
        [5, 6, 7, 8, 9, 10, 11, 12],
        [4, 5, 6, 7, 8, 9, 10, 11],
        [3, 4, 5, 6, 7, 8, 9, 10],
        [2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8],
        [0, 1, 2, 3, 4, 5, 6, 7]
    ];

    constructor(private toastCtrl: ToastController) {
    }

    isoValue() {
        return this.isoValues[this.iso];
    }

    weatherValue() {
        return this.weatherValues[this.weather];
    }

    shutterValue() {
        return this.shutterValues[this.shutter];
    }

    apertureValue() {
        return this.apertureValues[this.aperture];
    }

    recalcIso() {
        // iso change reset all values.
        this.aperture = 7;
        this.shutter = this.sunnySisxteenShutterSpeed[7][this.iso];
        this.weather = 4;
        this.priority = "N";
        this.updateCurrentValues();
    }
    recalcWeather() {
        switch (this.priority) {
            case "S":
                this.recalcShutter();
                break;
            case "A":
                this.recalcAperture();
                break;
            default:
            case "N":
                this.aperture = 7 - this.weatherAdjustment();
                this.shutter = this.sunnySisxteenShutterSpeed[7][this.iso];
                this.updateCurrentValues();
                break;

        }
    }
    recalcShutter() {
        for (var i = 0; i < this.sunnySisxteenShutterSpeed.length; i++) {
            if (this.sunnySisxteenShutterSpeed[i][this.iso] === this.shutter && (i - this.weatherAdjustment()) <= 8) {
                // aperture is now in sunny 16 rule, adjust for weather condition
                // shutter priority
                this.priority = "S";
                this.aperture = i - this.weatherAdjustment();
                this.updateCurrentValues();
                return;
            }
        }
        this.setMessage("No valid aperture found for " + this.shutterValues[this.shutter]);
        this.revertCurrentValues();
    }
    recalcAperture() {
        // aperture is already adjusted to weather conditions realign to get correct shutterspeed
        const newShutter = this.sunnySisxteenShutterSpeed[this.aperture + this.weatherAdjustment()][this.iso];
        if (newShutter < 0) {
            this.setMessage("No valid shutter speed found for " + this.apertureValues[(this.aperture + this.weatherAdjustment())]);
            this.revertCurrentValues();
            return;
        }
        this.priority = "A";
        this.shutter = newShutter;
        this.updateCurrentValues();
    }

    updateCurrentValues() {
        this.currentShutter = this.shutter;
        this.currentAperture = this.aperture;
    }

    revertCurrentValues() {
        this.shutter = this.currentShutter;
        this.aperture = this.currentAperture;
    }

    weatherAdjustment() {
        return ((this.weatherValues.length - 1) - this.weather);
    }

    setMessage(msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 1500,
            position: 'top'
        });
        toast.present();
    }

}
