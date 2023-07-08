import moment from "moment"
import momentTz from "moment-timezone"
import formatter from "format-number"
import { Link } from "react-router-dom"
import { TIMEZONE } from "../constants"
import { PATH_NAMES } from "@/constants/paths.constant"

/**
 * returns a comma separated string representation of a number
 *
 * @param {number} number
 * @param {string=} prefix
 *
 * @return {string} formatted string
 */

export const formatNumber = (number = 0, prefix = "₦") =>
  formatter({ prefix })(number % 1 !== 0 ? number.toFixed(2) : number)

/**
 * returns a comma separated string representation of a number
 * with K appended to it if it's greater than 999
 *
 * @param {number} number
 *
 * @return {string} formatted string
 */

export const formatNumberWithK = (number = 0) =>
  number > 999 ? `${Math.trunc(number / 1000)}k` : number

/**
 * converts an ISO date string to a more readable date format
 *
 * @param {string} isoString ISO date string to be formatted
 * @param {string=} format expected format (optional)
 *
 * @return {string} formatted date in the format 'Nov 13, 2022'
 */
export const formatDate = (isoString, format = "dddd, MMMM Do YYYY") =>
  moment(isoString).format(format)

/**
 * converts an ISO date string to a more readable time format
 *
 * @param {string} isoString ISO date string to be formatted
 * @param {string=} format expected format (optional)
 *
 * @return {string} formatted time eg. 4.23 PM
 */
export const formatTime = (isoString, format = "h.mm A") =>
  moment(isoString).format(format)

export const formatPhoneNumber = number =>
  `${number.slice(0, 4)} ${number.slice(4, 7)} ${number.slice(7)}`

/**
 * extracts only theISOString format of
 *
 * @param {Date} date ISO date to be formatted
 *
 * @return {string} extracted date eg. 2023-13-11
 */
export const extractDate = (date = new Date()) =>
  date.toISOString().slice(0, 10)

/**
 * returns a single number with leading zeros
 *
 * @param {number} num number to be padded
 *
 * @return {totalLength} total length of number padding
 */
export const addLeadingZeros = (num, totalLength) =>
  String(num).padStart(totalLength, "0")

/**
 * returns true if a number is even and false if otherwise
 *
 * @param {number} num
 *
 * @return {bool} true | false
 */

export const isEven = num => (num % 2 === 0 ? true : false)

/**
 * Converts a timestamp to a formatted date string.
 * @param {number} timestamp - The timestamp to convert.
 * @returns {string} The formatted date string.
 */
export const formatTimestampToDate = timestamp => {
  const date = new Date(timestamp)
  const formattedDate = date.toDateString()
  return formattedDate
}

/**
 * Formats a given time in milliseconds into a "time ago" format.
 * If the time is more than 24 hours ago, returns the normal date and time.
 * @param {number} timeInMilliseconds - The time in milliseconds to format.
 * @returns {string} The formatted time string.
 */
export const formatTimeAgo = timeInMilliseconds => {
  const currentTime = new Date().getTime()
  const timeDifference = currentTime - timeInMilliseconds

  // Calculate the time difference in seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 1) {
    // If the time is more than 24 hours, return the normal date and time
    const date = new Date(timeInMilliseconds)
    return `${formatDate(date, "ddd, MMMM Do YYYY")}, ${formatTime(date)}` // Adjust the format as needed
  } else if (days === 1) {
    return "1 day ago"
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  } else {
    return "Just now"
  }
}

/**
 * Format a comment text where only the part containing @{any_name} will be a link.
 *
 * @param {string} text - The comment text to format.
 * @param {object} user - The user who made the comment.
 * @returns {JSX.Element[]} - An array of formatted JSX elements.
 */
export const formatComment = (text, user) => {
  const pattern = /@{([^}]+)}/g
  const parts = text.split(" ")

  return parts.map((part, index) => {
    if (part.match(pattern)) {
      const username = part.slice(1)
      return (
        <Link
          key={index}
          to={`${PATH_NAMES.profile}/${user?.id}`}
          className="text-chasescrollBlue"
        >
          {`@${username}`}
        </Link>
      )
    } else {
      return <span key={index}>{part}</span>
    }
  })
}

/**
 * Converts a date string to an ISO string in the specified time zone.
 *
 * @param {string} dateString - The date string to convert.
 * @param {string} format - The format of the date string (e.g., 'YYYY-MM-DD h:mm a').
 * @param {string} timeZone - The time zone identifier (e.g., 'America/New_York').
 * @returns {string} The ISO string representation of the converted date.
 */
export const convertToISO = (dateString, format, timeZone = TIMEZONE) => {
  const date = momentTz.tz(dateString, format, timeZone);
  const isoString = date.toISOString();
  return isoString;
}
