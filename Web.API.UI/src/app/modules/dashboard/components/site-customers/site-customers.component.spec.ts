import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCustomersComponent } from './site-customers.component';

describe('SiteCustomersComponent', () => {
  let component: SiteCustomersComponent;
  let fixture: ComponentFixture<SiteCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
