import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-no-fly-zone-generate-dialog',
  templateUrl: './no-fly-zone-generate-dialog.component.html',
  styleUrls: ['./no-fly-zone-generate-dialog.component.css']
})
export class NoFlyZoneGenerateDialog {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NoFlyZoneGenerateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    close(): void {
      this.dialogRef.close(this.data);
    }
}
