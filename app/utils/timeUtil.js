import moment from 'moment';
import momentLocale from 'moment/locale/zh-cn';

moment.updateLocale('zh-cn', momentLocale);

const second = 1000;
const min = second * 60;
const hour = min * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 30 * 11;

/**
 * 时间转化
 */
export default function resolveTime(longTime) {
    if (!longTime)
        return "";
    let now = moment().toDate().getTime();
    let time = moment(longTime).toDate().getTime();
    let delta = now - time;
    return calcTimer(delta, time)
}


function calcTimer(delta, ori) {
    let res = '';
    let list = Object.keys(calculator).sort((a, b) => b - a);
    for (let i = 0, key = list[i]; key; key = list[++i]) {
        if (delta > key) {
            let a = Math.floor(delta / key);
            let b = delta % key;
            res = calculator[key](a, b, ori);
            break
        }
    }
    if (res === '') {
        res = '刚刚'
    }
    return res
}

const calculator = {
    [year]:(a, b, ori) => {
        return moment(ori).format('YYYY-MM-DD')
    },
    [week]: (a, b, ori) => {
        return moment(ori).format('MM-DD HH:mm')
    },
    [day]: (a, b, ori) => {
        return a + '天前'
    },
    [hour]: (a, b) => {
        return a + '小时前'
    },
    [min]: (a, b) => {
        return a + '分钟前'
    },
    [second]: (a, b) => {
        return '刚刚'
    }
};