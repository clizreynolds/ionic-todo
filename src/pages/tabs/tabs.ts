import { Component } from '@angular/core';

import { CalDetailsPage } from './../calendar/cal-details/cal-details';
import { ListsPage } from '../lists/lists';
import { StepCounterPage } from './../step-counter/step-counter';

/**
 * Component used to setup the tabbed application
 * 
 * @export
 * @class TabsPage
 */
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = ListsPage;
    tab2Root = CalDetailsPage;
    tab3Root = StepCounterPage;

    /**
     * Creates an instance of TabsPage.
     * @memberof TabsPage
     */
    constructor() {
    }
}
