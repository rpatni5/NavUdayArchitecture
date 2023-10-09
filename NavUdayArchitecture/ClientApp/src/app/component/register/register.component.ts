import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  hideConfirm= true;
  registerForm: FormGroup = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    password: [''],
    confirmPassword: [''],
  });
  submitted = false;
  emailInvalid = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
          confirmPassword: ['', Validators.required],
      },
      {
        validator: this.ConfirmedValidator('password', 'confirmPassword'),
      });
  }


  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  
  getErrorMessage() {
    return this.registerForm.get("email")?.hasError('email') ? 'Not a valid email' :
        '';
  }

  passwordNotMatch(){
    return this.registerForm.get("confirmPassword")?.hasError('confirmedValidator') ? 'Passwords did not match' :
        '';
  }
 

  onSubmit() {
      this.submitted = true;

      if (this.registerForm.valid) {
         this.authService.registerUser(this.registerForm.value).subscribe({
          next: (res) => {
         
          },
          error: (ex) => {
            //error
          },
        });

          return;
      }

  }
  reset(){
    this.submitted= false;
    this.registerForm.reset();
  }

}