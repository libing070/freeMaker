//app.js
App({
    onLaunch: function () {

        //wx.clearStorage();//真机调试 清除缓存 注：正式环境删除
        let info = wx.getSystemInfoSync()
        // 屏幕宽高
        this.screenWidth = info.screenWidth
        this.screenHeight = info.screenHeight
        // 窗口宽高
        this.windowWidth = info.windowWidth
        this.windowHeight = info.windowHeight
        // 异形屏安全区域
        if (info.safeArea && info.safeArea.top) {
            this.safeTop = info.safeArea.top
            this.safeBottom = info.screenHeight - info.safeArea.bottom
        } else {
            this.safeTop = info.statusBarHeight
            this.safeBottom = 0
        }

        
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

      
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    //登录
    login() {
        wx.login({
            success: res => {
                console.log(res);
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    checkUpdateVersion(){
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          console.log('--------11111111111----------------')
          console.log(res)
        })
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(function () {
          // 新的版本下载失败
          wx.showModal({
            title: '更新提示',
            content: '新版本下载失败',
            showCancel: false
          })
        })
    },
    globalData: {
        userInfo: null
    }
})