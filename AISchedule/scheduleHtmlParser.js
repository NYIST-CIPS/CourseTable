//获取周数
function getDay(arr) {
    let buff = arr.parent.parent.parent.parent.parent.parent.children[0].children[0].children[0].data
    //呕
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
//获取周数结束

//获取教师姓名
//giveup~
//获取教师姓名结束

function scheduleHtmlParser(html) {
    //jquery使用方法参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    let result = []
    let courseItems = $('.target-item')
    for (let u = 0; u < courseItems.length; u++) {

        let courseInfoMap = { "name": "", "teacher": "暂不支持获取老师", "position": "", "day": "", "weeks": [], "sections": [] }

        //获取课程名称
        courseInfoMap.name = courseItems[u].children[0].children[2].data.replace(/ /g, "")
        //获取课程名称结束

        //获取教室
        if (!courseItems[u].children[1].children[0]) {
            //特殊处理某些网络课程可能会导致的BUG
            courseInfoMap.position = "网络课"
        }
        else {
            courseInfoMap.position = courseItems[u].children[1].children[0].data
        }
        //获取教室结束

        //获取老师
        //giveup
        /*需要模拟点击再传入html,后续将支持*/
        //获取老师结束

        //分割周数、节数、时间
        if (!courseItems[u].children[2]) {
            //特殊处理某些网络课程可能会导致的BUG
            buff = "19周 5-6节 14:30~16:00".split(" ")
        }
        else {
            buff = courseItems[u].children[2].children[0].data.split(" ")
        }
        //分割结束

        //处理周数
        let buffFix = courseItems[u].children[2].children[0].data.split("周")//判断多段周数
        buffFix = buffFix[0].split(" ")
        //console.log(buff)
        if (buff[0].search('单') != -1) {
            buff[0] = buff[0].replace('单周', '')
            buff[0] = buff[0].replace('[', '')
            buff[0] = buff[0].replace(']', '')
            let weekRange = buff[0]
            let start = buff[0].split('-')[0]
            let end = buff[0].split('-')[1]
            //console.log(weekRange)
            //console.log(buff[0])
            for (let j = Number(start); j <= Number(end); j++) {
                if (j % 2) {
                    courseInfoMap.weeks.push(j)
                }
            }
        }
        else if (buff[0].search('双') != -1) {
            buff[0] = buff[0].replace('双周', '')
            buff[0] = buff[0].replace('[', '')
            buff[0] = buff[0].replace(']', '')
            let weekRange = buff[0]
            let start = buff[0].split('-')[0]
            let end = buff[0].split('-')[1]
            //console.log(weekRange)
            //console.log(buff[0])
            for (let j = Number(start); j <= Number(end); j++) {
                if (j % 2 == 0) {
                    courseInfoMap.weeks.push(j)
                }
            }
        }
        else if (buffFix.length!=1) {
            for(let weekCut = 0;weekCut<buffFix.length;weekCut++){
                buffFix[weekCut] = buffFix[weekCut].replace('[', '')
                buffFix[weekCut] = buffFix[weekCut].replace(']', '')
                let weekRange = buffFix[weekCut]
                let start = buffFix[weekCut].split('-')[0]
                let end = buffFix[weekCut].split('-')[buffFix[weekCut].split('-').length - 1]
                //console.log(weekRange)
                //console.log(buff[0])
                for (let j = Number(start); j <= Number(end); j++) {
                    courseInfoMap.weeks.push(j)
                }
            }
        }
        else {
            buff[0] = buff[0].replace('周', '')
            buff[0] = buff[0].replace('[', '')
            buff[0] = buff[0].replace(']', '')
            let weekRange = buff[0]
            let start = buff[0].split('-')[0]
            let end = buff[0].split('-')[buff[0].split('-').length - 1]
            //console.log(weekRange)
            //console.log(buff[0])
            for (let j = Number(start); j <= Number(end); j++) {
                courseInfoMap.weeks.push(j)
            }
        }
        //处理结束

        //处理节数
        let sectionPosition = buff.length-2
        buff[sectionPosition] = buff[sectionPosition].replace('节', '')
        let sectionRange = buff[sectionPosition]
        let start = buff[sectionPosition].split('-')[0]
        let end = buff[sectionPosition].split('-')[1]
        //console.log(sectionRange)
        //console.log(buff[1])
        for (let j = Number(start); j <= Number(end); j++) {
            courseInfoMap.sections.push({ "section": j })
        }

        //获取天
        courseInfoMap.day = getDay(courseItems[u])
        //获取天结束

        //处理上课时间
        //courseInfoMap.sections
        result.push(courseInfoMap)
    }
    //console.log(result)

    //打时间表
    let _sectionTimes = [
        {
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
    let data = { "courseInfos": result, "sectionTimes": _sectionTimes }
    console.log(data)
    return data
}