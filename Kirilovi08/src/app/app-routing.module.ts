import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { LoginComponent } from './components/users/login/login.component';
import { SigninComponent } from './components/users/signin/signin.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { ForgetpassComponent } from './components/users/forgetpass/forgetpass.component';

import { HomeComponent } from './pages/home/home.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AccountComponent } from './pages/account/account.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { PurchaseHistoryComponent } from './pages/purchase-history/purchase-history.component';


const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: ComingSoonComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'forgetpassword', component: ForgetpassComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'basket', canActivate: [AuthGuard], component: BasketComponent },
  { path: 'account', canActivate: [AuthGuard], component: AccountComponent },
  { path: 'purchase', canActivate: [AuthGuard], component: PurchaseComponent },
  { path: 'purchase-history', canActivate: [AuthGuard], component: PurchaseHistoryComponent },
  { path: 'about', component: AboutUsComponent },
  { path: '**', redirectTo: '/products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
