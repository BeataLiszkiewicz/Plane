import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-is-logged',
  templateUrl: './is-logged.component.html',
  styleUrls: ['./is-logged.component.scss'],
})
export class IsLoggedComponent {
  name: string = '';

  constructor(private readonly UserService: UsersService) {}
  ngOnInit() {
    this.name = this.UserService.oneUser[0].name;
  }
}
