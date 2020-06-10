// pages/cart/index.js
import {getSetting,openSetting,chooseAddress,showModal,showToast} from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
address:{},
cart:{},
totalPrice:0,
totalNum:0
  },
onShow(){
  //从缓存中拿地址 拿购物车数组
  const address = wx.getStorageSync("address");
  let cart = wx.getStorageSync("cart")||[];
  cart = cart.filter(v=>v.checked);

let totalNum = 0;
let totalPrice = 0;
cart.forEach(v=>{
    totalPrice +=v.num*v.goods_price;
    totalNum +=v.num;
})

this.setData({
  cart,
  totalNum,
  totalPrice,
  address
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

handleOrderPay(){
    const token = wx.getStorageSync("token");
    if(!token){
     wx.navigateTo({
      url:'/pages/auth/index'
     });
     return ;
    }
  }
})