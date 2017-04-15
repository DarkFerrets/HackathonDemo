import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';
import { BasketService } from '../../services/basket/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {
  user: User;
  materials = [];

  constructor(private userService: UserService, private router: Router,
              private basketService: BasketService) {
    userService.getUser().subscribe((data) => {
      if (data.isOK) {
        this.user = new User(data.username, data.avatar, data.rank,
                             data.materials, data.dishes);
        this.materials = basketService.getMaterials();
      } else {
        router.navigate(['/login', 'sign-in']);
      }
    });
  }

  ngOnInit() {
  }

}
