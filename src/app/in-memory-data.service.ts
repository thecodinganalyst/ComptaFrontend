import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Account} from "./model/account";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const accounts: Account[] = [
      {id: 'cash', name: 'Cash', currency: 'SGD', group: 'Assets', openBal: 0, openDate: new Date(2020, 0, 1)},
      {id: 'food', name: 'Food', group: 'Expenses'}
    ];
    const groups: string[] = ['Assets', 'Liabilities', 'Expense', 'Revenue'];
    const currencies: string[] = ['SGD', 'MYR', 'USD']
    return {accounts, groups, currencies};
  }

}
