var weekDayNumer = {
    '一': 1,
    '二': 2,
    '三': 3,
    '四': 4,
    '五': 5,
    '六': 6,
    '日': 7,
}

function generateList(range, stride) {
    let res = []
    let start = parseInt(range[0])
    let end = parseInt(range[1])
    for (let i = start; i <= end; i+=stride) {
        res.push(i)
    }
    return res
}

// 返回 周次，星期，节次
function parseTime(str) {
    console.log(str)
    let reg = /第(\d+)-(\d+)周（([\u4e00-\u9fa5]+)周）星期([\u4e00-\u9fa5])第(\d+)-(\d+)节/g
    let timescope = reg.exec(str) 

    let weeks = []
    if (timescope[3] == '单双') {
        weeks = generateList([timescope[1], timescope[2]], 1)
    } else if (timescope[3] == '单' || timescope[3] == '双') {
        weeks = generateList([timescope[1], timescope[2]], 2)
    }

    return [weeks, weekDayNumer[timescope[4]], generateList([timescope[5], timescope[6]], 1)]
}

// 入口函数
function scheduleHtmlParser(html) {
    var result = new Array()

    // 解析表头
    var columnId = {
        name: -1,
        teacher: -1,
        time: -1,
        position: -1
    }

    let head = $('thead th')
    for (let i = 0; i < head.length; i++) {
        switch (head[i].attribs['data-field']) {
            case "courseName":
                columnId['name'] = i
                break
            case "teachers":
                columnId['teacher'] = i
                break
            case "attendClass":
                columnId['time'] = i
                break
            case "roomName":
                columnId['position'] = i
                break
        }
    }

    // 解析课程
    let body = $('tbody tr')
    for (let i = 0; i < body.length; i++) {
        let courseItem = {
            name: '',
            day: 0,
            weeks: '',
            sections: '',
            teacher: '',
            position: ''
        }
        let courseHtml = $(body[i]).children()
        
        if (columnId.name == -1 || columnId.time == -1) {
            console.log("error: 解析不到课程名称和时间")
            return
        }
        courseItem.name = courseHtml[columnId.name].attribs['title']
        let time = parseTime(courseHtml[columnId.time].attribs['title'])
        courseItem.weeks = time[0]
        courseItem.day = time[1]
        courseItem.sections = time[2]
        if (columnId.teacher != -1) {
            courseItem.teacher = courseHtml[columnId.teacher].attribs['title'].replace('【', '').replace('】', '')
        }
        if (columnId.position != -1) {
            courseItem.position = courseHtml[columnId.position].attribs['title'].replace(/第([0-9]{1,2})教研楼/, '$1教')
        }
        result.push(courseItem)
    }

    return result
}
