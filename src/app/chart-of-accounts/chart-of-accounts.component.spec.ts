import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { ChartOfAccountsComponent } from './chart-of-accounts.component';
import {HttpClientModule} from "@angular/common/http";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {HarnessLoader} from "@angular/cdk/testing";
import {MatHeaderRowHarness} from "@angular/material/table/testing";
import {AppRoutingModule} from "../app-routing.module";

describe('ChartOfAccountsComponent', () => {
  let component: ChartOfAccountsComponent;
  let fixture: ComponentFixture<ChartOfAccountsComponent>;
  let loader: HarnessLoader;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartOfAccountsComponent ],
      imports: [
        AppRoutingModule,
        HttpClientModule,
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartOfAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should have fields - name, group, currency, openBal, openDate', async () => {
    const tableHeader = await loader.getAllHarnesses(MatHeaderRowHarness);
    expect(await tableHeader[0].getCellTextByIndex()).toEqual(['Name', 'Group', 'Currency', 'Opening Balance', 'Opening Date']);
  })
});

