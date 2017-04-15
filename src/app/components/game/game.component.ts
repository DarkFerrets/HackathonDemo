import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { GameService } from '../../services/game/game.service';

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

  // 用户选择的选择题答案
  selected: number;
  // 用户的解谜题答案
  guess: string;

  // 剩余题量
  left: number = 5;
  // 用户答对的题数
  correct: number = 0;

  constructor(private userService: UserService, private router: Router,
              private gameService: GameService) {
    // 没有授权则回到登录页
    userService.getUser().subscribe((data) => {
      if (data.isOK) {
        // 随机选出一道题
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

  // 显示下一题
  nextGame() {
    let randomNumber = Math.floor(Math.random() * this.games.length);
    this.game = this.games[randomNumber];
    this.games.splice(randomNumber, 1);
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

}
