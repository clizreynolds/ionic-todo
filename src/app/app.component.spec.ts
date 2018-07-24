import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform, ModalController } from 'ionic-angular';
import { ModalControllerMock, StorageMock } from 'ionic-mocks';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { ListService } from './../shared/services/list.service';
import { ListServiceMock } from './../../test-config/mocks-ionic';
import { PlatformMock, StatusBarMock, SplashScreenMock } from '../../test-config/mocks-ionic';

describe('MyApp Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp],
            imports: [
                IonicModule.forRoot(MyApp)
            ],
            providers: [
                { provide: StatusBar, useClass: StatusBarMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: Platform, useClass: PlatformMock },
                { provide: ModalController, useClass: ModalControllerMock },
                { provide: ListService, useClass: ListServiceMock },
                { provide: Storage, useClass: StorageMock }
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyApp);
        component = fixture.componentInstance;
    });

    it('should create without error', () => {
        // Assign
        spyOn(component, 'initApp');
        
        // TODO
        // setup storage mock and platfom mock 

        // Act
        // component created above

        // Assert
        expect(component instanceof MyApp).toBe(true);
        expect(component.initApp).toHaveBeenCalled();
        expect(ListServiceMock.updateAllLists).toHaveBeenCalled();
    });

});