import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginPageRequest } from 'src/app/root-store/authentication/authentication.actions';
import { LoginRequest } from './../../../../root-store/authentication/authentication.actions';
import * as fromAuth from './../../../../root-store/authentication/authentication.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<fromAuth.IState>, private router: Router) { }

  authenticate(request: LoginRequest) {
    this.store.dispatch(new LoginPageRequest(request));
  }

  ngOnInit() {
    this.store.select(fromAuth.selectIsLoggedIn).subscribe(
      (isLogged) => {
        if (isLogged) {
          this.router.navigate(['home']);
        }
      },
    );
  }
}
