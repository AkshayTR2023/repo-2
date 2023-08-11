import { Component, OnInit } from '@angular/core';
import { FoodBoxService } from '../food-box.service';
import { Admin } from '../model-classes/admin.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  admin: Admin = new Admin();
  message = '';
  showMainDashboard = true;
  showUpdateArea = false;
  adminEmployeeId = sessionStorage.getItem("adminSession");
  profileForm: FormGroup=this.fb.group({
    fullName: ['', Validators.required],
    newPassword: ['', [Validators.minLength(6), this.passwordValidator, Validators.required]],
    confirmNewPassword: ['', Validators.required],
  }, { validators: this.matchingPasswords });
  adminDetails:any;
  constructor(private service: FoodBoxService,private fb: FormBuilder) { }
  ngOnInit(): void {
    this.getAdmin();
    this.showMainDashboard = true;
    this.showUpdateArea = false;
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      newPassword: ['', [Validators.minLength(6), this.passwordValidator, Validators.required]],
      confirmNewPassword: ['', Validators.required],
    }, { validators: this.matchingPasswords });
  }
  passwordValidator(control: any) {
    const value = control.value;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);

    if (hasUpper && hasLower && hasNumber && hasSpecial) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }
  matchingPasswords(group: FormGroup) {
    const newPassword = group.get('newPassword').value;
    const confirmNewPassword = group.get('confirmNewPassword').value;

    return newPassword == confirmNewPassword ? null : { passwordsMismatch: true };
  }
  enableEdit():void{
    this.showMainDashboard = false;
    this.showUpdateArea = true;
  }
  getAdmin(): void {
    console.log(this.adminEmployeeId);

    this.service.getAdminByEmployeeId(this.adminEmployeeId).subscribe(

      admin => {
        this.admin = admin;
        console.log(this.admin);
      }
    )
  }

 

  updateAdmin() {

    this.admin.password=this.profileForm.value.newPassword;
    console.log(this.admin.password);
    
    this.service.updateAdmin(this.admin).subscribe(
      (response) => {
        if (response == '0')
          alert('Oops, something went wrong!')
        else {
          this.message = "Details Updated Successfully!";
          this.getAdmin();
        }
      }
    )
  }
}
