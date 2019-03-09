import { Injectable } from '@angular/core';
import { tourI, requiredElI } from '../../services/ui-tour.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardTourData {
    TourSteps: Array<tourI> = [
        {
            id: 'tempPos',
            selection: '.templatePositionChangeTour',
            position: 'bottom',
            stepPos: 'start',
            title: 'Template Position Change',
            text: 'It change the possition of the controller on the screen!',
            tourClasses: ''
        },
        {
            id: 'print-export',
            selection: '#printExportTour',
            position: 'bottom',
            stepPos: 'mid',
            title: 'Print / Export',
            text: 'With this button you can print or export the portfolio data!',
            tourClasses: ''
        },
        {
            id: 'clients-list',
            selection: '.clients-list',
            position: 'left',
            stepPos: 'end',
            title: 'Client List',
            text: 'From here you select one or more clients to load the portfolio!',
            tourClasses: 'moveToRight'
        },
    ];

    TourRequirements: Array<requiredElI> = [
        {
            selector: '.templatePositionChangeTour',
            message: 'No search results found. Please execute another search, and try to start the tour again.',
            title: 'No results'
        },
        // {
        //     selector: '.username-element',
        //     message: 'User not logged in, please log in to start this tour.',
        //     title: 'Please login'
        // },
    ];

    onShow(selection: string) {
        switch (selection) {
            case '.clients-list':
                document.querySelector('.moveToRight').parentElement.parentElement.style.left = '420px';
                break;
        }
    }
}
