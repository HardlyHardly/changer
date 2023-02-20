import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorConfigService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  public errorConfig(error: string): void{
    this.snackBar.open(error, 'X', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['blue-snackbar']
    })
  }
  
}
