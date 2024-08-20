import { ClassValue, clsx } from 'clsx'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dateFormatter = (number: number) => {
  const timeValue = moment(number).format('MMMM Do YYYY, h:mm:ss a').toString()
  return timeValue
}
