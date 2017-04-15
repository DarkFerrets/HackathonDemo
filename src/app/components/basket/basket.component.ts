import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';
import { BasketService } from '../../services/basket/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class BasketComponent implements OnInit {
  user: User;
  materials = [];
  recipes = [];
  usedMaterials = [];

  constructor(private userService: UserService, private router: Router,
              private basketService: BasketService, public dialog: MdDialog) {
    // 没有授权则回到登录页
    userService.getUser().subscribe((data) => {
      if (data.isOK) {
        this.user = new User(data.username, data.avatar, data.rank,
                             data.materials, data.dishes);
        this.materials = basketService.getMaterials();
        this.recipes = basketService.getRecipes();
      } else {
        router.navigate(['/login', 'sign-in']);
      }
    });
    // 设置合成台的高度
    var interval = setInterval(function() {
      let table = document.getElementById('crafting-table');
      if (table) {
        table.style.height = table.offsetWidth + 'px';
        clearInterval(interval);
      }
    }, 10);
  }

  // 动态设置合成台的高度
  onResize(event) {
    let table = document.getElementById('crafting-table');
    table.style.height = table.offsetWidth + 'px';
  }

  // 添加原料到合成台
  addMaterial(material) {
    if (this.usedMaterials.length < 9) {
      if (material.number - 1 > 0)
        material.number--;
      else {
        this.materials = this.materials.filter(function(element) {
          return element['name'] != material.name;
        });
      }
      this.usedMaterials.push(material);
    }
  }

  ngOnInit() {
  }

  getBonues() {
    this.dialog.open(BonuesComponent);
  }

}

@Component({
  selector: 'bonues',
  templateUrl: './bonues.component.html',
  styleUrls: ['./bonues.component.sass']
})
export class BonuesComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
