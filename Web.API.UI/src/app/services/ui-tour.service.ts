import { ShepherdService } from 'angular-shepherd';
import { Injectable } from '@angular/core';
import { DatashareService } from './datashare.service';


/* To use the service it requires the following steps:
    1. install the library -> npm i angular-shepherd
    1.1 Check the API Documentation here: https://www.npmjs.com/package/angular-shepherd

    2. Add the style to each page where the tour will be called, like this:

    styleUrls: [
        './my-css.component.scss',
        '../../../../node_modules/shepherd.js/dist/css/shepherd-theme-dark.css'
    ]

    2.1 Choose between those css options:
        // classes: 'shepherd-theme-dark.css',
        // classes: 'shepherd-theme-default.css',
        // classes: 'shepherd-theme-square-dark.css',
        // classes: 'shepherd-theme-square.css'

    3. To create tour use the exported Interfaceses and class for correct structure (tourI and requiredElI)

        import { UITourService, tourI, requiredElI } from 'src/app/services/ui-tour.service';

    4. use the examples to create and start the tour:

        4.1 Create steps:

            const TourSteps: Array<tourI> = [
                {
                    id: 'tempPos',
                    selection: '.templatePositionChangeTour',
                    position: 'bottom',
                    stepPos: 'start',
                    title: 'Template Position Change',
                    text: 'It change the possition of the controller on the screen!',
                    tourClasses: '' / -> This property is not required
                }
            ];

        4.2 Create requrments: (they are not required):

            const TourRequirements: Array<requiredElI> = [
                {
                    selector: '.templatePositionChangeTour', // -> if not existi show the message below
                    message: 'No search results found. Please execute another search, and try to start the tour again.',
                    title: 'No results'
                },
            ];

        4.3 To Trigger full tour throw all pages add 'full-tour' class to the body
*/


// tslint:disable-next-line:class-name
export class tourI {
    id: string;
    selection: string | 'class' | 'id';
    position: 'top' | 'right' | 'bottom' | 'left';
    stepPos: 'start' | 'mid' | 'end';
    title = 'some title';
    text = 'some description';
    tourClasses = 'custom-class-name-1 custom-class-name-2';
}

// tslint:disable-next-line:class-name
export class requiredElI {
    title: string;
    message: string;
    selector: string;
    selectorType?: 'id' | 'class';
}


@Injectable({
    providedIn: 'root'
})
export class UITourService {

    private defaultSteps: Array<any> = [];
    private isTourStarted = false;

    constructor(
        private shepherdService: ShepherdService,
        private datashare: DatashareService
    ) { }

    public startTour(steps: Array<tourI>, requirments: Array<requiredElI> = [], callback = null) {
        if (steps && !this.isTourStarted) {
            // create the Steps and set the data
            this.defaultSteps = [];
            steps.forEach((stepData: tourI) => {
                this.defaultSteps.push(
                    this.stepData(
                        stepData.id,
                        stepData.selection,
                        stepData.position,
                        stepData.stepPos,
                        stepData.title,
                        stepData.text,
                        stepData.tourClasses,
                        (selection: any) => { if (callback) { callback(selection); } }
                    )
                );
            });

            this.shepherdService.disableScroll = true;
            this.shepherdService.modal = true;
            this.shepherdService.confirmCancel = false;
            // Set a requirments to the page
            // If specific element is missing the tour will not be triggered and to be display an information message about the reasons
            this.shepherdService.requiredElements = requirments;
            this.shepherdService.addSteps(this.defaultSteps);

            this.isTourStarted = true;
            this.shepherdService.start();
        }
    }

    stepData(
        id: string = '',
        selection: string | 'class' | 'id',
        position: 'top' | 'right' | 'bottom' | 'left',
        stepPos: 'start' | 'mid' | 'end',
        title: string = 'some title',
        text: string = 'some description',
        tourClasses: string = 'custom-class-name-1 custom-class-name-2',
        callback = null
    ) {

        const tmp = {
            id: `tour-${id}`,
            options: {
                attachTo: `${selection} ${position}`,
                beforeShowPromise: () => {
                    return new Promise((resolve) => {
                        setTimeout(function () {
                            window.scrollTo(0, 0);
                            resolve();
                        }, 500);
                    });
                },
                buttons: [],
                classes: `${tourClasses}`,
                highlightClass: 'highlight',
                scrollTo: true,
                showCancelLink: true,
                title: `${title}`,
                text: [`${text}`],
                when: {
                    show: () => {
                        // console.warn('show step', selection);
                        const clearMe = setTimeout(function () {
                            clearTimeout(clearMe);
                            if (callback) { callback(selection); }
                        }, 20);
                    },
                    hide: () => {
                        // console.warn('hide step');
                    },
                    complete: () => {
                        // console.warn('Tour complate');
                        this.isTourStarted = false;
                    },
                    cancel: () => {
                        // console.warn('Tour Canceled');
                        this.isTourStarted = false;
                    },
                    destroy: () => {
                        // TODO: Add statement when the user is logged in for first time
                        if (this.isTourStarted && document.body.classList.contains('full-tour')) {
                            this.datashare.changeTourPage();
                        }
                        this.isTourStarted = false;
                    }
                }
            }
        };

        switch (stepPos) {
            case 'start':
                tmp.options.buttons = [
                    {
                        classes: 'shepherd-button-secondary',
                        text: 'Exit',
                        type: 'cancel'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Next',
                        type: 'next'
                    }
                ];
                break;
            case 'mid':
                tmp.options.buttons = [
                    {
                        classes: 'shepherd-button-secondary',
                        text: 'Exit',
                        type: 'cancel'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Back',
                        type: 'back'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Next',
                        type: 'next'
                    }
                ];
                break;
            case 'end': tmp.options.buttons = [
                {
                    classes: 'shepherd-button-primary',
                    text: 'Back',
                    type: 'back'
                },
                {
                    classes: 'shepherd-button-secondary',
                    text: 'End',
                    type: 'cancel'
                }
            ];
                break;
            default:
                tmp.options.buttons = [
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Next',
                        type: 'next'
                    }
                ];
                break;
        }
        return tmp;
    }
}
