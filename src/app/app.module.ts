import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

// 引入前端路由文件
import { RoutingModule } from './app-routing.module';

// 引入 components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/home/home.component';
import { BasketComponent } from './components/basket/basket.component';
import { BonuesComponent } from './components/basket/basket.component';
import { FaileComponent } from './components/basket/basket.component';
import { GameComponent } from './components/game/game.component';
import { ResultComponent } from './components/game/game.component';

// 引入 services
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { BasketService } from './services/basket/basket.service';
import { GameService } from './services/game/game.service';
import { PlaceService } from './services/place/place.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    WelcomeComponent,
    BasketComponent,
    BonuesComponent,
    GameComponent,
    ResultComponent,
    FaileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    // 动态响应模块
    FlexLayoutModule,
    // Material Design 模块
    MaterialModule,
    // 路由模块
    RoutingModule
  ],
  entryComponents: [
    WelcomeComponent,
    BonuesComponent,
    ResultComponent,
    FaileComponent
  ],
  providers: [
    AuthService,
    UserService,
    BasketService,
    GameService,
    PlaceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
