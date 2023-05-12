import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }

  public showSnackBar(msg: string): void {
    this.snackbar.open(msg, "X", {
      duration: 3000
    });
  }
}
