import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

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

  putBack(material) {
    var index = this.usedMaterials.indexOf(material);
    var addindex = this.materials.indexOf(material);
    if (index > -1) this.usedMaterials.splice(index, 1);
    if (addindex > -1) this.materials[addindex].number++;
    else this.materials.push(material);
  }

  getBonues() {
    var success;
    if (this.usedMaterials.length < 3) {
      console.log("empty");
      this.dialog.open(FaileComponent);
      return;
    }
    var mymap = new Map();
    this.usedMaterials.forEach(function(ele) {
      if (mymap.has(ele['name'])) {
        mymap.set(ele['name'], mymap.get(ele['name'])+1);
      } else {
        mymap.set(ele['name'], 1);
      }
    });

    // check materials
    if (mymap.get("虾仁") >= 1 && mymap.get("菜心") >= 1
     && mymap.get("米浆") >= 1) {
       success = true;
       this.basketService.setFood("虾仁拉肠");
    } else if (mymap.get("凤爪") >= 3 && mymap.get("卤料") >= 1) {
      success = true;
      this.basketService.setFood("豉汁凤爪");
    } else if (mymap.get("面粉") >= 1 && mymap.get("鸡蛋") >= 1
     && mymap.get("黑糖") >= 1) {
      success = true;
      this.basketService.setFood("马拉糕");
    } else if (mymap.get("米浆") >= 1 && mymap.get("鸡蛋") >= 1
     && mymap.get("菜心") >= 1) {
      success = true;
      this.basketService.setFood("鸡蛋拉肠");
    } else {
      this.basketService.setFood("");
      this.dialog.open(FaileComponent);
      return;
    }
    let dialogRef = this.dialog.open(BonuesComponent);
    dialogRef.afterClosed().subscribe( result => {
      this.usedMaterials = this.usedMaterials.slice(0,0)
    });
  }

}

@Component({
  selector: 'bonues',
  templateUrl: './bonues.component.html',
  styleUrls: ['./bonues.component.sass']
})
export class BonuesComponent implements OnInit {
  foodName: string = "";
  foodUrl: string = "";
  constructor(public dialogRef: MdDialogRef<BonuesComponent>,
              public basketService: BasketService) {
                this.foodName = basketService.getFood();
                if (this.foodName == "虾仁拉肠")
                  this.foodUrl = "/assets/images/food1.jpg";
                if (this.foodName == "豉汁凤爪")
                  this.foodUrl = "/assets/images/food2.jpg";
                if (this.foodName == "马拉糕")
                  this.foodUrl = "/assets/images/food3.jpg";
                if (this.foodName == "鸡蛋拉肠")
                  this.foodUrl = "/assets/images/food4.jpg";
                console.log(this.foodUrl);
              }
  ngOnInit() {}
}

@Component({
  selector: 'faile',
  template: '<div>原料不足</div>',
})
export class FaileComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
