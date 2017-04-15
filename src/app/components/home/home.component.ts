import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';
import { BasketService } from '../../services/basket/basket.service';

declare var AMap: any;
declare const AMapUI: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  errorMessage: string = '';
  user: User;
  firstLogin: boolean;

  constructor(public userService: UserService, public router: Router,
              public dialog: MdDialog) {
    userService.getUser().subscribe((data) => {
      if (data.isOK) {
        this.user = new User(data.username, data.avatar, data.rank,
                             data.materials, data.dishes);
        if (data.firstLogin) {
          let dialogRef = this.dialog.open(WelcomeComponent);
          dialogRef.afterClosed().subscribe(result => {
            if(result == "gotoBasket") {
              this.router.navigate(['/basket', data.username]);
            }
          });
        }
      } else {
        router.navigate(['/login', 'sign-in']);
      }
    });
  }

  ngOnInit() {
    // console.log(this);
    var that = this;
    var map = new AMap.Map('map-container', {
      resizeEnable: true,
      zoom: 10,
      center: [113.3218412544,23.1298557896]
    });
    map.setFeatures(['bg', 'point', 'building']);
    map.plugin(['AMap.ToolBar'], function() {
      map.addControl(new AMap.ToolBar());
    });

    map.setLimitBounds(map.getBounds());

    const datas = [{
      center: {
        position : [113.321503,23.131138],
        infoTplData: {
          title: '体育西',
          body: '体育西是广州最繁华的区域'
        }
      },
      playFileds: []
    }, {
      center: {
        position : [113.321206,23.119293],
        infoTplData: {
          title: '珠江新城',
          body: '珠江新城是广州最繁华的区域'
        }
      },
      playFileds: [{
        name: "永旺",
        position: [113.322598,23.120017]
      }, {
        name: "保利大厦",
        position: [113.319636,23.118057]
      }, {
        name: "广州金融中心",
        position: [113.32303,23.117912]
      }
    ]
    }];

    function markCenter(center, SimpleInfoWindow) {
      let marker = new AMap.Marker({
        map: map,
        zIndex: 9999999,
        position: center.position,
        animation: 'AMAP_ANIMATION_DROP'
      });

      let centerPos = new AMap.LngLat(center.position[0], center.position[1]);

      let infoWindow = new SimpleInfoWindow({
        infoTitle: '<strong><%- title %></strong>',
        infoBody: '<p class="my-desc">' +
            //<%- html编码后插入
            '<%- body %>' +
            '</p>',
          infoTplData: center.infoTplData,

          //基点指向marker的头部位置
        offset: new AMap.Pixel(0, -31)
      });

      AMap.event.addListener(marker, 'click', function() {
        if (map.getZoom() < 18) {
          map.setZoomAndCenter(18, centerPos);
          infoWindow.open(map, marker.getPosition());
        } else {
          if (infoWindow.getIsOpen()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker.getPosition());
          }
        }
      });

      let circle = new AMap.Circle({
        map: map,
        center: centerPos,
        radius: 300,
        fillOpacity: 0.1,
        strokeOpacity: 0,
        bubble: true,
      });
    }

    function markPlayFileds(playFileds, SimpleInfoWindow, that) {
      playFileds.forEach(playFiled => {

        let circle = new AMap.Circle({
          map: map,
          extData: playFiled.name,
          center: playFiled.position,
          radius: 10,
          fillOpacity: 0,
          strokeOpacity: 0,
          bubble: true,
          zIndex: 100
        });

        AMap.event.addListener(circle, 'click', function() {
          that.router.navigate(['/game', that.user.username, circle.getExtData()]);
        });
      })
    }

     AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
        datas.forEach(data => {
          markCenter(data.center, SimpleInfoWindow);
          markPlayFileds(data.playFileds, SimpleInfoWindow, that);
      });
    })
  }
}

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {
  constructor(public dialogRef: MdDialogRef<WelcomeComponent>) {}

  ngOnInit() {}
}
