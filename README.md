# HackathonDemo

## 简介
广州是一座千年古城，更是一座美食之城。我们的游戏，以广州的美食为主线，广州市地图为游戏背景。用户置身于虚拟的地图场景中，通过到达特定地点，完成小型的任务目标来获得直接或者间接的线索，找到制作一道广州美食所需要的食材，集齐所有食材可以合成这一道美食，获得相应奖励。
这一款游戏富含广州元素，能够唤起很多广州人的共鸣，也能够让不熟悉广州的人对广州的地理信息以及美食文化有一个了解。同时，解密的过程也充满了趣味性，合成美食达到目标还可以获得奖励，奖励可以为虚拟的或者线下的餐饮体验券，以此获得游戏用户的持久性。

## 运行
1. 安装**node**和**npm**工具
2. 使用npm，安装**anular cli** `npm install -g @angular/cli`
3. 从[gitHub](https://github.com/DarkFerrets/HackathonDemo)上将项目克隆到本地
4. 配置**mogondb**数据库
* 在非默认端口运行 MongoDB、只监听本机：`mongod --port 5050 --dbpath=data --bind_ip 127.0.0.1` （注意这个时候没有用配置文件，因为不要开启权限模式，这样才能创建新用户）
* 命令行连接数据库，创建新的用户：
```
use admin

db.createUser({user: "username", pwd: "password", roles:[{role: "readWrite", db: "admin"}]})
```
* 检查用户是否生效：`db.auth("username", "password")`
* 使用 MongoDB 的配置文件运行：`mongod -f mongod.conf -dbpath data`（Linux 下路径都加上斜杠）（注意此时配置文件里就限制了权限，此时默认用户就没有超级权限了，只有刚才创建的那个用户可以访问博客的数据库了）
5. 使用命令行中运行 `ng build && node server.js`
6. 在浏览器的地址栏输入 `localhost:3000`，运行程序。
