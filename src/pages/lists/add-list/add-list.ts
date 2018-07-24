import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ViewController } from 'ionic-angular';

import { Colours } from './../../../shared/constants/colours';
import { List } from './../list.model';
import { ListService } from './../../../shared/services/list.service';

/**
 * Page to add a new list, called from the lists component and displayed as a modal
 *
 * @export
 * @class AddListPage
 */
@Component({
    selector: 'page-add-list',
    templateUrl: 'add-list.html'
})
export class AddListPage {

    /**
     * Used to create colour picker in template
     *
     * @memberof AddListPage
     */
    colours = Colours.getColoursAsArray;

    /**
     * Form object to record new list
     *
     * @type {FormGroup}
     * @memberof AddListPage
     */
    newList: FormGroup;

    /**
     * Options object to pass to the dropdown colour picker component
     *
     * @memberof AddListPage
     */
    colourPickerOptions = { cssClass: 'colourPicker' };

    /**
     * Creates an instance of AddListPage, initialises the new list form.
     * @param {ViewController} viewCtrl
     * @param {FormBuilder} formBuilder
     * @param {ListService} listService
     * @memberof AddListPage
     */
    constructor(
        public viewCtrl: ViewController,
        public formBuilder: FormBuilder,
        public listService: ListService) {
        this.newList = this.formBuilder.group({
            title: ['', Validators.required],
            colour: ['', Validators.required],
        });
    }

    /**
     * Assigns the form attribute to a new list object, sends request to create new list and closes the modal
     *
     * @memberof AddListPage
     */
    saveList() {
        const nList = Object.assign({ icon: 'list-box', items: [] }, this.newList.value) as List;
        this.listService.createNewList(nList);
        this.viewCtrl.dismiss();
    }

    /**
     * Closes the view
     *
     * @memberof AddListPage
     */
    closeModal() {
        this.viewCtrl.dismiss();
    }
}

