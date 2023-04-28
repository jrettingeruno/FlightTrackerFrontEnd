import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFlyZoneGenerateDialog as NoFlyZoneGenerateDialog } from './no-fly-zone-generate-dialog.component';

describe('NoFlyZoneGenerateDialogComponent', () => {
  let component: NoFlyZoneGenerateDialog;
  let fixture: ComponentFixture<NoFlyZoneGenerateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoFlyZoneGenerateDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoFlyZoneGenerateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
