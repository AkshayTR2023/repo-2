import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FoodBoxService } from '../food-box.service';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);

  if (hasUpper && hasLower && hasNumber && hasSpecial) {
    return null;
  } else {
    return { 'invalidPassword': true };
  }
}
@Component({
  selector: 'app-user-signin-signup',
  templateUrl: './user-signin-signup.component.html',
  styleUrls: ['./user-signin-signup.component.css']
})
export class UserSigninSignupComponent {
  successMessage = '';
  errorMessage = '';
  constructor(private service: FoodBoxService, private fb: FormBuilder, private renderer: Renderer2, private router: Router) { }
  login = this.fb.group({

    'email': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required]),
  });

  addUser = this.fb.group({
    'name': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
    'password': new FormControl('', [Validators.required]),
    'mobileNumber': new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    'email': new FormControl('', [Validators.required]),
  });

  updateForm = this.fb.group({
    'email': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required])
  });


  message: any;
  email: any;
  public userLogin() {
    let response = this.service.loginUser(this.login.value);
    response.subscribe((data: any) => {
      this.message = data;

      if (this.message !== "invalid") {
        sessionStorage.setItem('userSession', JSON.stringify(this.message));

      } else {
        this.errorMessage = 'Password or Email is incorrect!';
      }
      this.router.navigate(['/user-dashboard'])
    });
  }
  public registerUser() {
    console.log(this.addUser.value);
    
    this.service.registerUser(this.addUser.value).subscribe(
      response => {
        if (response == 'Registered Successfully! Login to continue') {
          this.successMessage = response;
          this.errorMessage = '';
        }
        else {
          this.successMessage = '';
          this.errorMessage = response;
        }
      }
    );
  }
  @ViewChild('signinForm') signinForm: ElementRef;
  @ViewChild('signupForm') signupForm: ElementRef;
  @ViewChild('toSigninButton') toSigninButton: ElementRef;
  @ViewChild('toSignupButton') toSignupButton: ElementRef;

  showSignInForm() {
    this.renderer.addClass(this.toSigninButton.nativeElement, 'top-active-button');
    this.renderer.removeClass(this.toSignupButton.nativeElement, 'top-active-button');

    this.renderer.setStyle(this.signupForm.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.signinForm.nativeElement, 'display', 'block');
  }

  showSignUpForm() {
    this.renderer.addClass(this.toSignupButton.nativeElement, 'top-active-button');
    this.renderer.removeClass(this.toSigninButton.nativeElement, 'top-active-button');

    this.renderer.setStyle(this.signinForm.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.signupForm.nativeElement, 'display', 'block');
  }

  retemail: any;
  retrived: string;
  public editform() {

    this.retrived = sessionStorage.getItem('userEmail');
    if (this.retrived) {
      this.retemail = this.retrived.slice(1, -1)
    }
    console.log(this.retemail);
    // this.service.getbyemail(this.retemail).subscribe((data:any)=>{
    //   console.log(data);
    //   this.updateForm.patchValue({
    //     email:data.email,
    //     password:data.password
    //   });

    // });
  }

  updatemessage: any;
  public updateform() {
    //   let response = this.service.updateUser(this.updateForm.value);
    //   response.subscribe((data: any) => {
    //     this.updatemessage = data;
    // })
  }


}
