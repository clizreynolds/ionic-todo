import { async, TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageMock } from 'ionic-mocks';
import { Subject } from 'rxjs/Subject';
import { UUID } from 'angular2-uuid';

import { List } from './../../pages/lists/list.model';
import { ListService } from './list.service';


describe('ListService', () => {
    const mockList = { id: '1', done: true, title: 'TestList', colour: 'l-purple', icon: '', items: [] } as List;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Storage, useClass: StorageMock }
            ]
        });
    });

    it('should create new list', async(inject([ListService], (service: ListService) => {
        // Assign
        service.lists = [];
        service.updateStorage = jasmine.createSpy('updateStorage');

        // Act
        service.createNewList(this.mockList);

        // Assert
        expect(service.updateStorage).toHaveBeenCalled();
        expect(service.lists).toBe([this.mockList]);
    })));

    it('should update all lists', async(inject([ListService], (service: ListService) => {
        // Assign
        service.lists = [];
        service.updateStorage = jasmine.createSpy('updateStorage');

        // Act
        service.updateAllLists([this.mockList]);

        // Assert
        expect(service.updateStorage).toHaveBeenCalled();
        expect(service.lists).toBe([this.mockList]);
    })));


    it('should update a single list', async(inject([ListService], (service: ListService) => {
        // Assign
        const newList = { id: '1', done: false, title: 'TestList', colour: 'l-purple', icon: '' } as List;
        const oldList = { id: '1', done: true, title: 'TestList', colour: 'l-purple', icon: '' } as List;

        service.lists = [oldList];
        service.updateStorage = jasmine.createSpy('updateStorage');

        // Act
        service.updateList('1', newList);

        // Assert
        expect(service.updateStorage).toHaveBeenCalled();
        expect(service.lists).toBe([newList]);
    })));

    it('should return lists', async(inject([ListService], (service: ListService) => {
        // Assign
        service.lists = [this.mockList];

        // Act Assert
        expect(service.getLists()).toBe([this.mockList]);
    })));


    it('should delete a list', async(inject([ListService], (service: ListService) => {
        // Assign
        service.lists = [this.mockList];
        service.updateStorage = jasmine.createSpy('updateStorage');
        const removedList = { id: '1', done: true, title: 'TestList', colour: 'l-purple', icon: '', removed: true } as List;

        // Act 
        service.deleteList('1');

        // Assert
        expect(service.lists).toBe([removedList]);
        expect(service.updateStorage).toHaveBeenCalled();
    })));

    it('should add a new item to a list', async(inject([ListService], (service: ListService) => {
        // Assign
        service.lists = [this.mockList];
        service.updateStorage = jasmine.createSpy('updateStorage');
        const updatedList = { id: '1', done: true, title: 'TestList', colour: 'l-purple', icon: '', items: [{ title: 'TEST TODO', done: false }] } as List;

        // Act 
        service.addNewItemToList('1', 'TEST TODO');

        // Assert
        expect(service.lists).toBe([updatedList]);
        expect(service.updateStorage).toHaveBeenCalled();
    })));

    it('should remove an item from a list', async(inject([ListService], (service: ListService) => {
        // Assign
        const listWithItem = { id: '1', done: true, title: 'TestList', colour: 'l-purple', icon: '', items: [{ title: 'TEST TODO', done: false }] } as List;
        const listWithoutItem = { id: '1', done: true, title: 'TestList', colour: 'l-purple', icon: '', items: [] } as List;
        service.lists = [listWithItem];
        service.updateStorage = jasmine.createSpy('updateStorage');

        // Act 
        service.removeItemFromList('1', 0);

        // Assert
        expect(service.lists).toBe([listWithoutItem]);
        expect(service.updateStorage).toHaveBeenCalled();
    })));
});