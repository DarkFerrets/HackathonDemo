import { Injectable } from '@angular/core';

@Injectable()
export class BasketService {
  // 假数据
  materials = [
    { name: '虾仁', amount: '两份', image: '/assets/images/food1.1.jpg' },
    { name: '米浆', amount: '一碗', image: '/assets/images/food1.2.jpg' },
    { name: '菜心', amount: '一根', image: '/assets/images/food1.3.jpg' },
    { name: '凤爪', amount: '五只', image: '/assets/images/food2.1.jpg' },
    { name: '卤料', amount: '一份', image: '/assets/images/food2.2.jpg' },
    { name: '面粉', amount: '一碗', image: '/assets/images/food3.1.jpg' },
    { name: '鸡蛋', amount: '八个', image: '/assets/images/food3.2.jpg' },
    { name: '黑糖', amount: '两碗', image: '/assets/images/food3.3.jpg' }
  ];

  constructor() {}

  // 获取原材料
  getMaterials() {
    return this.materials;
  }

}
