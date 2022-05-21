import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavigationComponent } from './navigation.component';
import {render, screen} from "@testing-library/angular";
import {of} from "rxjs";

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

});

describe('NavigationComponent', () => {
  it('should render application name at the toolbar', async () => {
    await render(NavigationComponent, {
      componentProperties: { application: 'hello'}
    })
    expect(screen.getByTestId('header').innerHTML).toBe('hello');
  })

  it('should not show the application name in the sidenav in desktop mode', async () => {
    await render(NavigationComponent, {
      componentProperties: { isHandset$: of(false), application: 'hello'}
    })
    expect(screen.queryByTestId('sidenav-header')).toBeFalsy();
  })

  it('should show the application name in the sidenav in handset mode', async () => {
    await render(NavigationComponent, {
      componentProperties: { isHandset$: of(true), application: 'hello'}
    })
    expect(screen.getByTestId('sidenav-header').innerHTML).toBe('hello');
  })

});
