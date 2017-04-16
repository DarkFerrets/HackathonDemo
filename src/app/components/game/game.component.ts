import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { UserService } from '../../services/user/user.service';
import { GameService } from '../../services/game/game.service';

declare const Leap: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
  // 所有游戏
  games = [];
  // 正在被显示的游戏
  game;
  username = "";

  // 用户选择的选择题答案
  selected: number;
  // 用户的解谜题答案
  guess: string;
  gestures = ['paper', 'stone', 'scissor'];
  selectedGesture: string;

  // 剩余题量
  left: number = 5;
  // 用户答对的题数
  correct: number = 0;

  // 手势循环
  interval;
  // 循环锁
  loopLock: boolean = true;
  // 手势结果信息
  gestureMessage: string = '';
  // Leap Motion 检测循环
  leapLoop;

  constructor(private userService: UserService, private router: Router,
              private gameService: GameService, public dialog: MdDialog) {
    // 没有授权则回到登录页
    userService.getUser().subscribe((data) => {
      if (data.isOK) {
        // 随机选出一道非手势题
        this.username = data.username;
        this.games = gameService.getGames();
        let randomNumber = Math.floor(Math.random() * this.games.length);
        this.game = this.games[randomNumber];
        this.games.splice(randomNumber, 1);
      } else {
        router.navigate(['/login', 'sign-in']);
      }
    });
  }

  ngOnInit() {}

  // 启动 Leap Motion
  runLeap() {
    // 切换手势图片
    let i = 0;
    let that = this;
    this.interval = setInterval(function() {
      that.selectedGesture = that.gestures[i % 3];
      i++;
      if (i == 3) i = 0;
    }, 200);
    // Leap Motion
    let options = { enableGestures: true };
    this.leapLoop = Leap.loop(options, function(frame) {
      let frameString = "";
      frame.hands.forEach(hand => {
        if (hand.grabStrength == 1) {
          frameString = 'stone';
        } else {
          let extendedFingers = 0;
          for(var f = 0; f < hand.fingers.length; f++) {
            var finger = hand.fingers[f];
            if(finger.extended)
              extendedFingers++;
          }
          if (extendedFingers == 2)
            frameString = 'scissor';
          else if (extendedFingers == 5)
            frameString = 'paper';
        }
        // 检测到结果
        if (frameString != "" && that.loopLock) {
          that.loopLock = false;
          that.checkGesture(frameString, that.selectedGesture);
          clearInterval(that.interval);
        }
      })
    });
  }

  // 显示下一题
  nextGame() {
    // 完成题目跳回主页
    if (this.left == 0) {
      let dialogRef = this.dialog.open(ResultComponent);
      dialogRef.afterClosed().subscribe( result => {
        this.router.navigate(['/home', this.username]);
      });
    }
    //如果是第四题，停掉 Leap Motion
    if (this.left == 2) {
      this.leapLoop.disconnect();
    }
    // 计算下一题
    // 如果是第三题，则石头剪刀布
    if (this.left == 3) {
      this.game.type = 'gesture';
      this.runLeap();
    // 否则随机抽题
    } else {
      let randomNumber = Math.floor(Math.random() * this.games.length);
      this.game = this.games[randomNumber];
      this.games.splice(randomNumber, 1);
    }
    this.selected = null;
    this.guess = '';
  }

  // 提交选择题
  checkMultiple() {
    // 答对加一分
    if (this.selected == this.game.answer) this.correct++;
    this.left--;
    this.nextGame();
  }

  // 提交解谜题
  checkRiddle() {
    // 答对加一分
    if (this.guess == this.game.answer) this.correct++;
    this.left--;
    this.nextGame();
  }

  // 平局
  even() {
    this.loopLock = true;
    let i = 0;
    let that = this;
    this.interval = setInterval(function() {
      if (that.game && that.game.type == 'gesture') {
        i++;
        that.selectedGesture = that.gestures[i % 3];
        if (i > 10000) i = 0;
      }
    }, 200);
  }

  // 判断电脑和玩家的输赢情况
  checkGesture(user: string, computer: string) {
    // 手势结果输出
    console.log('user:', user);
    console.log('computer:', computer);
    // 平局
    if (computer == user) {
      this.gestureMessage = '真尴尬~打平了';
      let that = this;
      setTimeout(function() {
        that.gestureMessage = '';
        that.even();
      }, 2000);
    // 电脑胜
    } else if ((computer == 'paper' && user == 'stone') ||
        (computer == 'stone' && user == 'scissor') ||
        (computer == 'scissor') && user == 'paper') {
      this.left--;
      this.gestureMessage = '很抱歉，你输了 QuQ';
      let that = this;
      setTimeout(function() {
        this.gestureMessage = '';
        that.nextGame();
      }, 2000);
    // 玩家胜
    } else {
      this.correct++;
      this.left--;
      this.gestureMessage = '恭喜你，获胜啦 ♪(^∇^*)';
      let that = this;
      setTimeout(function() {
        this.gestureMessage = '';
        that.nextGame();
      }, 2000);
    }
  }

}

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {
  constructor(public dialogRef: MdDialogRef<ResultComponent>) {}

  ngOnInit() {}
}
