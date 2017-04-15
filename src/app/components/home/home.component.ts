import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';

declare var AMap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  errorMessage: string = '';
  user: User;

  constructor(public userService: UserService, public router: Router) {
    userService.getUser().subscribe((data) => {
      if (data.isOK) {
        this.user = new User(data.username, data.avatar);
      } else {
        router.navigate(['/login', 'sign-in']);
      }
    });
  }

  ngOnInit() {
    console.log(AMap);
    var map = new AMap.Map('map-container', {
      resizeEnable: true,
      zoom: 10,
      center: [113.2644, 23.1291]
    });
  }

}
