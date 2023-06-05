import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {UsersService} from './../services/users.service';
import { catchError, map, take } from 'rxjs/operators';

@Directive({
  selector: '[appUserExist]',
  providers: [{    
    provide: NG_ASYNC_VALIDATORS,    
    useExisting: UserExistDirective,    
    multi: true  
  }]
})
export class UserExistDirective implements AsyncValidator{

  constructor(private userService: UsersService){}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.isNameTaken(control.value).pipe(
      take(1),
      map((isTaken:any) => (isTaken ? { appUserExist: true } : null)),
      catchError(() => of(null))
    );
    
}}
