import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component'
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
  {
    path:'',
    component:RegisterComponent
  },
  {
    path:'usersList',
    component:UsersListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
