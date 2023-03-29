import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllipsoidNoFlyZoneComponent } from './ellipsoid-no-fly-zone.component';

describe('EllipsoidNoFlyZoneComponent', () => {
  let component: EllipsoidNoFlyZoneComponent;
  let fixture: ComponentFixture<EllipsoidNoFlyZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EllipsoidNoFlyZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EllipsoidNoFlyZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
