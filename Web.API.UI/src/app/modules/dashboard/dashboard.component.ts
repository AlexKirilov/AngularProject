import { Component, OnInit, HostListener, ElementRef  } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  state = 'hide'
  constructor(public el: ElementRef) { }

  ngOnInit() {
  
  }

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      const componentPosition = this.el.nativeElement.offsetTop // + 45; // 45 height of the header
      const scrollPosition = window.pageYOffset

      if (scrollPosition >= componentPosition) {
        this.state = 'show'
      } else {
        this.state = 'hide'
      }

    }
}
