import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {catchError, map, mergeWith, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Account} from "../model/account";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";

/**
 * Data source for the ChartOfAccounts view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
@Injectable({providedIn: 'root'})
export class ChartOfAccountsDataSource extends DataSource<Account> {
  data$: Account[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  accountUrl = environment.apiUrl.account;
  groupsUrl = environment.apiUrl.groups;
  currenciesUrl = environment.apiUrl.currencies;

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl)
      .pipe(
        catchError(this.handleError<Account[]>('getAccounts', []))
      );
  }

  getGroups(): Observable<string[]> {
    return this.http.get<string[]>(this.groupsUrl)
      .pipe(
        catchError(this.handleError<string[]>('getGroups', []))
      );
  }

  getCurrencies(): Observable<string[]> {
    return this.http.get<string[]>(this.currenciesUrl)
      .pipe(
        catchError(this.handleError<string[]>('getCurrencies', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Account[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return this.getAccounts().pipe(
        tap(data => this.data$ = data),
        mergeWith(this.paginator.page, this.sort.sortChange),
        map(() => this.getPagedData(this.getSortedData([...this.data$])))
      )
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Account[]): Account[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Account[]): Account[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'group': return compare(a.group, b.group, isAsc);
        case 'currency': return compare(a.currency, b.currency, isAsc);
        case 'openBal': return compare(a.openBal, b.openBal, isAsc);
        case 'openDate': return compare(a.openDate, b.openDate, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number | Date | undefined, b: string | number | Date | undefined, isAsc: boolean): number {
  const asc = (isAsc ? 1 : -1);
  if(a !== undefined && b !== undefined) {
    return (a < b ? -1 : 1) * asc;
  }else if(a === undefined && b !== undefined){
    return -1 * asc;
  }else{
    return 1 * asc;
  }

}
