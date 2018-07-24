import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Storage } from '@ionic/storage';
import { UUID } from 'angular2-uuid';

import { List } from './../../pages/lists/list.model';

/**
 * List service to create, delete, update lists
 * 
 * @export
 * @class ListService
 */
@Injectable()

export class ListService {

    /**
     * Subject list that emits events after updates
     * 
     * @private
     * @memberof ListService
     */
    private listsResult = new Subject<{ message?: string, lists: Array<List> }>();

    /**
     * Array of lists
     * 
     * @type {Array<List>}
     * @memberof ListService
     */
    lists: Array<List>;


    /**
     * Publically available observable wrapper around the listsResult subject object
     * 
     * @memberof ListService
     */
    listsStream$ = this.listsResult.asObservable();

    /**
     * Creates an instance of ListService.
     * @param {Storage} storage 
     * @memberof ListService
     */
    constructor(private storage: Storage) { }

    /**
     * Create a new list
     * 
     * @param {List} newList 
     * @memberof ListService
     */
    createNewList(newList: List) {
        newList.id = UUID.UUID();
        this.lists.push(newList);
        this.listsResult.next({ message: 'New list created', lists: this.lists });
        this.updateStorage();
    }

    /**
     * Update all lists
     * 
     * @param {List[]} allLists 
     * @memberof ListService
     */
    updateAllLists(allLists: List[]) {
        this.lists = allLists;
        this.listsResult.next({ message: 'All lists updated', lists: allLists });
        this.updateStorage();
    }

    /**
     * Update a list
     * 
     * @param {string} listId 
     * @param {List} newList 
     * @memberof ListService
     */
    updateList(listId: string, newList: List) {
        const i = this.lists.indexOf(this.lists.find(list => list.id === listId));
        this.lists[i] = newList;
        this.listsResult.next({ message: 'List updated', lists: this.lists });
        this.updateStorage();
    }

    /**
     * Returns a non observable array of lists
     * 
     * @returns {List[]} 
     * @memberof ListService
     */
    getLists(): List[] {
        return this.lists;
    }

    /**
     * Delete a list
     * 
     * @param {string} listId 
     * @memberof ListService
     */
    deleteList(listId: string) {
        const i = this.lists.indexOf(this.lists.find(list => list.id === listId));
        this.lists[i].removed = true;
        this.listsResult.next({ message: 'List deleted', lists: this.lists });
        this.updateStorage();
        // update storage 1 second later to allow animation to occur
        setTimeout(() => {
            this.lists.splice(i, 1);
            this.listsResult.next({ lists: this.lists });
            this.updateStorage();
        }, 1000);
    }

    /**
     * Add a new item to a list
     * 
     * @param {string} listId 
     * @param {string} newItem 
     * @memberof ListService
     */
    addNewItemToList(listId: string, newItem: string) {
        const i = this.lists.indexOf(this.lists.find(list => list.id === listId));
        this.lists[i].items.push({ title: newItem, done: false });
        this.listsResult.next({ message: 'Added new ToDo', lists: this.lists });
        this.updateStorage();
    }

    /**
     * Remove an item from a list
     * 
     * @param {string} listId 
     * @param {number} itemIndex 
     * @memberof ListService
     */
    removeItemFromList(listId: string, itemIndex: number) {
        const i = this.lists.indexOf(this.lists.find(list => list.id === listId));
        this.lists[i].items.splice(itemIndex, 1);
        this.listsResult.next({ message: 'Removed ToDo', lists: this.lists });
        this.updateStorage();
    }

    /**
     * Commonly used method to update native storage
     * 
     * @memberof ListService
     */
    updateStorage() {
        this.storage.set('ToDoTLists', this.lists);
    }
}
