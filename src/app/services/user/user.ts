export class User {
  username: string;
  avatar: string;
  rank: string;
  materials: number;  // 拥有原材料的个数
  dishes: number;  // 拥有菜肴的个数

  constructor(username: string, avatar: string, rank: string, materials: number,
              dishes: number) {
    this.username = username;
    this.avatar = avatar;
    this.rank = rank;
    this.materials = materials;
    this.dishes = dishes;
  }
};
