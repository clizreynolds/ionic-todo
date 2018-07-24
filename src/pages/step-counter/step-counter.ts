import { Component, ChangeDetectorRef } from '@angular/core';
import { Pedometer } from '@ionic-native/pedometer';
import { Platform } from 'ionic-angular';

/**
 * Page to display the step counter data and sprite
 * 
 * @export
 * @class StepCounterPage
 */
@Component({
    selector: 'step-counter',
    templateUrl: 'step-counter.html'
})
export class StepCounterPage {

    /**
     * Intial step count is 0
     * 
     * @memberof StepCounterPage
     */
    steps = 0;

    /**
     * Inital step goal
     * 
     * @type {number}
     * @memberof StepCounterPage
     */
    goal: number = 10000;

    /**
     * Percentage of the goal that has been met
     * 
     * @type {number}
     * @memberof StepCounterPage
     */
    percentage: number;

    /**
     * Static sprite image source
     * 
     * @memberof StepCounterPage
     */
    staticSprite = 'assets/imgs/static-cat-right.gif';

    /**
     * Running sprite image source
     * 
     * @memberof StepCounterPage
     */
    runningSprite = 'assets/imgs/running-cat-right.gif';

    /**
     * The sprite source that is currently being displayed, initialised as static
     * 
     * @memberof StepCounterPage
     */
    spriteSource = this.staticSprite;

    /**
     * The data object received from the pedometer
     * 
     * @type {*}
     * @memberof StepCounterPage
     */
    data: any;

    /**
     * Creates an instance of StepCounterPage. Starts listening for pedometer updates
     * @param {ChangeDetectorRef} ref 
     * @param {Platform} platform 
     * @param {Pedometer} pedometer 
     * @memberof StepCounterPage
     */
    constructor(private ref: ChangeDetectorRef,
        public platform: Platform,
        public pedometer: Pedometer) {
        this.pedometer.startPedometerUpdates()
            .subscribe((data) => {
                this.data = data;
                this.steps = data.numberOfSteps;
                this.setPercentage();
                this.ref.detectChanges();
 
                // on walk - trigger sprite walk
                this.triggerWalk();
            });

        this.goal = 10000;
        this.setPercentage();
    }

    /**
     * When walking is detected, trigger sprite change
     * 
     * @memberof StepCounterPage
     */
    triggerWalk() {
        this.spriteSource = this.runningSprite;
        setTimeout(() => {
            this.spriteSource = this.staticSprite;
        }, 3000);
    }

    /**
     * The current percentage of steps the user has taken to reach their goal
     * 
     * @memberof StepCounterPage
     */
    setPercentage() {
        this.percentage = (this.steps / this.goal) * 100;
    }
}
