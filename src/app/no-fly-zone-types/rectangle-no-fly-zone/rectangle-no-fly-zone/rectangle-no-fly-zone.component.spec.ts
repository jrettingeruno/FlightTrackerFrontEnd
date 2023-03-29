import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleNoFlyZoneComponent } from './rectangle-no-fly-zone.component';

describe('RectangleNoFlyZoneComponent', () => {
  let component: RectangleNoFlyZoneComponent;
  let fixture: ComponentFixture<RectangleNoFlyZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectangleNoFlyZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RectangleNoFlyZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
