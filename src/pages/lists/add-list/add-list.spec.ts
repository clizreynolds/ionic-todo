import { async, TestBed } from '@angular/core/testing';
import { IonicModule, ViewController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { ModalControllerMock, StorageMock, NavParamsMock, ViewControllerMock } from 'ionic-mocks';

import { AddListPage } from './add-list';
import { ListService } from './../../../shared/services/list.service';
import { ListServiceMock } from './../../../../test-config/mocks-ionic';

describe('AddListPage Component', () => {
    let fixture;
    let component;
    const TEST_TITLE = 'TITLE',
        TEST_COLOUR = 'COLOUR';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddListPage],
            imports: [
                IonicModule.forRoot(AddListPage)
            ],
            providers: [
                { provide: ViewController, useClass: ViewControllerMock },
                { provide: ListService, useClass: ListServiceMock },
                { provide: FormBuilder, useClass: FormBuilder }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddListPage);
        component = fixture.componentInstance;
    });

    it('should create without error', () => {
        // Assign
        // Act
        // Component created above

        // Assert
        expect(component).toBeTruthy();
        expect(component.newList).toBeDefined();
    });

    it('should save the new list with correct values', () => {
        // Assign
        const newList = {title: TEST_TITLE, colour: TEST_COLOUR, icon: 'list-box', items: []};
        component.newList = {value: {title: TEST_TITLE, colour: TEST_COLOUR}};

        // Act
        component.saveList();

        // Assert
        expect(ListServiceMock.createNewList).toHaveBeenCalledWith(newList);
    });

});
