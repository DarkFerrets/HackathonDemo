import { Injectable } from '@angular/core';

@Injectable()
export class BasketService {
  // 假数据
  materials = [
    { name: '虾仁', unit: '份', image: '/assets/images/food1.1.jpg', number: 2 },
    { name: '米浆', unit: '碗', image: '/assets/images/food1.2.jpg', number: 1 },
    { name: '菜心', unit: '根', image: '/assets/images/food1.3.jpg', number: 1 },
    { name: '凤爪', unit: '只', image: '/assets/images/food2.1.jpg', number: 5 },
    { name: '卤料', unit: '份', image: '/assets/images/food2.2.jpg', number: 1 },
    { name: '面粉', unit: '碗', image: '/assets/images/food3.1.jpg', number: 1 },
    { name: '鸡蛋', unit: '个', image: '/assets/images/food3.2.jpg', number: 8 },
    { name: '黑糖', unit: '碗', image: '/assets/images/food3.3.jpg', number: 2 }
  ];

  recipes = [
    { name: '虾仁拉肠', materials: '虾仁一份、米浆一碗、菜心一根', image: '/assets/images/food1.jpg' },
    { name: '豉汁凤爪', materials: '凤爪三只、卤料一份', image: '/assets/images/food2.jpg' },
    { name: '马拉糕', materials: '面粉一碗、鸡蛋一个、黑糖一碗', image: '/assets/images/food3.jpg' },
    { name: '鸡蛋拉肠', materials: '鸡蛋一份、米浆一碗、菜心一根', image: '/assets/images/food4.jpg' }
  ]

  constructor() {}

  // 获取原材料
  getMaterials() {
    return this.materials;
  }

  // 获取菜谱
  getRecipes() {
    return this.recipes;
  }

}
