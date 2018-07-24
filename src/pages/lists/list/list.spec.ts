import { List } from './../list.model';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams, NavController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { NavParamsMock, NavControllerMock } from 'ionic-mocks';

import { ListPage } from './list';
import { ListService } from './../../../shared/services/list.service';
import { ListServiceMock } from './../../../../test-config/mocks-ionic';

describe('ListPage Component', () => {
    let fixture;
    let component;
    const TEST_ITEM_TITLE = 'TITLE',
        TEST_ITEM_ID = '1',
        mockSelectedList = {
        id: '2', 
        title: 'TEST_LIST', 
        items: [{title: 'i1'}, {title: 'i2'}], 
        colour: '',
        icon: ''
    } as List; 

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListPage],
            imports: [
                IonicModule.forRoot(ListPage)
            ],
            providers: [
                { provide: NavController, useClass: NavControllerMock },
                { provide: NavParams, useClass: NavParamsMock },
                { provide: ListService, useClass: ListServiceMock }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListPage);
        component = fixture.componentInstance;
    });

    it('should create without error', () => {
        // Assign
        // Act
        // Component created above

        // Assert
        expect(component).toBeTruthy();
        expect(component.selectedList).toBeDefined();
    });

    it('should update item done state', () => {
        // Assign
        const item = {id: TEST_ITEM_ID, title: TEST_ITEM_TITLE, done: false};
        const doneItem = {id: TEST_ITEM_ID, title: TEST_ITEM_TITLE, done: true};
        
        // Act
        component.checkItem(item);

        // Assert
        expect(ListServiceMock.updateList).toHaveBeenCalledWith(TEST_ITEM_ID, doneItem);
    });

    it('should save item edit when enter is pressed', () => {
        // Assign
        component.saveItem = jasmine.createSpy('saveItem');

        // Act
        component.onEditKey(13);

        // Assert
        expect(component.saveItem).toHaveBeenCalled();
    });

    it('should not save item edit when enter is not pressed', () => {
        // Assign
        component.saveItem = jasmine.createSpy('saveItem');

        // Act
        component.onEditKey(15);

        // Assert
        expect(component.saveItem).not.toHaveBeenCalled();
    });

    it('should save new item when enter is pressed', () => {
        // Assign
        component.onNewItemKey = jasmine.createSpy('saveItem');
        component.selectedList = mockSelectedList;
        component.newItem = {title: TEST_ITEM_TITLE};
        const mockFab = jasmine.createSpyObj('mockFab', ['close']);

        // Act
        component.onEditKey(13, mockFab);

        // Assert
        expect(ListServiceMock.addNewItemToList).toHaveBeenCalledWith(mockSelectedList.id, mockSelectedList);
        expect(mockFab.close).toHaveBeenCalled();
        expect(component.newItem).toBeNull();
    });

    it('should not save new item when enter is not pressed', () => {
        // Assign
        component.onNewItemKey = jasmine.createSpy('saveItem');
        component.selectedList = mockSelectedList;
        component.newItem = {title: TEST_ITEM_TITLE};
        const mockFab = jasmine.createSpyObj('mockFab', ['close']);

        // Act
        component.onEditKey(15, mockFab);

        // Assert
        expect(ListServiceMock.addNewItemToList).not.toHaveBeenCalled();
        expect(mockFab.close).not.toHaveBeenCalled();
        expect(component.newItem).toBeDefined();
    });
});
