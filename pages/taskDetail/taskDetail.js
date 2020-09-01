// pages/taskDetail/taskDetail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        safeBottom: app.safeBottom,
        steps: [
            {
                desc: '已下单',
            },
            {
                desc: '已有4人接单',
            },
            {
                desc: '待支付',
            },
            {
                desc: '待验收',
            },
            {
                desc: '完成',
            },
          ],
          active : 0
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //初始化富文本编辑器
    async onEditorReady() {
        const that = this
        wx.createSelectorQuery().select('#editor').context(function (res) {
            that.editorCtx = res.context
            let html="<p> js中去除字符串中所有的html标签</p><p><br></p><p>对于获取了一大堆字符串但是又不想要里面的html标签怎么办？</p><p><br></p><p>特别是像博客园这个富文本框中，可以带样式的，取出来的文章内容也是带样式的。</p><p><br></p><p>但是在某些地方只要显示文本不想显示其他标签，只好这样做。</p>"

           // let result =await html
            that.editorCtx.setContents({
                html:html,
                success:  (res)=> {
                    console.log(res)
                },
                fail:(res)=> {
                    console.log(res)
                }
            })
        }).exec()

    },

    //编辑
    tapEdit(e) {
        let code = e.currentTarget.dataset.code
        wx.navigateTo({
            url: '/pages/task/task?taskCode='+code,
        })
    }
})