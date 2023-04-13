import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CesiumTestComponent } from './cesium-test-page.component';

describe('CesiumTestComponent', () => {
  let component: CesiumTestComponent;
  let fixture: ComponentFixture<CesiumTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CesiumTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CesiumTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
