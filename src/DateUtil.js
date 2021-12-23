import moment from "moment";
import 'moment/locale/zh-cn'

export function CurrentDate() {
    return moment().locale('zh-cn').format('YYYY-MM-DD dddd');
}
