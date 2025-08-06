import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Products } from './components/products/products';

export const routes: Routes = [
    {path:'', redirectTo:'/Home', pathMatch:'full'},
    {path:'Home', component:Home},
    {path:'Login', component:Login},
    {path:'Register', component:Register},
    {path:'Products', component:Products}
];
