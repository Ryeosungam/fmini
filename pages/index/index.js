import {request} from '../../request/index.js';
Page({
  data: {
    swiperList:[],
    cateList:[], 
    floorlist:[]
  },
  //options(Object)
  onLoad: function(options){
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
   this.getSwiperData();
   this.getCateData();
   this.getFloorData()
  } ,
 getSwiperData(){
  request({url:'home/swiperdata'}).then(result=>{
    this.setData({
      swiperList:result
    })
  })
 },
 getCateData(){
  request({url:'home/catitems'}).then(result=>{
    this.setData({
      cateList:result
    })
  })
 },
 getFloorData(){
  request({url:'home/floordata'}).then(result=>{
    this.setData({
      floorList:result
    })
  })
 }
})