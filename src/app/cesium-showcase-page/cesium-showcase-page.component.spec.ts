import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CesiumShowcaseComponent } from './cesium-showcase-page.component';

describe('CesiumTestComponent', () => {
  let component: CesiumShowcaseComponent;
  let fixture: ComponentFixture<CesiumShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CesiumShowcaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CesiumShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
