import { Directive } from '@angular/core';
import { AbstractControl,NG_VALIDATORS,ValidationErrors, Validator } from '@angular/forms';
import { checkLettersValidator } from '../validators/passwordLetters.validator';


@Directive({
  selector: '[appPasswordLetters]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting:PasswordLettersDirective,
    multi: true}
  ]
})
export class PasswordLettersDirective implements Validator{

  constructor() { }

  validate  (control: AbstractControl): ValidationErrors | null {
    
    return checkLettersValidator()(control)
  }
}
