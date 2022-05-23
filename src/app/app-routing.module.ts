import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChartOfAccountsComponent} from "./chart-of-accounts/chart-of-accounts.component";
import {AccountComponent} from "./account/account.component";

const routes: Routes = [
  { path: 'new-account', component: AccountComponent},
  { path: 'chart-of-accounts', component: ChartOfAccountsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
