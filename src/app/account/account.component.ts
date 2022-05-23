import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {environment} from "../../environments/environment";
import {ChartOfAccountsDataSource} from "../chart-of-accounts/chart-of-accounts-datasource";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  groups$: string[] = [];
  currencies$: string[] = [];

  accountForm = this.fb.group({
    name: [null, Validators.required],
    group: [null, Validators.required],
    currency: null,
    openBal: null,
    openDate: null
  });

  groupsUrl = environment.apiUrl.groups;

  constructor(
    private fb: FormBuilder,
    private chartOfAccountsDataSource: ChartOfAccountsDataSource
  ) {}

  ngAfterViewInit(): void {
    this.chartOfAccountsDataSource.getGroups().subscribe(groups => this.groups$ = groups);
    this.chartOfAccountsDataSource.getCurrencies().subscribe(currencies => this.currencies$ = currencies)
  }

  onSubmit(): void {
    alert('Thanks!');
  }
}
