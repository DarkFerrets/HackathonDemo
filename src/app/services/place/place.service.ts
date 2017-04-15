import { Injectable } from '@angular/core';

@Injectable()
export class PlaceService {
  private headers = new Headers({'Content-Type': 'application/json'});

  places = [{
    center: {
      position : [113.264315,23.125446],
      infoTplData: {
        title: '公园前',
        body: '公园前站位于广州市最繁华的中山五路，邻近北京路步行街、文德路、丽都大酒店。快去看看有什么惊喜吧'
      }
    },
    playFileds: []
  }, {
    center: {
      position : [113.248976,23.109186],
      infoTplData: {
        title: '文化公园',
        body: '文化公园站邻近上下九，沙面等旅游热门景点，是广州购物和拍照的不二选择。快去寻找你的线索吧。'
      }
    },
    playFileds: []
  }, {
    center: {
      position : [113.270966,23.181613],
      infoTplData: {
        title: '白云公园',
        body: '白云公园站，近白云国际机场旧址中心位置，毗邻风景秀丽的白云山西麓。快去白云山看看吧。'
      }
    },
    playFileds: []
  }, {
    center: {
      position : [113.385625,23.058098],
      infoTplData: {
        title: '大学城北',
        body: '大学城北站位于大学城北边，邻近中山大学、星海音乐学院，GOGO新天地等。快去体验大学生的生活吧。'
      }
    },
    playFileds: []
  }, {
    center: {
      position : [113.33017,22.992931],
      infoTplData: {
        title: '汉溪长隆',
        body: '汉溪长隆站，邻近长隆欢乐世界，长隆水上乐园，长隆酒店等。快去快乐的地方寻找你的线索吧。'
      }
    },
    playFileds: []
  }, {
    center: {
      position : [113.321206,23.119293],
      infoTplData: {
        title: '珠江新城',
        body: '珠江新城是广州天河CBD的主要组成部分，集美食、购物、金融于一体。快去寻找你的线索吧。'
      }
    },
    playFileds: [{
      name: "永旺",
      position: [113.322598,23.120017]
    }, {
      name: "保利大厦",
      position: [113.319636,23.118057]
    }, {
      name: "广州金融中心",
      position: [113.32303,23.117912]
    }
  ]
  }];

  constructor() { }

  getPlaces() {
    return this.places;
  }

}
