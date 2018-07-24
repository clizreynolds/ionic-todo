import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { NgModule, ErrorHandler } from '@angular/core';
import { Pedometer } from '@ionic-native/pedometer';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';

import { AddListPage } from './../pages/lists/add-list/add-list';
import { Calendar } from '@ionic-native/calendar';
import { CalDetailsPage } from './../pages/calendar/cal-details/cal-details';
import { ListPage } from './../pages/lists/list/list';
import { ListsPage } from '../pages/lists/lists';
import { MyApp } from './app.component';
import { SharedModule } from './../shared/shared.module';
import { StepCounterPage } from './../pages/step-counter/step-counter';
import { Splash } from './../pages/splash/splash';
import { TabsPage } from '../pages/tabs/tabs';


@NgModule({
    declarations: [
        MyApp,
        ListsPage,
        TabsPage,
        AddListPage,
        ListPage,
        CalDetailsPage,
        StepCounterPage,
        Splash
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        SharedModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ListsPage,
        TabsPage,
        AddListPage,
        ListPage,
        CalDetailsPage,
        StepCounterPage,
        Splash
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        SQLite,
        Calendar,
        Pedometer
    ]
})
export class AppModule { }
