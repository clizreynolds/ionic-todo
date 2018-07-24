import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { UUID } from 'angular2-uuid';

import { Colours } from '../shared/constants/colours';
import { List } from './../pages/lists/list.model';
import { ListService } from './../shared/services/list.service';
import { Splash } from '../pages/splash/splash';
import { TabsPage } from '../pages/tabs/tabs';

/**
 * The main app component that displays the splash screen and loads the list data
 *
 * @export
 * @class MyApp
 */
@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    /**
     * Set the root page to be tabbed
     * 
     * @type {*}
     * @memberof MyApp
     */
    rootPage: any = TabsPage;

    /**
     * Creates an instance of MyApp.
     * @param {Platform} platform 
     * @param {StatusBar} statusBar 
     * @param {SplashScreen} splashScreen 
     * @param {ModalController} modalCtrl 
     * @param {ListService} listService 
     * @param {Storage} storage 
     * @memberof MyApp
     */
    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        modalCtrl: ModalController,
        private listService: ListService,
        private storage: Storage,
    ) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
            statusBar.styleDefault();
            // Create a custom splash screen to display the animation
            const splash = modalCtrl.create(Splash);
            splash.present();
        });
        this.initApp();
    }

    /**
     * When the app is initialised populate the data from phones local storage, or dummy data
     * 
     * @memberof MyApp
     */
    initApp() {
        const coloursArr = Colours.getColoursAsArray;

        // If not running natively - setup dummy data
        const newList: List = {
            id: UUID.UUID(),
            title: 'List ',
            colour: coloursArr[Math.floor(Math.random() * coloursArr.length)].code,
            icon: 'list-box',
            items: [{ title: 'eat chocolate', done: false }, { title: 'drink tea', done: true }]
        };

        this.storage.get('ToDoTLists').then(storedItems => {
            // if there are stored items use those, else use dummy data
            const items = storedItems ? storedItems : [newList];
            // send request to update the lists
            this.listService.updateAllLists(items);
        });
    }
}
