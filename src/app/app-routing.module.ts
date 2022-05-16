import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChartOfAccountsComponent} from "./chart-of-accounts/chart-of-accounts.component";

const routes: Routes = [
  { path: 'chart-of-accounts', component: ChartOfAccountsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
