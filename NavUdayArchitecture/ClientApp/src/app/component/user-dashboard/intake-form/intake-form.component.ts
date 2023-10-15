import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-intake-form',
  templateUrl: './intake-form.component.html',
  styleUrls: ['./intake-form.component.css']
})
export class IntakeFormComponent implements OnInit {

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  panelOpenState: boolean = false;
  BusinessFormGroup : FormGroup = this._formBuilder.group({
    IdType: ['', Validators.required],
    SSN: ['', Validators.required],
    businessLegalName: ['', Validators.required],
    IRSFinllingName: ['', Validators.required],
    EntityType: ['', Validators.required],
    IsNonPRofit: ['', Validators.required],
    IsbusinessDisRegarded : ['', Validators.required]
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
