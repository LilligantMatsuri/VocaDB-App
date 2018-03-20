import moment from 'moment'

export const yesterday = () => moment.utc().subtract(1, 'd').format()
export const dateAfterToday = (next) => moment.utc().add(next, 'd').format()