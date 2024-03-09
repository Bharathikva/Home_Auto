import { ValidatorFn, AbstractControl } from '@angular/forms';

export class Constants {
  public static readonly _BASEURL = 'https://6k1hp1t7-8081.inc1.devtunnels.ms';
  public static readonly Plans = this._BASEURL + '/api/plan-types';
  public static readonly size = this._BASEURL + '/api/house-types';
  public static readonly area = this._BASEURL + '/api/area-types';
  public static readonly planAmount = this._BASEURL + '/api/plans';

  // validations
  public static readonly EMAIL_PATTERN =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  public static phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneNumber = control.value;

      if (!phoneNumber || phoneNumber === '') {
        return null; // No validation error if the field is empty
      }

      if (phoneNumber.startsWith('00')) {
        return { phoneNumberStartsWith00: true };
      }

      return null;
    };
  }
}
