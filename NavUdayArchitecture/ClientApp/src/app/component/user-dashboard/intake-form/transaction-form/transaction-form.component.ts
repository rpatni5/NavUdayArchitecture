import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
  panelOpenState: boolean = false;
  transactionForm : FormGroup = this._formBuilder.group({
    PaymentVia: ['', Validators.required],
    ordersDestiny: ['', Validators.required],
    VisaOrMartercard: ['', Validators.required],
    DeliveryPath: ['', Validators.required],
    StatementSentTo: ['', Validators.required],
    CustomerServicePhone: ['', Validators.required],
    RefundPolicy:  ['', Validators.required]
  });
  isLinear = false;
  constructor( private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  saveBusinessInformation (){

  }

  saveRelationshipInformation(){

  }
  reset(){

  }
}

