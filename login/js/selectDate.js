/*
	名称：手势拖动选择日期-移动端
    邮箱：helang.love@qq.com
    作者：helang
*/

;$.extend({
    /* 年月日版 */
    selectDate: function (el, info, cbFn) {
        var createDateData = function (start, end) {
            var dateData = [{data: []}];
            var returnDayLen = function (year, month) {
                if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                    return 31
                } else if (month == 2) {
                    if (year % 4 == 0 && year % 100 != 0) {
                        return 29
                    } else if (year % 400 == 0) {
                        return 29
                    } else {
                        return 28
                    }
                } else {
                    return 30
                }
            };
            for (var x = start; x <= end; x++) {
                var data = {id: x, value: x + "年", childs: []};
                for (var y = 1; y <= 12; y++) {
                    var dayArr = [];
                    var len = returnDayLen(x, y);
                    for (var z = 1; z <= len; z++) {
                        dayArr.push({id: z, value: z + "日"})
                    }
                    data.childs.push({id: y, value: y + "月", childs: dayArr})
                }
                dateData[0].data.push(data)
            }
            return dateData
        };
        var infoData = {}, now = new Date();
        if (!info.start || !info.end || info.end < info.start) {
            infoData.start = now.getFullYear() - 60;
            infoData.end = now.getFullYear()
        } else {
            infoData.start = info.start;
            infoData.end = info.end
        }
        if (!info.select || info.select.length != 3) {
            infoData.select = [infoData.end - infoData.start, now.getMonth(), now.getDate() - 1]
        } else {
            infoData.select = [info.select[0] - infoData.start, info.select[1] - 1, info.select[2] - 1]
        }
        var selectDate = new MobileSelect({
            trigger: el,
            triggerDisplayData:false,
            wheels: createDateData(infoData.start, infoData.end),
            position: infoData.select,
            callback: function (item, data) {
                var dateInfo = {year: data[0].id, month: data[1].id, day: data[2].id};
                cbFn && cbFn(dateInfo)
            }
        });
        return selectDate;
    },
    
});