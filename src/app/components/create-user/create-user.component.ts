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



  
 
 haveUser(form:NgForm, submit: any){
    console.log(form.value)
    console.log(form.valid)
    console.log(submit)
   
  }

  
}
