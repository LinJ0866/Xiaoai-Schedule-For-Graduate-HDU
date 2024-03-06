var weekDayNumer = {
    '一': 1,
    '二': 2,
    '三': 3,
    '四': 4,
    '五': 5,
    '六': 6,
    '日': 7,
}

function generateList(range, even, odd) {
    let res = []
    let start = parseInt(range[0])
    let end = parseInt(range[1])
    for (let i = start; i <= end; i+=1) {
        if ((even && i % 2 == 1) || odd && i % 2 == 0) {
            res.push(i)
        }
    }
    return res
}

// 返回 周次，星期，节次
function parseTime(str) {
    // console.log(str)
    let reg = /第(\d+)-(\d+)周（([\u4e00-\u9fa5]+)周）星期([\u4e00-\u9fa5])第(\d+)-(\d+)节/g
    let timescope = reg.exec(str) 

    let weeks = []
    const even = timescope[3].indexOf('单') != -1
    const odd = timescope[3].indexOf('双') != -1

    weeks = generateList([timescope[1], timescope[2]], even, odd)

    return [weeks, weekDayNumer[timescope[4]], generateList([timescope[5], timescope[6]], true, true)]
}

// 入口函数
function scheduleHtmlParser(courseText) {
    const courseData = JSON.parse(courseText)
    var result = new Array()

    for(let course of courseData) {
        let courseItem = {
            name: '',
            day: 0,
            weeks: '',
            sections: '',
            teacher: '',
            position: '',
        }
        courseItem.name = course.courseName
        const time = parseTime(course.attendClass)
        courseItem.weeks = time[0]
        courseItem.day = time[1]
        courseItem.sections = time[2]
        courseItem.teacher = course.teachers.replace('【', '').replace('】', '')
        courseItem.position = course.roomName.replace(/第([0-9]{1,2})教研楼/, '$1教')
        result.push(courseItem)
    }
    return result
}
