import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements ControlValueAccessor, OnInit {
  @Output() _valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor( private controlContainer: ControlContainer) { }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
    this._valueChange.emit(this._value);
  }

  get value() {
    return this._value;
  }
  @Input()
  type: string;
  @Input()
  name: string;
  @Input()
  id: string;
  @Input()
  _value: any;
  @Input()
  formControlName: string;
  @Input()
  required: boolean;
  @Input()
  label: string;
  @Input()
  placeholder: any;

  control: AbstractControl;
  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit() {

    if (this.controlContainer) {
      if (this.formControlName) {
        this.control = this.controlContainer.control.get(this.formControlName);
        console.log(this.control);
      } else {
        console.warn('Missing FormControlName directive from host element of the component');
      }
    } else {
      console.warn('Can\'t find parent FormGroup directive');
    }

  }

  registerOnChange(fn: any): void {
    this.onChange = fn;

  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;

  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }

  convertErrors(): string[] {
    const errors = [];
    for (const property in this.control.errors) {
      if (property === 'required') {
        errors.push(this.name + ' is required');
        break;
      } else if (property === 'minlength') {
        errors.push(this.name + ' is too short' );
        break;

      } else if (property === 'maxlength') {
        errors.push(this.name + ' is too long' );
        break;

      } else if (property === 'email') {
        errors.push('Please enter a valid e-mail');
        break;

      } else if (this.control.errors[property]) {
        errors.push(this.control.errors[property]);
        break;
      }
    }
    return errors;
  }

  update($event: any) {
    this._valueChange.emit(this.value);
  }
}
