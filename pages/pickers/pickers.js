// pages/pickers/pickers.js
import { provinces, citys } from '../../utils/province'
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: Object,
    },

    observers: {
        show(show) {
            if (!show) {
                return
            }

            let defaults = show.default

            this.callback = show.callback

            this.setData({
                showing: show.type,

                show: null,
            })
            if (this.data.showing == 'taskType') {
                this.taskTypeList(defaults)
            } 
            else if (this.data.showing == 'date') {
                this.dateList(defaults)
            } 
            else if (this.data.showing == 'region') {
                this.regionList(defaults)
            } 
        },
    },
    /**
     * 组件的初始数据
     */
    data: {
        safeBottom: app.safeBottom,

        titles: {
            taskType: '类型',
            date: '日期',
            region: '省份城市'
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //mark: 任务类型
        taskTypeList(defaults) {
            let taskTypes=[
                { id: 1, name: 'AAAAAA'},
                { id: 2, name: 'BBBBBB'},
                { id: 3, name: 'CCCCCC'},
                { id: 4, name: 'DDDDDD'},
                { id: 5, name: 'EEEEEE'},
                { id: 6, name: 'FFFFFF'},
                { id: 7, name: 'GGGGGG'},
                { id: 8, name: 'HHHHHH'},
                { id: 9, name: 'IIIIII'},
                { id: 10, name: 'JJJJJJ'},
            ]
            this.setData({
                taskTypes
            });
            if (defaults) {
                for(let i = 0; i < taskTypes.length ;i++){
                    if(defaults==taskTypes[i].name){
                        this.current =[i]
                        break;
                    }
                }
            }else{
                this.current =[0]
            }
            this.setData({
                current: this.current
            })

        },
        // mark: 日期
        dateList(defaults) {
            let now = new Date
            let year = now.getFullYear()
            let month = now.getMonth()
            let date = now.getDate()
            let hour=now.getHours()    // 获取当前小时数(0-23)
            let minute=now.getMinutes()   // 获取当前分钟数(0-59)

            let years = []
            for (let i = 0; i < 10; i++) {
                years.push(year + i)
            }

            let months = []
            for (let i = 0; i < 12; i++) {
                months.push(('0' + (i + 1)).slice(-2))
            }

            let dates = []
            if(defaults){
                let splitSpace=defaults.split(' ');
                let splitLine = splitSpace[0].split('-')
                let monthI = months.indexOf(splitLine[1])
                dates = this.calcDates(year, monthI)
             }else{
                dates = this.calcDates(year, month)
             }

            let hours = []
            for (let i = 0; i < 23; i++) {
                hours.push(('0' + (i + 1)).slice(-2))
            }

            let minutes = []
            for (let i = 0; i < 59; i++) {
                minutes.push(('0' + (i + 1)).slice(-2))
            }

            this.setData({
                years,
                months,
                dates,
                hours,
                minutes
            })
            this.current = [0, month, date - 1, hours.indexOf( hour < 10 ? ('0'+ hour) : ""+ hour),  minutes.indexOf( minute < 10 ? ('0'+ minute) : ""+ minute)]

            if (defaults) {
                let splitSpace=defaults.split(' ');
                let splitLine = splitSpace[0].split('-')
                let splitMarks = splitSpace[1].split(':')

                let yearI = years.indexOf(parseInt(splitLine[0]))
                let monthI = months.indexOf(splitLine[1])
                let dateI = dates.indexOf(splitLine[2])
                let hourI = hours.indexOf(splitMarks[0])
                let minuteI = minutes.indexOf(splitMarks[1])

                if (yearI > -1 && monthI > -1 && dateI > -1 && hourI > -1 && minuteI > -1) {
                    this.current = [yearI, monthI, dateI, hourI, minuteI]
                }
            }

            this.setData({
                current: this.current
            })
        },
        

        calcDates(year, month) {
            let lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            let length = lengths[month]

            if (month == 1) { // 二月
                if (year % 4 == 0 && year % 100 || year % 400 == 0) { // 闰年
                    length = 29
                }
            }

            let dates = []
            for (let i = 0; i < length; i++) {
                dates.push(('0' + (i + 1)).slice(-2))
            }

            return dates
        },
        
        //mark :省份城市
        regionList(defaults) {

            let citysList=[];
            let currProvinceIndex = 0,currCityIndex = 0;
            if(defaults) {
                citysList = this.calcCitys(defaults[0].province);
                for( var i = 0; i < provinces.length; i++ ){
                    if(defaults[0].province==provinces[i].province) {
                        currProvinceIndex = i;
                        break
                    }
                }
                for( var k = 0; k < citys.length; k++ ){
                    if(defaults[1].name==citys[k].name) {
                        currCityIndex = k;
                        break
                    }
                }
                this.current = [currProvinceIndex,currCityIndex]
            }else{
                citysList = this.calcCitys(provinces[0].province);

                this.current = [0,0]
            }
            this.setData({
                provinces:provinces,
                citys:citysList
            });


            console.log(this.current);
            this.setData({
                current: this.current
            })
        },

        calcCitys(province) {
            let citysList = []
            for(var i = 0; i < citys.length; i++ ) {
                if( citys[i].province == province){ //城市
                    citysList.push(citys[i]);
                }
            }    

            return citysList;
        },

        //任务类型 滚动
        taskTypeChange(e) {
            let value = e.detail.value
            this.current=value;
        },
        // 日期 滚动
        dateChange(e) {
            let value = e.detail.value

            console.log(value);

            if (value[0] != this.current[0] || value[1] != this.current[1]) {
                let year = this.data.years[value[0]]
                if (!year) return
                let month = value[1]

                let dates = this.calcDates(year, month)

                this.setData({
                    dates
                })
            }

            this.current = value
        },

        //省份滚动
        regionChange(e) {
            let value = e.detail.value

            console.log(value);
            if (value[0] != this.current[0] || value[1] != this.current[1]) {
                let province = this.data.provinces[value[0]]
                for( var i = 0; i < provinces.length; i++ ){
                    if(province.name == provinces[i].name) {
                        province = provinces[i].province;
                        break
                    }
                }
                let citysList = this.calcCitys(province)
                this.setData({
                    citys: citysList
                })
            }

            this.current = value
            this.setData({
                current: this.current    
            });
        },
        // mark: 完成
        tapDone() {
            if (this.data.showing == 'taskType') {
                let taskType = this.data.taskTypes[this.current]
                if (taskType) {
                    this.callback(taskType)
                }
            }else if (this.data.showing == 'date') {
                let year = this.data.years[this.current[0]]
                let month = this.data.months[this.current[1]]
                let date = this.data.dates[this.current[2]]
                let hour = this.data.hours[this.current[3]]
                let minute = this.data.minutes[this.current[4]]

                if (year && month && date && hour && minute) {
                    this.callback(`${year}-${month}-${date} ${hour}:${minute}`)
                }
            } 
        },

        tapCancel(e) {
            if (e.target.dataset.hide) {
                this.setData({
                    showing: null,
                })
            }
        },
    }
})
