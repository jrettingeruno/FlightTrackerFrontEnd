import { Component, Inject, OnChanges, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-flight-generate-dialog',
  templateUrl: './flight-generate-dialog.component.html',
  styleUrls: ['./flight-generate-dialog.component.css']
})
export class FlightGenerateDialog {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FlightGenerateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    close(): void {
      this.dialogRef.close(this.data);
    }
}

