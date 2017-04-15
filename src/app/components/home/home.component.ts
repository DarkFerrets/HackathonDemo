import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

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
  firstLogin: boolean;

  constructor(public userService: UserService, public router: Router, public dialog: MdDialog) {
    userService.getUser().subscribe((data) => {
      if (data.isOK) {
        this.user = new User(data.username, data.avatar);
        if (data.firstLogin) {
          this.dialog.open(WelcomeComponent);
        }
      } else {
        router.navigate(['/login', 'sign-in']);
      }
    });
  }

  ngOnInit() {
    var map = new AMap.Map('map-container', {
      resizeEnable: true,
      zoom: 10,
      center: [113.2644, 23.1291]
    });
    map.setFeatures(['bg', 'point', 'building']);
    map.plugin(['AMap.ToolBar'], function() {
      map.addControl(new AMap.ToolBar());
    });
    map.setLimitBounds(map.getBounds());
    var marker = new AMap.Marker({
        position : [113.2644, 23.1291],
        map : map
    });
  }

}


@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
