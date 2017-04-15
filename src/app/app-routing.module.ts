import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 引入 components
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BasketComponent } from './components/basket/basket.component';
import { GameComponent } from './components/game/game.component';

const appRouters: Routes = [
  {
    path: '',
    redirectTo: 'login/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'login/:page',
    component: LoginComponent
  },
  {
    path: 'home/:username',
    component: HomeComponent
  },
  {
    path: 'basket/:username',
    component: BasketComponent
  },
  {
    path: 'game/:username/:place',
    component: GameComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRouters) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
