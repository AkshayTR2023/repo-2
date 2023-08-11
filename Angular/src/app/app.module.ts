import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodListComponent } from './food-list/food-list.component';
import { CartComponent } from './cart/cart.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FoodBoxService } from './food-box.service';
import { HeaderComponent } from './header/header.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { FoodItemsManagementComponent } from './food-items-management/food-items-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSigninSignupComponent } from './admin-signin-signup/admin-signin-signup.component';
import { UserSigninSignupComponent } from './user-signin-signup/user-signin-signup.component';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const canActivateAdmin = (router: Router) =>  {
  const adminSession = sessionStorage.getItem('adminSession');

  if (adminSession) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};

const canActivateUser= (router: Router) =>  {
  const userSession = sessionStorage.getItem('userSession');

  if (userSession) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};



const routes: Routes = [
  {
    "path": "",
    "component": HomeComponent
  },
  {
    "path": "foodlist",
    "component": FoodListComponent,
    "canActivate": [(router: Router) => canActivateUser(router)]
  },
  {
    "path": "cart",
    "component": CartComponent,
    "canActivate": [(router: Router) => canActivateUser(router)]
  },
  {
    "path": "manage-categories",
    "component": CategoryManagementComponent,
    "canActivate": [(router: Router) => canActivateAdmin(router)]
  },
  {
    "path":"admin-dashboard",
    "component":AdminDashboardComponent,
    "canActivate": [(router: Router) => canActivateAdmin(router)]
  },
  { 
    "path": "category/:categoryId/food-items", 
    "component": FoodItemsManagementComponent ,
    "canActivate": [(router: Router) => canActivateAdmin(router)]
  },
  {
    "path":"admin-login-register",
    "component": AdminSigninSignupComponent,
  },
  {
    "path":"user-login-register",
    "component": UserSigninSignupComponent,
  },
  {
    "path":"user-dashboard",
    "component":UserDashboardComponent,
    "canActivate": [(router: Router) => canActivateUser(router)]
  },

]
@NgModule({
  declarations: [
    AppComponent,
    FoodListComponent,
    CartComponent,
    HeaderComponent,
    CategoryManagementComponent,
    FoodItemsManagementComponent,
    AdminSigninSignupComponent,
    AdminDashboardComponent,
    UserSigninSignupComponent,
    HomeComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [FoodBoxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
