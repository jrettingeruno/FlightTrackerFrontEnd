import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFlyZoneSubmittedComponent } from './no-fly-zone-submitted.component';

describe('NoFlyZoneSubmittedComponent', () => {
  let component: NoFlyZoneSubmittedComponent;
  let fixture: ComponentFixture<NoFlyZoneSubmittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoFlyZoneSubmittedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoFlyZoneSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
