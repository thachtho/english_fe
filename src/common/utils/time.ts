import dayjs from 'dayjs'

const showDate = (date: Date | null | undefined) => {
    if (!date) return ""
    return date ? dayjs(date).format('DD-MM-YYYY HH:mm:ss') : ''
}

const showMinute = (targetTimeString: Date | null | undefined) => {
    if (!targetTimeString) return ""
    const pastTime = dayjs(targetTimeString)
    const now = dayjs()
    const diffInMinutes = now.diff(pastTime, 'minute')

    return diffInMinutes
}

const timeAgo = (time: dayjs.Dayjs | string) => {
    const target = dayjs(time);
    const now = dayjs();
    const diffMinutes = now.diff(target, "minute");
    if (diffMinutes < 1) {
        return "vừa xong";
    }
    else if (diffMinutes < 60) {
        return `${diffMinutes} phút trước`
    } else {
        const diffHours = now.diff(target, "hour");
        return `${diffHours} giờ trước`
    }
}

export { showDate, showMinute, timeAgo }
