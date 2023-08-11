import { Component, Renderer2, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FoodBoxService } from '../food-box.service';
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
  selector: 'app-admin-signin-signup',
  templateUrl: './admin-signin-signup.component.html',
  styleUrls: ['./admin-signin-signup.component.css']
})
export class AdminSigninSignupComponent {
  successMessage = '';
  errorMessage = '';
  constructor(private service: FoodBoxService, private fb: FormBuilder, private renderer: Renderer2, private router: Router) { }

  login = this.fb.group({

    'email': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required]),
  });

  addAdmin = this.fb.group({
    'name': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6), passwordValidator]),
    'employeeId': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
  })
  message: any;
  public loginAdmin() {
    let response = this.service.loginAdmin(this.login.value);
    response.subscribe((data: any) => {
      this.message = data;

      if (this.message !== "invalid") {
        sessionStorage.setItem('adminSession', JSON.stringify(this.message));

      } else {
        this.errorMessage = 'Password or Email is incorrect!';
      }
      this.router.navigate(['/admin-dashboard'])
    });
  }


  public registerAdmin() {
    
    this.service.registerAdmin(this.addAdmin.value).subscribe(
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
  @ViewChild('signinForm') signinForm!: ElementRef;
  @ViewChild('signupForm') signupForm!: ElementRef;
  @ViewChild('toSigninButton') toSigninButton!: ElementRef;
  @ViewChild('toSignupButton') toSignupButton!: ElementRef;

  showSignInForm() {
    this.successMessage = '';
    this.errorMessage = '';
    this.renderer.addClass(this.toSigninButton.nativeElement, 'top-active-button');
    this.renderer.removeClass(this.toSignupButton.nativeElement, 'top-active-button');

    this.renderer.setStyle(this.signupForm.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.signinForm.nativeElement, 'display', 'block');
  }

  showSignUpForm() {
    this.successMessage = '';
    this.errorMessage = '';
    this.renderer.addClass(this.toSignupButton.nativeElement, 'top-active-button');
    this.renderer.removeClass(this.toSigninButton.nativeElement, 'top-active-button');

    this.renderer.setStyle(this.signinForm.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.signupForm.nativeElement, 'display', 'block');
  }

}