import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightGenerateDialog } from './flight-generate-dialog.component';

describe('CesiumTestComponent', () => {
  let component: FlightGenerateDialog;
  let fixture: ComponentFixture<FlightGenerateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightGenerateDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightGenerateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
