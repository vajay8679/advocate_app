import Configuration from '../configs/Config';

export const getMediaUrl = (fileName, dir = 'images') => {
    return `${Configuration.mediaUrl}${Configuration.assetDir}/${dir}/${fileName}`;
}

export const getAssetUrl = () => {

}

export const isToday = date => {
    const today = new Date()
    return (
        /* eslint-disable operator-linebreak */
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
        /* eslint-enable */
    )
}
/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = {month: 'short', day: 'numeric', year: 'numeric'}) => {
    if (!value) return value
    // @ts-ignore
    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
    const date = new Date(value)
    let formatting = {month: 'short', day: 'numeric'}

    if (toTimeForCurrentDay && isToday(date)) {
        // @ts-ignore
        formatting = {hour: 'numeric', minute: 'numeric'}
    }

    // @ts-ignore
    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 *
 * @param pageNo
 * @param pageSize
 * @param index
 */
export const calculateSerialNo = (pageNo, pageSize, index) => {
    let sNo = index + 1;
    if (pageNo > 1) {
        sNo = ((pageNo - 1) * pageSize) + sNo;
    }
    return sNo;
}

/**
 *
 * @param month
 */
export const getMonthName = (month) => {
    const months = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec',
    };
    return (typeof months[month] === "undefined") ? '' : months[month];
}

/**
 *
 * @param amount
 */
export const formatRazorPayAmount = (amount) => {
    return parseInt(amount) / 100;
}

/**
 *
 * @param date
 */
export const formatDateTime = (date) => {
    if(!date){
        return 'N/A';
    }
    const newDate = new Date(date);
    const dateStr = newDate.getDate() + ' ' + (getMonthName(newDate.getMonth() + 1)) + ', ' + newDate.getFullYear();
    //const timeStr = newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
    const timeStr = formatAMPM(newDate);
    return dateStr + ' ' + timeStr;
}

/**
 *
 * @param date
 */
export const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return strTime;
}


export const getRandomColor = () =>  {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
};


export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
};

export const generateItems = (count, creator) => {
    const result = [];
    for (let i = 0; i < count; i++) {
        // @ts-ignore
        result.push(creator(i));
    }
    return result;
};

export const nl2br = (str) => {
    return str;
}

export const replaceAtStringIndex = function(string, index, replacement) {
    return string.substring(0, index) + replacement + string.substring(index + replacement.length);
}
