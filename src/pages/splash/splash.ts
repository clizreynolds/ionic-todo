import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Custom splash screen to allow for animations
 * 
 * @export
 * @class Splash
 */
@Component({
    selector: 'page-splash',
    templateUrl: 'splash.html'
})
export class Splash {

    /**
     * Creates an instance of Splash.
     * @param {ViewController} viewCtrl 
     * @param {SplashScreen} splashScreen 
     * @memberof Splash
     */
    constructor(public viewCtrl: ViewController,
        public splashScreen: SplashScreen) {
    }

    /**
     * When the view renders, hide the original splash screen and show our custom view for 2 seconds
     * 
     * @memberof Splash
     */
    ionViewDidEnter() {
        this.splashScreen.hide();
        setTimeout(() => {
            this.viewCtrl.dismiss();
        }, 2000);
    }
}
