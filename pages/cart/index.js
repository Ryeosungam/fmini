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
allChecked:false,
totalPrice:0,
totalNum:0
  },
onShow(){
  const address = wx.getStorageSync("address");
  const cart = wx.getStorageSync("cart")||[];
  //every 数组方法  遍历  返回的回调函数全为True时就为True  只要有一个为false时就会返回false
  //空数组也会返回true  先做个逻辑判断
  // const allChecked =cart.length?cart.every(v=>v.checked):false;  循环耗费性能
this.setCart(cart);
this.setData({address})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击事件
// 首先判断用户是否打开scope.adress权限
/*

直接使用async语法--------------------------------------


*/
    // handleChooseAddress(){
    //  //获取scope.address状态
    // wx.getSetting({
    //   success: (result)=>{
    //     const scopeAddress = result.authSetting["scope.address"];
    //     //判断scope.adress是否为True
    //     if(scopeAddress===true||scopeAddress===undefined){
    //       //为True直接调用
    //       wx.chooseAddress({
    //         success: (result)=>{
              
    //         }
    //       })
    //       //不为True，设置scope.adress为True
    //     }else{
    //       wx.openSetting({
    //         success: (result)=>{
    //           wx.chooseAddress({
    //             success: (result)=>{
                  
    //             }
    //           })
    //         }
    //       })
    //     }
    //  } 
    // })
       
  
    // }

async handleChooseAddress(){
 try {
  const res1 = await getSetting();
  const scopeAddress = res1.authSetting["scope.address"];
  //进行判断
  if(scopeAddress===false){
    await openSetting();
  }
    const address = await chooseAddress();
    wx.setStorageSync("address",address);
 } catch (error){
   console.log(error)
 }
},
//获取数据id 判断index  对checked取反 重新计算数量价格    对计算价格数量封装
handleItemChange(e){
 const goods_id = e.currentTarget.dataset.id;
 let {cart} = this.data;
 let index =cart.findIndex(v=>v.goods_id===goods_id);
 cart[index].checked =!cart[index].checked;

 this.setCart(cart)
},
setCart(cart){
  let allChecked = true
  let totalNum = 0;
  let totalPrice = 0;
  cart.forEach(v=>{
    if(v.checked){
      totalPrice +=v.num*v.goods_price;
      totalNum +=v.num
    }else{
        allChecked =false
    }
  })
      allChecked = cart.length!=0?allChecked:false 
  this.setData({ 
    cart,
    allChecked,
    totalPrice,
    totalNum
  }),
  wx.setStorageSync("cart",cart); 
},
handleItemAllCheck(){
  let {cart,allChecked} = this.data;
   allChecked = !allChecked;
   cart.forEach(v=>v.checked=allChecked);
   //调用重新计算价格 数量
   this.setCart(cart)
},
async handleItemNumEdit(e){
 const {operation,id} = e.currentTarget.dataset;
 let {cart} = this.data;
 const index = cart.findIndex(v=>v.goods_id===id);
  if(cart[index].num===1&&operation===-1){
    const res = await showModal({content:'您是否要进行删除'});
    if(res.confirm){
      cart.splice(index,1);
      this.setCart(cart)
  }
}else{
cart[index].num += operation;
}
this.setCart(cart)
},

//结算页面
async handlePay(){
  const {address,totalNum} = this.data;
  if(!address.userName){              //判断地址
    await showToast({title:"您没有填写地址"});
    return ;
  }
  if(totalNum===0){                   //判断有无商品
    await showToast({title:"您没有选购商品"});
    retun ; 
  }
  wx.navigateTo({
    url:'/pages/pay/index'
  })
    
  
}
})