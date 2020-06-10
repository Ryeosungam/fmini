// pages/category/index.js
import {request} from '../../request/index.js'
Page({
  data: {
      leftMenuList:[],
      rightMenuContent:[],
      currentIndex:0,
      scrollTop:0
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //本地存储  加缓存
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      this.getCates()
    }else{
      if(Date.now() - Cates.time >1000*10){
        this.getCates()
      }else{
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightMenuContent = this.Cates[0].children;
         this.setData({
           leftMenuList,
           rightMenuContent
         })
      }
    }
  },
 async getCates(){
      // request({url:'categories'}).then(res=>{
      //    this.Cates = res.data.message;
      //    wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});

      //    let leftMenuList = this.Cates.map(v=>v.cat_name);
      //    let rightMenuContent = this.Cates[0].children;
      //     this.setData({
      //       leftMenuList,
      //       rightMenuContent
      //     })
      // })
      const res =await request({url:'categories'});
      this.Cates = res;
       wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});

         let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightMenuContent = this.Cates[0].children;
          this.setData({
            leftMenuList,
            rightMenuContent
         })
  },
  handleItemTap(e){
   const {index} = e.currentTarget.dataset;
   let rightMenuContent = this.Cates[index].children
   this.setData({
     currentIndex:index,
     rightMenuContent,
     scrollTop:0
   })
    }
})