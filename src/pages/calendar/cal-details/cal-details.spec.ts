import { async, TestBed } from '@angular/core/testing';
import { Calendar } from '@ionic-native/calendar';
import { IonicModule, Platform, NavController } from 'ionic-angular';
import { NavControllerMock, CalendarMock } from 'ionic-mocks';

import { CalDetailsPage } from './cal-details';
import { PlatformMock } from './../../../../test-config/mocks-ionic';

describe('CalDetailsPage Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalDetailsPage],
            imports: [
                IonicModule.forRoot(CalDetailsPage)
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: Calendar, useClass: CalendarMock },
                { provide: NavController, useClass: NavControllerMock}
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalDetailsPage);
        component = fixture.componentInstance;
    });

    it('should create without error', () => {
        // Assign
        // TODO
        // Setup platform mock

        // Act
        // Component created above

        // Assert
        expect(component).toBeTruthy();
    });

    it('should return a date object', () => {
        // Assign
        const msDate = 45678000;
        const dateObj = new Date(msDate);

        // Act/Assert
        expect(component.toDate(msDate)).toBe(dateObj);
    });

});
