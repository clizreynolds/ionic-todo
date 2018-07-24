import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { AddListPage } from './add-list/add-list';
import { List } from './list.model';
import { ListPage } from './list/list';
import { ListService } from './../../shared/services/list.service';

/**
 * The tabbed page to view all the lists, add a new list, delete a list and reorder lists
 * 
 * @export
 * @class ListsPage
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
    selector: 'page-lists',
    templateUrl: 'lists.html',
    animations: [
        trigger('listVisibility', [
            state('visible', style({
                opacity: 1
            })),
            state('invisible', style({
                opacity: 0
            })),
            transition(':enter', animate('1.5s', style({ opacity: 1 })))
        ])
    ]
})

export class ListsPage implements OnInit, AfterViewInit {

    /**
     * The array of lists to be displayed
     * 
     * @type {List[]}
     * @memberof ListsPage
     */
    lists: List[];

    /**
     * The initial visibility state of the lists
     * 
     * @memberof ListsPage
     */
    visibleState = 'invisible';

    /**
     * Creates an instance of ListsPage.
     * @param {NavController} navCtrl 
     * @param {NavParams} navParams 
     * @param {ModalController} modalCtrl 
     * @param {ListService} listService 
     * @param {ToastController} toaster 
     * @memberof ListsPage
     */
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public listService: ListService,
        public toaster: ToastController) {
    }

    /**
     * When component initialises, retrieve list data and setup toast message listener
     * 
     * @memberof ListsPage
     */
    ngOnInit() {
        this.lists = this.listService.getLists();
        this.listService.listsStream$.subscribe(res => {
            this.lists = res.lists;
            if (res.message) {
                const toastMes = this.toaster.create({
                    message: res.message,
                    position: 'bottom',
                    duration: 1000,
                    cssClass: 'custom-toast'
                });
                toastMes.present();
            }
        });
    }

    /**
     * When the view has initialised, set visibility to true to trigger animation
     * 
     * @memberof ListsPage
     */
    ngAfterViewInit() {
        this.visibleState = 'visible';
    }

    /**
     * Navigates to the individual list page
     * 
     * @param {any} event 
     * @param {any} item 
     * @memberof ListsPage
     */
    itemTapped(event, item) {
        // navigate to list page
        this.navCtrl.push(ListPage, {
            item: item
        });
    }

    /**
     * Displays the add new list modal
     * 
     * @memberof ListsPage
     */
    addButtonTapped() {
        const modal = this.modalCtrl.create(AddListPage);
        modal.present();
    }

    /**
     * Fired when the list is reordered, sends request to list service to save the new order
     * 
     * @param {any} indexes 
     * @memberof ListsPage
     */
    reorderlists(indexes) {
        const element = this.lists[indexes.from];
        this.lists.splice(indexes.from, 1);
        this.lists.splice(indexes.to, 0, element);
        this.listService.updateAllLists(this.lists);
    }

    /**
     * Sends request to list service to delete a list
     * 
     * @param {any} id 
     * @memberof ListsPage
     */
    removeList(id) {
        this.listService.deleteList(id);
    }

    /**
     * Returns true when all lists of a list are marked as done
     * 
     * @param {Object[]} lists 
     * @returns {boolean}
     * @memberof ListsPage
     */
    allDone(lists: Object[]): boolean {
        return lists.length > 0 && lists.every(item => item['done']);
    }
}
