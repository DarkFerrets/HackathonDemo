import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';

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
          img: '<img src="//webapi.amap.com/theme/v1.3/autonavi.png" />',
          body: '<---------内容--------->'
        }
      },
      playFileds: []
    }, {
      center: {
        position : [113.321206,23.119293],
        infoTplData: {
          title: '珠江新城',
          img: '<img src="//webapi.amap.com/theme/v1.3/autonavi.png" />',
          body: '<---------内容--------->'
        }
      },
      playFileds: [{
        position: [113.322598,23.120017]
      }]
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
            //<%= 原值插入 ..
            '<%= img %>' +
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
        } else {
          if (infoWindow.getIsOpen()) {
            circle.hide();
            infoWindow.close();
          } else {
            infoWindow.open(map, marker.getPosition());
            circle.show();
          }
        }
      });

      let circle = new AMap.Circle({
        map: map,
        center: centerPos,
        radius: 400,
        fillOpacity: 0.1,
        strokeOpacity: 0,
        bubble: true
      });

      circle.hide();
    }

    function markPlayFileds(playFileds, SimpleInfoWindow) {
      playFileds.forEach(playFiled => {
        let marker = new AMap.Marker({
          map: map,
          zIndex: 9999999,
          position: playFiled.position,
          offset: new AMap.Pixel(-10, -20)
        });

        var infoWindow = new SimpleInfoWindow({
            infoTitle: '<strong>这里是标题</strong>',
            infoBody: '<p>这里是内容。</p>'
        });

        AMap.event.addListener(marker, 'click', function() {
          infoWindow.open(map, marker.getPosition());
        });
      })
    }

     AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
        datas.forEach(data => {
          markCenter(data.center, SimpleInfoWindow);
          markPlayFileds(data.playFileds, SimpleInfoWindow);
      });
    })
  }
};

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {
  constructor(public dialogRef: MdDialogRef<WelcomeComponent>) {}

  ngOnInit() {}
}
