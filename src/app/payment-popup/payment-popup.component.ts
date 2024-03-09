import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-payment-popup',
  templateUrl: './payment-popup.component.html',
  styleUrls: ['./payment-popup.component.css'],
})
export class PaymentPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PaymentPopupComponent>
  ) {}

  ngOnInit(): void {
    
  }
}
