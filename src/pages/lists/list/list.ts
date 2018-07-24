import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { List } from './../list.model';
import { ListService } from './../../../shared/services/list.service';

/**
 * Page to display a single list of todo items
 * 
 * @export
 * @class ListPage
 */
@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {

    /**
     * The current list that we are viewing
     * 
     * @type {List}
     * @memberof ListPage
     */
    selectedList: List;

    /**
     * Temporary variable to hold a new list item
     * 
     * @type {string}
     * @memberof ListPage
     */
    newItem: string;

    /**
     * Creates an instance of ListPage.
     * @param {NavController} navCtrl 
     * @param {NavParams} navParams 
     * @param {ListService} listService 
     * @memberof ListPage
     */
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public listService: ListService
    ) {
        // selected item (list) that we are viewing
        this.selectedList = navParams.get('item');
    }

    /**
     * When the items checkbox is tapped, set or unset the done attribute
     * 
     * @param {any} item 
     * @memberof ListPage
     */
    checkItem(item) {
        item.done = !item.done;
        this.listService.updateList(this.selectedList.id, this.selectedList);
    }

    /**
     * Fired when the items are reordered, sends request to list service to save the new order
     * 
     * @param {any} indexes 
     * @memberof ListPage
     */
    reorderItems(indexes) {
        const element = this.selectedList.items[indexes.from];
        this.selectedList.items.splice(indexes.from, 1);
        this.selectedList.items.splice(indexes.to, 0, element);
        this.listService.updateList(this.selectedList.id, this.selectedList);
    }

    /**
     * When the enter key is pressed whilst entering a new list item, save the item and close the fab container
     * 
     * @param {number} keyCode 
     * @param {any} fab 
     * @memberof ListPage
     */
    onNewItemKey(keyCode: number, fab) {
        if (keyCode === 13) {
            this.listService.addNewItemToList(this.selectedList.id, this.newItem);
            this.newItem = null;
            fab.close();
        }
    }

    /**
     * If the enter key is pressed then save the list item
     * 
     * @param {number} keyCode 
     * @memberof ListPage
     */
    onEditKey(keyCode: number) {
        if (keyCode === 13) {
            this.saveItem();
        }
    }

    /**
     * Sends a request to remove an item from the list
     * 
     * @param {number} ind 
     * @memberof ListPage
     */
    removeItem(ind: number) {
        this.listService.removeItemFromList(this.selectedList.id, ind);
    }

    /**
     * Sends a request to update the list
     * 
     * @memberof ListPage
     */
    saveItem() {
        this.listService.updateList(this.selectedList.id, this.selectedList);
    }
}
