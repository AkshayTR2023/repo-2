import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodListComponent } from './food-list/food-list.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './cart.service';
import { HeaderComponent } from './header/header.component';
const routes: Routes = [
  {
    "path": "",
    "component": FoodListComponent
  },
  {
    "path": "foodlist",
    "component": FoodListComponent
  },
  {
    "path": "cart",
    "component": CartComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    FoodListComponent,
    CartComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
