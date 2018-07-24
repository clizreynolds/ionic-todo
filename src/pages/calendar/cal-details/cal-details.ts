import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

/**
 * Page to display a simple calendar using a phones native calendar
 *
 * @export
 * @class CalDetailsPage
 */
@Component({
    selector: 'page-cal-details',
    templateUrl: 'cal-details.html',
})
export class CalDetailsPage {

    /**
     * Array of native calendar events
     *
     * @memberof CalDetailsPage
     */
    events = [];

    constructor(
        public navCtrl: NavController,
        private calendar: Calendar,
        private plt: Platform
    ) {

        // As this app is just tested using android
        if (this.plt.is('android')) {
            const start = new Date();
            const end = new Date();
            end.setDate(end.getDate() + 31);

            this.calendar.listEventsInRange(start, end).then(data => {
                this.events = data;
            });
        }
        // Test data to populate calendar when not running application natively
        // this.events = [{ title: 'Title', dtstart: Math.floor(Date.now()), dtend: Math.floor(Date.now()), eventLocation: 'loc', allDay: 0 },
        // { title: 'Title 2', dtstart: Math.floor(Date.now()), dtend: Math.floor(Date.now()), eventLocation: 'loc', allDay: 1 }];
    }

    /**
     * Takes a date in milliseconds and returns a JavaScript date object
     *
     * @param {number} msDate
     * @returns {Date}
     * @memberof CalDetailsPage
     */
    toDate(msDate: number): Date {
        return new Date(msDate);
    }

}
