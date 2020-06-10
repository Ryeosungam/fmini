//ES7 ASYNC

export const getSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (res)=>{
                resolve(res)
            },
            fail: (res)=>{
                reject(res)
            },
            
        });
    })
}
export const openSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (res)=>{
                resolve(res)
            },
            fail: (res)=>{
                reject(res)
            },
            
        });
    })
}
export const chooseAddress = ()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (res)=>{
                resolve(res)
            },
            fail: (res)=>{
                reject(res)
            },
            
        });
    })
}
export const showModal = ({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title:'提示',
            content,
            success: (res)=>{
                resolve(res)
            },
            fail: (res)=>{
                reject(res)
            },
            
        });
    })
}
export const showToast = ({title})=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title:title,
            icon:'none',
            success: (res)=>{
                resolve(res)
            },
            fail: (res)=>{
                reject(res)
            },
            
        });
    })
}

export const login = ()=>{
    return new Promise((resolve,reject)=>{
     wx.login({
         timeout:10000,
         success: (result) => {
             resolve(result)
         },
         fail: (result) => {
             reject(result)
         },
    
     });
       
    })
}