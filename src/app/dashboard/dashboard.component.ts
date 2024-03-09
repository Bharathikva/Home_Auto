import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PaymentPopupComponent } from '../payment-popup/payment-popup.component';
import { ApiService } from '../service/api.service';
import { Constants } from 'src/constants/app.constants';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  selectedRoom: string = '';
  selectedType: string = '';
  selectedPlan: string = '';
  plans: any[] = [];
  sizes: any[] = [];
  areas: any[] = [];
  userForm!: FormGroup;
  subscription!: Subscription;
  counter: number = 0;
  planDetails: any;
  total!: number;
  subTotal!: number;

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(Constants.EMAIL_PATTERN),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{6,12}$/),
          Constants.phoneNumberValidator(),
        ],
      ],
      address: ['', [Validators.required]],
    });

    this.api.housePlans().subscribe((data) => {
      console.log(data, 'plans');
      this.plans = data.data;
    });

    this.api.houseSize().subscribe((data) => {
      console.log(data, 'sizes');
      this.sizes = data.data;
    });

    this.api.Area().subscribe((data) => {
      console.log(data, 'sizes');
      this.areas = data.data;
    });

    this.subscription = interval(1000).subscribe(() => {
      // Execute your code here
      this.api
        .planAmount(this.selectedRoom, this.selectedType, this.selectedPlan)
        .subscribe((data) => {
          console.log(data);
          this.planDetails = data.data[0];
          this.total = this.planDetails.tax_and_other_charges + this.subTotal
          this.subTotal =
            this.planDetails.subscription_fee +
            this.planDetails.security_deposit +
            this.planDetails.installation_charges;
        });
      this.counter++;
      console.log('Interval tick:', this.counter);
    });
  }

  ngOnDestroy() {
    // Unsubscribe from the interval when the component is destroyed
    this.subscription.unsubscribe();
  }

  UserFormSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    console.log(this.userForm.value, 'userForm');
  }

  selectRoom(room: string) {
    this.selectedRoom = room;
    // You can add logic here to handle what happens when a room button is clicked
  }

  selectType(type: string) {
    this.selectedType = type;
    // You can add logic here to handle what happens when a type button is clicked
  }

  selectPlan(plan: string) {
    this.selectedPlan = plan;
    // You can add logic here to handle what happens when a type button is clicked
  }

  isLinear = false;

  openConfirm() {
    this.dialog.open(PaymentPopupComponent, {
      width: '500px',
    });
  }
}
