import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber, delay } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
  oneUser:User[]=[];
  onlyLogIn:boolean=false;
  temporaryUser:any;
  users: User[] = [
    {
      login: 'Admin',
      password: 'Admin',
      name: 'Anna',
      surname: 'Kowalska',
      email: '',
    },
    {
      login: 'Login',
      password: 'Hasło',
      name: 'Jan',
      surname: 'Nowak',
      email: '',
    },
  ];
  constructor() {}

  // https://jjy2zzbai2.medium.com/how-to-create-a-custom-async-user-exists-validator-in-angular-6c675785238c
  isNameTaken(login: string): Observable<boolean> {
    const foundUser = this.users.find((u:any) => u.login.toLowerCase() === login.toLowerCase());
    const isFound = foundUser ? true : false;  return new Observable((observe: Subscriber<boolean>) => {
      observe.next(isFound);
    }).pipe(delay(500));
  }

  createUser(param:any){
    this.users.push(param)
    
  }

  createTemporaryUser(param:any){
    this.temporaryUser=param
    
  }

  logIn(param:any){
    this.oneUser=this.users.filter((el:any)=>el.login.toLowerCase()===param[0].toLowerCase()&&el.password===param[1]);
  }

  changeOnlyLogIn(param:boolean){
    this.onlyLogIn=param
  }
}
