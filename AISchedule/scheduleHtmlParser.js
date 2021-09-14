//获取周数
function getDay(buff) {
    switch (buff) {
        case "周一":
            return 1
            break
        case "周二":
            return 2
            break
        case "周三":
            return 3
            break
        case "周四":
            return 4
            break
        case "周五":
            return 5
            break
        case "周六":
            return 6
            break
        case "周日":
            return 7
            break
    }
}
//获取周数
//处理周数
function getWeeks(origin) {
    sig = 0
    weeks = []
    if (origin.search('单') != -1) {
        sig = 1
    } else if (origin.search('双') != -1) {
        sig = 2
    }
    //判断单双普通周
    origin = origin.replace('单周', '')
    origin = origin.replace('双周', '')
    origin = origin.replace('周', '')
    origin = origin.replace('第', '')
    origin = origin.replace('[', '')
    origin = origin.replace(']', '')
    let start = origin.split('-')[0]
    let end = origin.split('-')[1]
    switch (sig) {
        case 0:
            for (let j = Number(start); j <= Number(end); j++) {
                weeks.push(j)
            }
            break
        case 1:
            for (let j = Number(start); j <= Number(end); j++) {
                if (j % 2) {
                    weeks.push(j)
                }
            }
            break
        case 2:
            for (let j = Number(start); j <= Number(end); j++) {
                if (j % 2 == 0) {
                    weeks.push(j)
                }
            }
            break
    }
    return weeks
}
//处理节数
function getSections(originSection) {
    section = []
    originSection = originSection.replace('节', '')
    let start = originSection.split('-')[0]
    let end = originSection.split('-')[1]
    for (let j = Number(start); j <= Number(end); j++) {
        section.push({
            "section": j
        })
    }
    return section
}
//数组去重
function distinct(arr) {
    let result = []
    let obj = {}
    for (let i of arr) {
        if (!obj[i]) {
            result.push(i)
            obj[i] = 1
        }
    }
    return result
}
function scheduleHtmlParser(html) {
    //jquery使用方法参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    let result = []
    let courseItems = $('.course-content')
    //选择所有课程信息
    for (let u = 0; u < courseItems.length; u++) {
        for (let ct = 1; ct <= courseItems[u].children.length - 1; ct++) {
            let courseInfoMap = {
                "name": "",
                "teacher": "暂不支持获取老师",
                "position": "",
                "day": "",
                "weeks": [],
                "sections": []
            }

            //获取课程名
            courseInfoMap.name = courseItems[u].children[0].children[0].children[0].children[0].children[0].data
            //获取课程名

            //获取老师姓名
            courseInfoMap.teacher = courseItems[u].children[ct].children[2].children[1].children[0].data
            //获取老师姓名

            //获取上课地点
            if (!courseItems[u].children[ct].children[1].children[1].children[0]) {
                //特殊处理某些网络课程可能会导致的BUG
                courseInfoMap.position = "网络课/实验课"
            } else {
                courseInfoMap.position = courseItems[u].children[ct].children[1].children[1].children[0].data
            }
            //获取上课地点

            //获取上课时间
            if (!courseItems[u].children[ct].children[0].children[1].children[0]) {
                //特殊处理某些网络课程不含有时间信息从而导致的BUG
                timeBuff = "第[19]周 周日 5-6节 14:30~16:00".split(" ")
            } else {
                timeBuff = courseItems[u].children[ct].children[0].children[1].children[0].data.split(" ")
            }
            //获取上课时间

            //处理上课时间
            courseInfoMap.day = getDay(timeBuff[timeBuff.length - 3])
            //周几
            for (let i = 0; i < timeBuff.length - 3; i++) {
                courseInfoMap.weeks = courseInfoMap.weeks.concat(courseInfoMap.weeks, getWeeks(timeBuff[i]))
            }
            courseInfoMap.weeks = distinct(courseInfoMap.weeks)//去重
            //第几周
            courseInfoMap.sections = getSections(timeBuff[timeBuff.length - 2])
            //第几节
            result.push(courseInfoMap)
        }
    }

    //打时间表
    let _sectionTimes = [{
        "section": 1,
        "startTime": "08:00",
        "endTime": "08:45"
    }, {
        "section": 2,
        "startTime": "08:45",
        "endTime": "9:30"
    }, {
        "section": 3,
        "startTime": "10:10",
        "endTime": "10:55"
    }, {
        "section": 4,
        "startTime": "10:55",
        "endTime": "11:40"
    }, {
        "section": 5,
        "startTime": "15:00",
        "endTime": "15:45"
    }, {
        "section": 6,
        "startTime": "15:45",
        "endTime": "16:30"
    }, {
        "section": 7,
        "startTime": "17:00",
        "endTime": "17:45"
    }, {
        "section": 8,
        "startTime": "17:45",
        "endTime": "18:30"
    }, {
        "section": 9,
        "startTime": "19:30",
        "endTime": "20:15"
    }, {
        "section": 10,
        "startTime": "20:15",
        "endTime": "21:00"
    }]
    let data = {
        "courseInfos": result,
        "sectionTimes": _sectionTimes
    }
    console.log(data)
    return data
}