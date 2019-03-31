import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BootstrapCheckAuthStatus, LoginPageRequest, UpdateAuthStatus } from './root-store/authentication/authentication.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'igamt-client';

  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new BootstrapCheckAuthStatus());
  }

}
