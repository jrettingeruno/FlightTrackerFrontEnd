import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPolygonNoFlyZoneComponent } from './custom-polygon-no-fly-zone.component';

describe('CustomPolygonNoFlyZoneComponent', () => {
  let component: CustomPolygonNoFlyZoneComponent;
  let fixture: ComponentFixture<CustomPolygonNoFlyZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPolygonNoFlyZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPolygonNoFlyZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
