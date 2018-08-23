import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/users/login/login.component';
import { SigninComponent } from './components/users/signin/signin.component';
import { ForgetpassComponent } from './components/users/forgetpass/forgetpass.component';
import { BasketComponent } from './components/basket/basket.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AccountComponent } from './components/account/account.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'forgetpassword', component: ForgetpassComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'basket', canActivate: [AuthGuard], component: BasketComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'orders', canActivate: [AuthGuard], component: OrdersComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'account', canActivate: [AuthGuard], component: AccountComponent },
  { path: 'purchase-history', canActivate: [AuthGuard], component: PurchaseHistoryComponent },
  { path: 'about', component: AboutUsComponent },
  { path: '**', redirectTo: '/products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
