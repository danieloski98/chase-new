export const BASE_URL =
  "http://ec2-3-134-231-37.us-east-2.compute.amazonaws.com:8080" // ----> DEV ENV
export const AUTH_URL =
  "http://ec2-3-134-231-37.us-east-2.compute.amazonaws.com:8081" // ----> DEV ENV

export const SIGN_IN = "/auth/signin"
export const SIGN_UP = "/auth/signup"
export const GET_FIREBASE_TOKEN = "/auth/get-firebase-token"
export const EMAIL_CHECK = "/chasescroll/verification/send-email"
export const USERNAME_CHECK = "/auth/username-check"
export const DELETE_USER = "/auth/deleteUser"

// export const SIGN_IN = "http://18.220.120.164:8081/oauth/token";
export const SIGN_IN_WITH_CREDENTIALS = "/auth/signinWithCredentials"
export const REFRESH_ACCESS_TOKEN = "?grant_type=refresh_token&refresh_token="

/// ------ NotificationAPI
export const PUSH_NOTIFICATION = "/notification-api/push-notification/"
export const GET_CHECK_NUMBER = "/auth/check-number"
export const GET_CHECK_NUMBERS = "/auth/check-numbers"
export const SEND_SMS_VALIDATION_NUMBER = "/sms/sendValidateNumber"
export const NOTIFICATIONS = "/notifications/notification"
export const READ_NOTIFICATIONS = "/notifications/read-notification"

/// ------ ResourceAPI
export const UPLOAD_IMAGE = "/resource-api/upload-image/"
export const DOWNLOAD_IMAGE = "/resource-api/download-image/"
export const QR_IMAGE = "/resource-api/download-QR/"
export const UPLOAD_FILES = "/resource-api/upload/"
export const DOWNLOAD_VIDEO = "/resource-api/download-video/"
export const UPLOAD_VIDEO = "/resource-api/upload-video/"
export const CREATE_NAME = "/resource-api/create-name"
export const LIKE_UNLIKE_POST = "/feed/like-post/"

/// ------ FeedAPI
export const CREATE_POST = "/feed/create-post"
export const EDIT_POST = "/feed/edit-post"
export const GET_USER_POSTS = "/feed/get-all-user-posts"
export const GET_GROUP_POSTS = "/feed/get-all-group-posts/"
export const GET_USER_FEED_DATA = "/feed/get-user-feed-data"
export const GET_POST = "/feed/get-post/"
export const GET_POST_LIST = "/feed/get-user-and-friends-posts"
export const SHARE_POST = "/feed/share-post"
export const ADD_POST_COMMENT = "/feed/add-comment"
export const ADD_POST_SUB_COMMENT = "/feed/add-sub-comment"
export const ADD_POST_VIEW = "/feed/add-view"
export const GET_ALL_POST_COMMENTS = "/feed/get-all-comments/"
export const GET_ALL_POST_SUB_COMMENTS = "/feed/get-all-sub-comments"
export const LIKE_FEED_COMMENT = "/feed/like-comment"
export const LIKE_FEED_SUB_COMMENT = "/feed/like-sub-comment"
export const LIKE_POST = "/feed/like-post"
export const REMOVE_FEED_COMMENT = "/feed/remove-comment"
export const REMOVE_FEED_SUB_COMMENT = "/feed/remove-sub-comment"
export const GET_SUB_COMMENT_COUNT = "/feed/get-sub-comment-count/"
export const REMOVE_POST = "/feed/remove-post"
export const GET_MINE_AND_FRIENDS_POSTS = "/feed/get-user-and-friends-posts"
export const GET_USER_MEDIA_POSTS = "/feed/get-users-media-posts"
export const GET_USER_IMAGE_POSTS = "/feed/get-users-image-posts/"
export const GET_OTHER_USER_POST_COUNT = "/feed/get-all-other-user-post-count/"
export const GET_USER_MEDIA_POST_COUNT = "/feed/get-user-media-post-count/"

/// ------ UserAPI
export const GET_USER_PRIVATE_PROFILE = "/user/privateprofile"
export const GET_USER_PUBLIC_PROFILE = "/user/publicprofile/"
export const ADD_PROFILE_IMAGE = "/user/add-profile-image"
export const UPDATE_MAIN_PROFILE_IMAGE = "/user/update-main-profile-image"
export const UPDATE_PROFILE = "/user/update-profile"
export const BLOCK_USER = "/user/block"
export const EDIT_BLOCK = "/user/edit-block"
export const DELETE_BLOCK = "/user/delete-block/"
export const FEED_BLOCKLIST = "/user/get_feed_blocklist"
export const USER_BLOCKLIST = "/user/blocklist"
export const BLOCKED_BY = "/user/get_blocked_by_blocklist"
export const COMMENT_BLOCKLIST = "/user/get_post_comment_blocklist"
export const CHATLIST_BLOCKLIST = "/user/get_chatlist_blocklist"
export const CHAT_BLOCKLIST = "/user/get_chat_blocklist"
export const EVENT_BLOCKLIST = "/user/get_event_blocklist"
export const GROUP_BLOCKLIST = "/user/get_group_blocklist"

/// ------ UserApi.FriendsController
export const GET_FRIEND_LIST = "/user/get-friends"
export const GET_USER_FRIEND_LIST = "/user/get-users-friends/"
export const GET_FRIEND_REQUESTS = "/user/friend-requests"
export const SEND_FRIEND_REQUEST = "/user/send-friend-request"
export const REMOVE_FRIEND = "/user/remove-friend/"
export const ACCEPT_FRIEND_REQUEST = "/user/accept-friend-request"
export const REJECT_FRIEND_REQUEST = "/user/reject-friend-request"
export const ALL_FRIEND_REQUEST_SENT = "/user/friend-requests-sent"
export const GET_FRIENDSHIP_OBJECTS = "/user/get-friendship-objects"
export const GET_FRIEND_COUNT = "/user/get-friend-count/"
export const GET_FRIEND_REQ = "/user/get-friend-request/"
export const GET_SUGGESTED_FRIENDS = "/user/suggest-connections"
export const GET_USER_CONNECTION_LIST = "/user/get-users-connections/"

/// ------ EventAPI
export const CREATE_EVENT = "/events/create-event"
export const UPDATE_EVENT = "/events/update-event"
export const DELETE_EVENT = "/events/delete-event/"
export const GET_EVENT_BY_ID = "/events/get-event-by-id/"
export const GET_EVENTS_TYPES = "/events/get-event-types"
export const GET_JOINED_EVENTS = "/events/joined-events/"
export const GET_PAST_EVENTS = "/events/get-past-events"
export const GET_SAVED_EVENTS = "/events/get-saved-events"
export const JOIN_EVENT = "/events/join-event"
export const LEAVE_EVENT = "/events/leave-event"
export const GET_ALL_PUBLIC_EVENTS_TO_JOIN = "/events/events"
export const GET_ALL_PUBLIC_EVENTS = "/events/get-all-public-events"
export const GET_ALL_EVENT_MEMBERS = "/events/get-event-members/"
export const ADD_TO_GROUP = "/events/add-to-group"
export const UPDATE_EVENT_MEMBER = "/events/update-event-member"
export const ACCEPT_REQUEST = "/events/accept-request/"
export const DECLINE_REQUEST = "/events/decline-request/"
export const SEARCH_EVENTS = "/events/search-events"
export const GET_EVENT_COUNT = "/events/get-event-count/"
export const GET_REQUESTS = "/events/get-requests"
export const SAVE_EVENT = "/events/save-event"
export const REMOVE_SAVED_EVENT = "/events/remove-saved-event"
export const SUGGEST_EVENT = "/events/suggest-event"
export const GET_TOP_EVENTS = "/events/get-top-events"
export const CREATE_REVIEW = "/events/create-review"
export const EDIT_REVIEW = "/events/edit-review"
export const DELETE_REVIEW = "/events/delete-review/"
export const CREATE_SALE = "/events/create-sale"
export const EDIT_SALE = "/events/edit-sale"
export const DELETE_SALE = "/events/delete-sale/"
export const CREATE_TICKET = "/events/create-ticket"
export const EDIT_TICKET = "/events/edit-ticket"
export const DELETE_TICKET = "/events/delete-ticket/"
export const DELETE_TICKETS = "/events/delete-tickets"
export const GET_REVIEW = "/events/get-review/"
export const GET_EVENT_REVIEWS = "/events/get-event-reviews/"
export const GET_USER_REVIEWS = "/events/get-user-reviews/"
export const GET_USER_EVENT_REVIEW = "/events/get-user-event-review"
export const GET_SALE = "/events/get-sale/"
export const GET_COUPON_CODE = "/events/get-coupon-code/"
export const CONFIRM_PAYMENT = "/events/confirm-payment"
export const PAYMENT_FAILED = "/events/payment-failed"
export const GET_TICKET = "/events/get-ticket/"
export const VALIDATE_TICKET = "/events/validate-ticket/"
export const GET_USERS_TICKETS = "/events/get-users-tickets/"
export const GET_USERS_EVENT_TICKETS = "/events/get-users-event-tickets/"
export const GET_USERS_EVENT_ACTIVE_TICKETS =
  "/events/get-users-event-active-tickets/"
export const GET_EVENT_TICKETS = "/events/get-event-tickets/"
export const GET_SOLD_TICKET_COUNT = "/events/get-sold-ticket-count/"

// final String DELETE_EVENT = "/"

/// ------ GroupAPI
export const CREATE_GROUP = "/group/create-group"
export const CREATE_SUB_GROUP = "/group/create-sub-group"
export const GET_GROUP = "/group/group"
export const REQUEST_TO_JOIN_GROUP = "/group/request-to-join-group"
export const LEAVE_GROUP = "/group/leave-group"
export const JOIN_GROUP = "/group/join-group"
export const DELETE_GROUP = "/group/delete-group/"
export const UPDATE_GROUP = "/group/update-group"
export const CHANGE_ROLE_IN_GROUP = "/group/change-role"
export const BLOCK_GROUP = "/group/block-group"
export const GET_USER_BLOCK_LIST_FOR_GROUP = "/group/get-your-blocklist/"
export const GET_GROUP_BLOCKLIST = "/ge/groupt-group-blocklist/"
export const REMOVE_FROM_GROUP_BLOCKLIST = "/group/remove-from-blocklist"
export const GET_ALL_PUBLIC_GROUPS_TO_JOIN = "/group/find-groups"
export const GET_ALL_PUBLIC_GROUPS = "/group/get-all-public-groups"
export const GET_ALL_MY_GROUPS = "/group/get-my-groups/"
export const GET_MY_GROUPS = "/group/get-created-groups/"
export const GET_JOINED_GROUPS = "/group/joined-groups"
export const GET_GROUP_REQUESTS = "/group/get-requests/"
export const GET_GROUP_MEMBERS = "/group/get-group-members/"

export const GET_MY_SUB_GROUPS = "/group/get-my-sub-groups/"
export const GET_MY_GROUP_MEMBER = "/group/get-my-group-member/"
export const GET_ALL_AVAILABLE_SUB_GROUPS = "/group/get-available-sub-groups/"
export const GET_GROUP_COUNT = "/group/get-group-count/"

/// ------ RequestAPI
export const CREATE_REQUEST = "/group/create-group"
export const RESOLVE_REQUEST = "/user-request-api/resolve-request"
export const GET_ALL_USER_REQUESTS = "/user-request-api/get-all-user-requests/"
export const GET_ALL_USER_TYPE_REQUESTS =
  "/user-request-api/get-all-user-type-requests/"
export const GET_REQUEST = "/user-request-api/get-request/"
export const GET_ALL_REQUESTS_FOR_TYPE =
  "/user-request-api/get-all-requests-for-type/"
export const GET_USER_TYPE_REQUEST = "/user-request-api/get-user-type-request/"

///  ------ SearchAPI
export const SEARCH_REQUEST = "/search-api/search"

export const USERS = "/users"
export const GROUPS = "/groups"
export const USER_GROUP = "/user-group"
export const CONTRIBUTION = "/contribution"
export const CONTRIBUTION_TYPE = "/contribution-type"
export const KIDS = "/kids"
export const PAYPAL = "/paypal"
export const TRAINING = "/trainings"
export const ACTIVITY_NEW = "/activity"
export const ENROLlMENT = "/enrollments"
export const ENROLLMENT_ACTIVITY = "/enrollmentsactivity"
export const DOCUMENT = "/documents"
export const DOCUMENT_UPLOAD = "/file/save"
export const ACTIVITIES = "/activities"
export const PURCHASE = "/purchases"
export const MAIL_GROUP = "/mail/group"
export const PHOTO_DISPLAY = "/photo"

export const ORGANIZATION = "/organization"
export const ORGANIZATION_JOIN_REQUEST = "/organization/join-request"
export const ORGANIZATION_ADD_USER = "/organization/add"
export const ORGANIZATIONS_REMOVE_USER = "/organization/remove_user"
export const ORGANIZATION_GET_ALL_WITH_USER = "/organization/get_all_with_user/"

// final String ORG_USERNAME_CHECK = "/check-username";
export const VERIFY_EMAIL = "/verification/email"
export const RESET_PASSWORD = "/verification/forgot-password"
export const VERIFY_RESET_PASSWORD = "/verification/password"
export const STATEMENT_GENERATE = "/contribution/statement"
export const EAMAIL_STATEMENT = "/mail/contribution"
export const EXPENDITURE = "/expenditure"
export const EXPENDITURE_STATEMENT_GENERATE = "/expenditure/statement"
export const EXPENDITURE_EMAIL_STATEMENT = "/mail/expenditure"
export const ORG_USER = "/org-user"
export const STRIPE_CUSTOMER = "/stripe/customer"
export const STRIPE_CHARGE = "/payment/charge"
export const STRIPE_CHARGE_CARD = "/stripe/charge-card"
export const STRIPE_ACCOUNT = "/stripe/account"
export const STRIPE_ACCOUNT_BALANCE = "/stripe/balance"
export const STRIPE_ACCOUNT_LINK = "/stripe/account/link"
export const STRIPE_ACCOUNT_PAYOUT = "/stripe/payout"
export const VERIFY_ACCOUNT_OTP = '/verification/verify-token'

//ConferenceAPI
export const CREATE_CONFERENCE = "/conference-api/create-conference"
export const JOIN_CONFERENCE = "/conference-api/join-conference"
export const LEAVE_CONFERENCE = "/conference-api/leave-conference"
export const GETCALLLIST = "/conference-api/get-call-list/"

/*
smsAPI
*/
export const SEND_VALIDATION_NUMBER = "/sms-api/sms/sendValidateNumber"
export const VERIFY_THE_NUMBER = "/sms-api/sms/verifyTheNumber"
export const IS_VERIFIED = "/sms-api/sms/isVerified"

/*
Email API
*/
export const EMAIL_BASE = "/email-api/"
export const EMAIL_BUG_REPORT = EMAIL_BASE + "/send-bug-report"

/*
payment-service
*/
export const ATTACH_PAYMENT_METHOD = "/payment/attach_payment_method/"
export const REMOVE_PAYMENT_METHOD = "/payment/remove_payment_method/"
export const GET_PAYMENT_METHODS = "/payment/get_payment_methods"
export const SET_DEFAULT_PAYMENT_METHOD = "/payment/set_default_payment_method/"
export const CONFIRM_PAYMENT_INTENT = "/payment/confirm_payment_intent"
export const CHECK_STRIPE_ACCOUNT = "/payment/check_stripe_account"
export const CHECK_PAYSTACK_ACCOUNT = "/payment/check_paystack_account"
export const CHECK_STRIP_USER_REGISTERED = "/payment/check_user_registered"
export const CREATE_STRIPE_ACCOUNT = "/payment/create_stripe_account"
export const CREATE_PAYSTACK_ACCOUNT = "/payment/create_paystack_account"
export const ACCOUNT_LINK = "/payment/account_link"
export const CREATE_LOGIN_LINK = "/payment/create_login_link"
export const LINK_ACCOUNT = "/payment/link_account"
export const CREATE_TRANSFER = "/payment/create_transfer"
export const ACTIVATE_PAYMENTS = "/payment/activate_payments/"
export const CREATE_STRIPE_REFUND = "/payment/create_stripe_refund"
export const CREATE_PAYSTACK_REFUND = "/payment/create_paystack_refund"
export const INITIALIZE_TRANSACTION = "/payment/initialize_transaction"
export const GET_TRANSACTIONS = "/payments/transactions"
export const GET_USER_DETAILS = "/payment/get_user_details"
export const GET_USER_BALANCE = "/payment/get_user_balance"
export const FUND_WALLET = "/payments/api/wallet/fundWallet"
export const WITHDRAW_FROM_WALLET = "/payments/account/withdraw"
export const GET_WALLET_BALANCE = "/payments/api/wallet/balance"
export const GET_WALLET_ACTIVITIES = "/payments/history"
export const VERIFY_TRANSACTION = "/payment/verify_transaction"
export const CHARGE_AUTHORIZATION = "/payment/charge_authorization"
export const GET_PAYSTACK_PAYMENT_METHODS =
  "/payment/get_paystack_payment_methods"
export const SET_PAYSTACK_DEFAULT_PAYMENT_METHOD =
  "/payment/set_paystack_default_payment_method/"
export const REMOVE_PAYSTACK_PAYMENT_METHOD =
  "/payment/remove_paystack_payment_method/"
export const PAY_WITH_STRIPE = "/payments/payWithStripe"
export const VERIFY_STRIPE_PAYMENT = "/payments/stripePaySuccess"
export const PAY_WITH_PAYSTACK = "/payments/payWithPaystack"
export const VERIFY_PAYSTACK_PAYMENT = "/payments/verifyPaystackTX"

/*
email-verification
*/

export const SEND_EMAIL_TO_USER = "/chasescroll/verification/send-email"
export const VERIFY_TOKEN = "/chasescroll/verification/verify-token"
export const CHANGE_PASSWORD = "/chasescroll/verification/reset-password"

// Chat API
export const GET_CHAT = "/chat/chat"
export const GET_MESSAGES = "/chat/message"
export const ADD_MEMBER = '/chat/addMembers'
export const UPDATE_CHAT = '/chat/chat'
