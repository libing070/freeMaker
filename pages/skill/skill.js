// pages/skill/skill.js
const util = require("../../utils/util");
const area = require("../../utils/area");
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        total: 0,
        safeBottom: app.safeBottom,
        skillName: '', //技能名称
        skillType: '',//技能类型
        skillList:[
             {
                 text: '设计师',
                 children: [
                    { text: 'UE设计师',id: 1},
                    { text: 'UI设计师',id: 2},
                    { text: '原画师',id: 3},
                    { text: '其他设计', id: 4},
                  ],
             },
             {
                text: '移动端',
                children: [
                   { text: '移动其他',id: 5},
                   { text: 'Android',id: 6},
                   { text: 'IOS',id: 7},
                 ],
            }
        ],
        mainActiveIndex: 0,
        activeId: null,
        showing:false,
        price:'',//时薪
        skillDesc: '',//技能描述
        imagesList:[]//图片
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
    //技能名称
    bindSkillNameInput(e) {
        let skillName=e.detail.value;
        this.setData({
            skillName:skillName
        });
    },
    //技能类型
    tapSkillTypeCell(e) {
        this.setData({
            showing:true
        });
    },
    onClickNav({ detail = {} }) {
        this.setData({
          mainActiveIndex: detail.index || 0,
        });
    },
    
    onClickItem({ detail = {} }) {
        const activeId = this.data.activeId === detail.id ? null : detail.id;
        const skillType = this.data.activeId === detail.id ? null : detail.text;
        this.setData({ 
            activeId,
            skillType,
            showing:false
        });
        console.log(this.data.skillType);
    },
    //时薪
    bindPriceInput(e) {
        let val=e.detail.value;
        var m;
        if (/^(\d?)+(\.\d{0,2})?$/.test(val)) { //正则验证
            m = val;
        } else {
            m = val.substring(0, val.length - 1);
        }
        this.setData({
            price:m
         });
    },
    
    //初始化富文本编辑器
    onEditorReady() {
        const that = this
        wx.createSelectorQuery().select('#editor').context(function (res) {
            that.editorCtx = res.context
        }).exec()
    },
   //编辑器内容改变时触发
    bindEditorInput(e) {
        let skillDesc=this.deleteHtmlTag(e.detail.html);
        if(skillDesc.length> 300){
            wx.showToast({
                title: '请输入300字以内',
                icon: 'none',
                duration: 2000
            });
            return
        }
        this.setData({
            total: skillDesc.length,
            skillDesc: e.detail.html
        });
    },
    //删除html标签
    deleteHtmlTag(html) {
        var dd=html.replace(/<[^>]+>/g,"");//截取html标签
        var dds=dd.replace(/&nbsp;/ig,"");//截取空格等特殊标签
        return dds
    },
    //上传作品
    tapUpload(e) {
        if(this.data.imagesList.length >= 8){
            wx.showToast({
                title: '最多上传8张哦',
                icon: 'none',
                duration: 2000
            });
            return
        }
        wx.chooseImage({
            count: 8-this.data.imagesList.length,
            sizeType: ['compressed'],
            success: (res) => {
                this.setData({
                    imagesList: this.data.imagesList.concat(res.tempFilePaths)
                });
            }
        });
    },
    //删除图片
    deletePhotos(e) {
        let currIndex = e.currentTarget.dataset.index;
        console.log(currIndex);
        this.data.imagesList.splice(currIndex, 1);
        this.setData({
            imagesList: this.data.imagesList,
        })
    },
    // 点击图片
    tapBanner(e) {
        //let current = 'http:' + e.currentTarget.dataset.item
        let current = e.currentTarget.dataset.item

        let urls = []
        for (let item of this.data.imagesList) {
            //urls.push('http:' + item)
            urls.push(item)
        }

        wx.previewImage({
            current,
            urls,
        })
    },
    //提交点击事件
    tapSubmit() {
        const that = this

        if(!this.data.skillName){
            wx.showToast({
                title: '请输入技能名称',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if(!this.data.skillType){
            wx.showToast({
                title: '请选择技能类型',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if(!this.data.price){
            wx.showToast({
                title: '请输入时薪',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if(!this.data.skillDesc){
            wx.showToast({
                title: '请输入技能描述',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        let data={
            skillName: this.data.skillName,
            skillType:  this.data.skillType,
            price:  this.data.price,
            skillDesc:  this.data.skillDesc,
        }
        console.log(data);
    },
    // 点击遮罩层
    tapCancel(e) {

        this.setData({
            showing: false
        });
    },
})