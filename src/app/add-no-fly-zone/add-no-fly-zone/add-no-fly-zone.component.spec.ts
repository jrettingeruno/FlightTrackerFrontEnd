import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoFlyZoneComponent } from './add-no-fly-zone.component';

describe('AddNoFlyZoneComponent', () => {
  let component: AddNoFlyZoneComponent;
  let fixture: ComponentFixture<AddNoFlyZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNoFlyZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNoFlyZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
