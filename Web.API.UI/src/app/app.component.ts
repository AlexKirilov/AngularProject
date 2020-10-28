import { Component, ViewEncapsulation } from '@angular/core';
import devtools from 'devtools-detect/index.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss',
    '../../node_modules/shepherd.js/dist/css/shepherd-theme-default.css'
  ]
})
export class AppComponent{

  constructor() {
    window.addEventListener('devtoolschange', e => {
      if (!devtools.open) {
        
        console.log(`You are trying to access not allowed area!!! 
        Because of that you will be relocate after: 10 seconds!`);

        let index = 10;
        const interval = setInterval(() => {
          --index;
          console.log(index);

          if (index === 0) {
            clearInterval(interval);
          }
        }, 1000);
      }
    });
  }
}
