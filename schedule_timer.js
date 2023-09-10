/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({providerRes,parserRes} = {}) {
    let showWeekend = false
    let maxWeek = 0
    for (let classItem of parserRes) {
        if (classItem.day > 5) {
            showWeekend = true
        }
        maxWeek = Math.max(maxWeek, classItem.weeks[classItem.weeks.length-1])
    }

    weekList = ['未开学']
    for (let i = 1; i <= maxWeek; i++) {
        weekList.push(String(i))
    }
    const currentWeek = await AIScheduleSelect({
        // titleText: '提示', // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
        contentText: '本周为第几周？', // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，为必传，不传显示版本号
        selectList: weekList
    })
    startSemeter = ''
    if (currentWeek != '未开学') {
        let now =new Date();
        let nowTime =now.getTime();
        let day =now.getDay();
        const oneDayTime =24*60*60*1000;
        startSemeter =nowTime - ((day+6)%7+(currentWeek-1)*7)*oneDayTime
    }

    return {
        totalWeek: maxWeek, // 总周数：[1, 30]之间的整数
        startSemester: startSemeter, // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: showWeekend, // 是否显示周末
        forenoon: 5, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 3, // 晚间课程节数：[0, 10]之间的整数
        sections: [
            {
                section: 1,
                startTime: "08:05",
                endTime: "08:50"
            },
            {
                section: 2,
                startTime: "08:55",
                endTime: "09:40"
            },
            {
                section: 3,
                startTime: "10:00",
                endTime: "10:45"
            },
            {
                section: 4,
                startTime: "10:50",
                endTime: "11:35"
            },
            {
                section: 5,
                startTime: "11:40",
                endTime: "12:25"
            },
            {
                section: 6,
                startTime: "13:30",
                endTime: "14:15"
            },
            {
                section: 7,
                startTime: "14:20",
                endTime: "15:05"
            },
            {
                section: 8,
                startTime: "15:15",
                endTime: "16:00"
            },
            {
                section: 9,
                startTime: "16:05",
                endTime: "16:50"
            },
            {
                section: 10,
                startTime: "18:30",
                endTime: "19:15"
            },
            {
                section: 11,
                startTime: "19:20",
                endTime: "20:05"
            },
            {
                section: 12,
                startTime: "20:10",
                endTime: "20:55"
            }
        ]
    }
}