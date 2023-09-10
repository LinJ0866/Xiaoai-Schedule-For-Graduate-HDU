async function scheduleHtmlProvider(dom = document) {
    // 引入小爱课程表工具箱
    await loadTool('AIScheduleTools')
    
    if (document.querySelector('h1').textContent != "我的课表") {
        await AIScheduleAlert('提取不到课表信息，请检查页面是否处于【教学管理】-【教学任务】-【我的课表】')
        return "do not continue"
    }

    let providerRes = dom.getElementsByClassName('fixed-table-body')[0]
    
    if (providerRes.outerText.indexOf("课程名称") == -1) {
        await AIScheduleAlert('需打开【课程名称】列')
        return "do not continue"
    }
    if (providerRes.outerText.indexOf("上课信息") == -1) {
        await AIScheduleAlert('需打开【上课信息】列')
        return "do not continue"
    }

    return providerRes.outerHTML
}