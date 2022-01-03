import moment from "moment";
import 'moment/locale/zh-cn'

export function CurrentDate() {
    return moment().format('yyyy-MM-DD dddd');
}
