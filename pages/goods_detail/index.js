import { request } from "../../request/index.js";

// pages/goods_detail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
      goodsObj:{}
  },
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id)
  },
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"goods/detail",data:{goods_id}});
    this.GoodsInfo = goodsObj;
    this.setData({
      goodsObj:{
        goods_name : goodsObj.goods_name,
        goods_price : goodsObj.goods_price,
        goods_introduce : goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics : goodsObj.pics
    }
  })
},
handlePreviewImage(e){
  const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
  const current = e.currentTarget.dataset.url
  wx.previewImage({
    current: current,
    urls: urls,
  });
},
handleCartAdd(){
  //获取缓存中数据
  let cart = wx.getStorageSync("cart")||[];
//比对index
  let index = cart.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id);
  //对比对的处理
  if(index===-1){
    this.GoodsInfo.num = 1;
    this.GoodsInfo.checked = true;
    cart.push(this.GoodsInfo)//不要加引号  直接加数据
  }else{
    cart[index].num++
  }
  wx.setStorageSync("cart",cart);
  //弹窗
  wx.showToast({
    title: '加入成功',
    icon: 'success',
    //弹出组织用户继续其他操作
    mask: true
  })
}
  
})