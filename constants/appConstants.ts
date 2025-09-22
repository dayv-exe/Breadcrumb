export const SUGGESTED_EMAIL_DOMAINS = [
  "@gmail.com",
  "@icloud.com"
]
export const MAX_AGE = 120
export const MIN_AGE = 13
export const MAX_USERNAME_LEN = 15
export const MIN_USERNAME_LEN = 3
export const MAX_FULLNAME_LEN = 20
export const MAX_RIDICULOUS_AGE = 120
export const MIN_RIDICULOUS_AGE = -21
export const MAX_VIDEO_DURATION_MILLISECONDS = 15000
export const MAX_SEARCH_STRING_CHARS = 20

export const STATUS_FRIENDS = "true"
export const STATUS_REQUESTED = "requested"
export const STATUS_RECEIVED = "received"
export const STATUS_NOT_FRIENDS = "false"
export enum FRIENDSHIP_STATUS {
  FRIENDS = STATUS_FRIENDS,
  REQUESTED = STATUS_REQUESTED,
  RECEIVED = STATUS_RECEIVED,
  NOT_FRIENDS = STATUS_NOT_FRIENDS,
}

export enum FRIENDSHIP_ACTIONS {
  REQUEST = "request",
  CANCEL_REQUEST = "cancel-request",
  ACCEPT = "accept",
  REJECT = "reject",
  END = "end",
  GET_FRIENDS = "all",
  GET_REQUESTS = "pending",
}