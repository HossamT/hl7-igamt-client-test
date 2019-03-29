import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {RegistrationRequest} from '../../../../root-store/registration/registration.actions';
import {RegistrationObject} from '../../models/user/registration-object.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

  onSubmitApplication($event: RegistrationObject) {
    console.log($event);
    this.store.dispatch(new RegistrationRequest($event));
  }
}
