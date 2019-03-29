import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RegistrationEffects } from './registration.effects';

describe('RegistrationEffects', () => {
  let actions$: Observable<any>;
  let effects: RegistrationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegistrationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(RegistrationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
