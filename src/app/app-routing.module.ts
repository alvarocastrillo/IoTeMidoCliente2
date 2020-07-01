import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RedComponent } from './red/red.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {path: '', redirectTo:'login' , pathMatch:'full'},
  {path: 'login',component: LoginComponent },
  {path: 'red',component: RedComponent,  canActivate: [AuthGuard], data: { claimType: 'RedesInsertar'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
