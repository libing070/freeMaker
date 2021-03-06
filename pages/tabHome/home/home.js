// pages/tabHome/home.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        safeBottom: app.safeBottom,

        types: ['设计', '研发', '运营', '运营运营运营', '运营运营', '运营运营运营运营运营运营'],

        indicatorDots: true,
        swiperList:[
            "//img14.360buyimg.com/pop/jfs/t1/114735/33/2427/35818/5ea17d3aE7018d774/acf7950db4ef2c51.jpg",
            "//img14.360buyimg.com/pop/jfs/t1/88961/36/19902/34141/5ea17d3aEf82710e9/6465b378faf4ea0b.jpg",
            "//img14.360buyimg.com/pop/jfs/t1/111272/19/2307/93015/5ea17d3aEb521c837/7b9ac8fb948993f0.jpg",
            "//img14.360buyimg.com/pop/jfs/t1/110316/1/13554/178993/5ea17d3aE88af5e39/1e6dfb8dfb8259f6.jpg",
            "//img14.360buyimg.com/pop/jfs/t1/119502/34/1004/98273/5ea17d49Ed74b4fa5/49e7bdfc7ab97813.png"
        ],
        albumHeight: Math.round(app.screenWidth * 1.1),

        photoCurrent: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            selectedType:  0,
        })
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
    // 点击图片
    tapBanner(e) {
        let current = 'http:' + e.currentTarget.dataset.item

        let urls = []
        for (let item of this.data.swiperList) {
            urls.push('http:' + item)
        }

        wx.previewImage({
            current,
            urls,
        })
    },
    // 切换tab
    tapTypeTab(e) {
        let i = e.currentTarget.dataset.i
        this.setData({
            selectedType: i,
        })
    },

    //发布
    tapLogin() {
        app.login();
    }
})