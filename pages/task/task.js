// pages/task/task.js
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
        taskName: '', //任务名称
        taskType: '',//任务类型
        autosizeHeight:{
            maxHeight: 150, 
            minHeight: 150 
        },

        currPicker: '',//弹出层类型
        showing:false,
        typeList:['AAA','BBB','CCC','DDD'],//任务类型数据

        minDate: new Date().getTime(),
        maxDate: new Date().getTime() +(86400000 * 365 * 10),
        currentDate: new Date().getTime(),
        currentDateStr:'',//交付时间
        formatter(type, value) {
            if (type === 'year') {
              return `${value}年`;
            } else if (type === 'month') {
              return `${value}月`;
            } else if (type === 'day') {
                return `${value}日`;
            } else if (type === 'hour') {
                return `${value}点`;
            } else if (type === 'minute') {
                return `${value}分`;
            }
            return value;
          },

        currrArea:[],//省市区
        currrAreaCode:'',

        price:'',//预算

        taskDesc: '',//任务描述

        freeMakerID:''//接单人ID

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        console.log(options.taskCode);
        this.setData({
            areaList:area.default
        });
        // let currProvinceCode=this.findKey(area.default.province_list,'湖北省');
        // let currCityCode=this.findKey(area.default.county_list,'朝阳区');
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

    //mark :obj 对象  根据value 找到对应的key
    findKey(obj, value, compare = (a, b) => a === b) {
        return Object.keys(obj).find(k => compare(obj[k], value))
    },

    //任务名称
    bindTaskNameInput(e) {
        let taskName=e.detail.value;
        this.setData({
            taskName:taskName
         });
    },

    //预算
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
    // 任务类型选择框弹出事件
    tapTaskTypeCell(e) {
        let type = e.currentTarget.dataset.type
        this.setData({
            showing: true,
            currPicker: type
        });
    },

    //任务类型下拉确定按钮事件
    typeTapDone(e) {
        let taskType=e.detail.value;
        this.setData({
            showing: false,
            taskType:taskType
        });
    },
    // 日期选择框弹出事件
    tapDateCell(e) {
        let type = e.currentTarget.dataset.type
        this.setData({
            showing: true,
            currPicker: type
        });
    },
    //时间下拉确定按钮事件
    dateTapDone(e) {
        let currentDate=e.detail;
        let currentDateStr=util.formatDate(currentDate)
        this.setData({
            showing: false,
            currentDate:currentDate,
            currentDateStr:currentDateStr
        });
    },

    //省份城市选择框弹出事件
    tapRegionCell(e) {
        let type = e.currentTarget.dataset.type
        this.setData({
            showing: true,
            currPicker: type,
        });
    },
    //省份下拉确认按钮事件
    areaTapDone(e) {
        console.log(e);
        let currrArea=e.detail.values;
        if(currrArea[0].name == "" || currrArea[0].name == "请选择"){
            wx.showToast({
                title: '请选择所在省份',
                icon: 'none',
                duration: 2000
            });
            return 
        }
        if(currrArea[1].name == "" || currrArea[1].name == "请选择"){
            wx.showToast({
                title: '请选择所在城市',
                icon: 'none',
                duration: 2000
            });
            return 
        }
        if(currrArea[2].name == "" || currrArea[2].name == "请选择"){
            wx.showToast({
                title: '请选择所在区域',
                icon: 'none',
                duration: 2000
            });
            return 
        }


        this.setData({
            showing: false,
            currrArea: [currrArea[0].name,currrArea[1].name,currrArea[2].name],
            currrAreaCode: currrArea[2].code
        });
        
    },
    //取消按钮事件
    // 点击遮罩层
    tapCancel(e) {

        this.setData({
            showing: false
        });
    },

    //接单人
    bindFreeMakerIDInput(e) {
        let id=e.detail.value
        this.setData({
            freeMakerID: id
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
        let taskDesc=this.deleteHtmlTag(e.detail.html);
        if(taskDesc.length> 300){
            wx.showToast({
                title: '请输入300字以内',
                icon: 'none',
                duration: 2000
            });
            return
        }
        this.setData({
            total: taskDesc.length,
            taskDesc: e.detail.html
        });
    },
    //删除html标签
    deleteHtmlTag(html) {
        var dd=html.replace(/<[^>]+>/g,"");//截取html标签
        var dds=dd.replace(/&nbsp;/ig,"");//截取空格等特殊标签
        return dds
    },
    //提交点击事件
    tapSubmit() {
        const that = this
        // //获取编辑器输入的内容
        // that.editorCtx.getContents({
        //     success: function (res) {   
        //         console.log(res.html)
        //         that.setData({
        //             taskDesc:res.html
        //         });
        //     },
        //     fail: function (error){
        //         console.log(error)
        //     }
        // })
        if(!this.data.taskName){
            wx.showToast({
                title: '请输入任务名称',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if(!this.data.taskType){
            wx.showToast({
                title: '请选择任务类型',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if(!this.data.currentDateStr){
            wx.showToast({
                title: '请选择期望交付时间',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if(!this.data.price){
            wx.showToast({
                title: '请输入预算',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if(this.data.currrArea.length != 3){
            wx.showToast({
                title: '请选择省份城市',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if(!this.data.taskDesc){
            wx.showToast({
                title: '请输入任务描述',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        let data={
            taskName: this.data.taskName,
            taskType:  this.data.taskType,
            currentDateStr:  this.data.currentDateStr,
            price:  this.data.price,
            currrArea:  this.data.currrArea,
            taskDesc:  this.data.taskDesc,
            freeMakerID:  this.data.freeMakerID
        }
        console.log(data);
    }
})