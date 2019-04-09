import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ClearAll } from 'src/app/root-store/page-messages/page-messages.actions';
import { RegistrationRequest } from '../../../../root-store/registration/registration.actions';
import { RegistrationObject } from '../../models/user/registration-object.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new ClearAll());
  }

  onSubmitApplication($event: RegistrationObject) {
    this.store.dispatch(new RegistrationRequest($event));
  }
}
