// import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime'
// dayjs.extend(relativeTime)

export const formatDate = (dateObj: Date): string => `${dateObj.getFullYear()}-${('0' + (dateObj.getMonth() + 1).toString()).slice(-2)}-${('0' + dateObj.getDate().toString()).slice(-2)}`

// export const dateAsISO = (date: Date | string): string | undefined => (date !== null && date !== undefined) ? (new Date(date)).toISOString() : undefined
