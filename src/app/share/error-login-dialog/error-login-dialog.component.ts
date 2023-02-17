import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-login-dialog',
  templateUrl: './error-login-dialog.component.html',
  styleUrls: ['./error-login-dialog.component.scss']
})
export class ErrorLoginDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public errorText: string,
    private dialog: MatDialog
  ){}

  closeDialogs(): void{
    this.dialog.closeAll();
  }
}
