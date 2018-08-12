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


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'forgetpassword', component: ForgetpassComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'about', component: AboutUsComponent },
  // { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
