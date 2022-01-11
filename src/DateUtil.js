import moment from "moment";
import 'moment/locale/zh-cn'

export function CurrentDate() {
    return moment().format('yyyy-MM-DD dddd');
}

function trans(d) {
    if (d < 10) {
        return `0${d}`;
    }
    return d;
}

export function dateformat(date) {
    return `${trans(date.getHours())}:${trans(date.getMinutes())}`
}
