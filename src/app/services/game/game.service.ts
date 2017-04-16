import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
  games = [
    // 选择题
    {
      type: 'multipleChoice',
      question: '广州濒临的海域?',
      options: ['南海', '黄海', '东海', '渤海'],
      answer: 1
    },
    {
      type: 'multipleChoice',
      question: '以下哪个市辖区的面积最大?',
      options: ['番禺区', '从化区', '越秀区', '海珠区'],
      answer: 2
    },
    {
      type: 'multipleChoice',
      question: '以下哪个景点不属于广州?',
      options: ['小蛮腰', '陈家祠', '南海神庙', '太平老街'],
      answer: 4
    },
    {
      type: 'multipleChoice',
      question: '以下哪个不是广州地铁站的名字?',
      options: ['芳村', '大学城', '官洲', '杨箕'],
      answer: 2
    },
    {
      type: 'multipleChoice',
      question: '广州四号线的起始站?',
      options: ['黄村、金洲', ' 黄村、文冲', '万胜围、黄村', '黄村、西朗'],
      answer: 1
    },
    {
      type: 'multipleChoice',
      question: '以下哪个是粤语“搞掂”的普通话对照?',
      options: ['要的', '整理', '糕点', '搞定'],
      answer: 4
    },
    // 手势
    {
      type: 'gesture'
    },
    // 猜谜
    {
      type: 'riddle',
      question: '兄弟两个瘦又长，扭在一起下池塘。池塘里面打个滚，捞起变得黄又胖(食物)。',
      answer: '油条'
    },
    {
      type: 'riddle',
      question: '身材模样翘，身披黑紫袍，头戴小绿帽。(蔬菜)',
      answer: '茄子'
    },
    {
      type: 'riddle',
      question: '顽猴不识儆(菜品)',
      answer: '白斩鸡'
    },
    {
      type: 'riddle',
      question: '木兰之子 (食物)',
      answer: '花生'
    },
    {
      type: 'riddle',
      question: '土豆和面包打架，土豆被河水挡住了!(蔬菜)',
      answer: '荷兰豆'
    },
    {
      type: 'riddle',
      question: '面包给了土豆一拳!(蔬菜)',
      answer: '扁豆'
    },
    {
      type: 'riddle',
      question: '土豆把面包杀了(死了)!(食品)',
      answer: '豆沙包'
    },
    {
      type: 'riddle',
      question: '一头猪对你说:“加油啊。” (食品)',
      answer: '朱古力'
    }
  ];

  constructor() {}

  getGames() {
    return this.games;
  }

}
