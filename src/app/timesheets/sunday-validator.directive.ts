import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appSaturdayValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SaturdayValidatorDirective),
      multi: true
    }
  ]
})
export class SaturdayValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const dayOfWeek = selectedDate.getUTCDay();
    return dayOfWeek === 6 ? null : { 'saturdayValidator': true };
  }
}