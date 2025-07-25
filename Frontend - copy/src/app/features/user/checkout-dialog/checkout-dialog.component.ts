import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-checkout-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <div class="text-center p-6">
      <h2 class="text-xl font-semibold text-green-600">✅ Payment Successful!</h2>
      <p>Your invoice has been emailed to you.</p>
      <button mat-stroked-button color="primary" class="mt-4" (click)="close()">Close</button>
    </div>
  `
})
export class CheckoutDialogComponent {
  constructor(private dialogRef: MatDialogRef<CheckoutDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
