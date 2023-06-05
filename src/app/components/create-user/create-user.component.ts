import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserExistDirective } from 'src/app/directives/user-exist.directive';



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
constructor(){}

createUser = new FormGroup({
  login:new FormControl("", {
    validators:[Validators.required,  Validators.minLength(4),Validators.pattern('[A-Za-z0-9]+')]
  }),
  password: new FormControl("", {
    validators:[Validators.required ]
  }),
  name: new FormControl("", {
    validators:[Validators.required]
  }),
  surname:new FormControl("", {
    validators:[Validators.required]
  }),
  email:new FormControl("", {
    validators:[Validators.required]
  })
  });

  
 
 haveUser(form:NgForm, submit: any){
    console.log(form.value)
    console.log(form.valid)
    console.log(submit)
   
  }

  
}
