import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ListProductosComponent } from './components/list-productos/list-productos.component';
import { AddProductosComponent } from './components/add-productos/add-productos.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  {
    path: 'main',
    component: MainComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listProductos', component: ListProductosComponent},
  { path: 'addProductos', component: AddProductosComponent},
  { path: 'editProducto/:id', component: AddProductosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
