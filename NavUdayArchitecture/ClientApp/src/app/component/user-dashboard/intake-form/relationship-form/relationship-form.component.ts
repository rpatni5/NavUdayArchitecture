import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-relationship-form',
  templateUrl: './relationship-form.component.html',
  styleUrls: ['./relationship-form.component.css']
})
export class RelationshipFormComponent implements OnInit {

  panelOpenState: boolean = false;
  relationshipForm : FormGroup = this._formBuilder.group({
    ContactName: ['', Validators.required],

    ContactTitle: ['', Validators.required],

    JobTitle: ['', Validators.required],
    ContactPhone: ['', Validators.required],
    ContactEmailAddress: ['', Validators.required],

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
