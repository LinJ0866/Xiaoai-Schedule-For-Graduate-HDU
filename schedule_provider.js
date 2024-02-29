async function scheduleHtmlProvider(dom = document) {
    // 引入小爱课程表工具箱
    await loadTool('AIScheduleTools')
    try {
        const response = await fetch('/cultivate/teachtask/cultivateTeachtask/loadTaskCourseListByStu?rows=50&page=1&order=asd', {
            method: 'POST',
            credentials: 'include',  // 包括跨域请求中的cookie
        })
        if (!response.ok) {
            return 'do not continue'
        }
        const res = await response.json()
        let courseData = res.rows

        let semesterList = []
        // 检查学期
        for (let classItem of courseData) {
            if (semesterList.indexOf(classItem.termName) == -1) {
                semesterList.push(classItem.termName)
            }
        }
        // 选择导入学期
        if (semesterList.length > 1) {
            const currentsemester = await AIScheduleSelect({
                titleText: '选择学期', // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
                contentText: '请选择需要导入的学期', // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，为必传，不传显示版本号
                selectList: semesterList
            })
            courseData = await courseData.filter(function(item) {
                return item.termName == currentsemester
            });
        }
        return JSON.stringify(courseData)
    } catch (error) {
        console.error(error)
        await AIScheduleAlert(error.message)
        return 'do not continue'
    }
}