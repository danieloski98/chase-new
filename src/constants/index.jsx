/* eslint-disable react-refresh/only-export-components */
import { nanoid } from "nanoid"
import {
  PostGridIcon,
  NetworkIcon,
  EventsIcon,
  CommunitiesIcon,
} from "../components/Svgs"
import image1 from "../assets/images/music-pic.jpg"
import image2 from "../assets/images/art-pic.jpg"
import image3 from "../assets/images/movie-pic.jpg"
import image4 from "../assets/images/workshop-pic.jpg"
import image5 from "../assets/images/wedding-pic.jpg"
import musicImg2 from "../assets/images/music-img2.jpg"
import musicImg3 from "../assets/images/music-img3.jpg"
import musicImg4 from "../assets/images/music-img4.jpg"

import Suggestion from "../components/explore/Suggestion"
import CarouselEvent from "../components/explore/CarouselEvent"
import CommunityAvatar from "../assets/svg/community/community-avatar.svg"
//import Events from "../pages/authenticated/events/Events"
import freeTicketBanner from "../assets/images/event-01.webp"
import paidTicketBanner from "../assets/images/event-02.webp"
import eventLogo from "../assets/svg/eventlogo.svg"
import concert from "../assets/images/concert.jpeg"
import avatar from "../assets/images/avatar.png"
import image from "../assets/svg/Avatar.svg"
import threadImage from "../assets/images/concert.jpeg"
import img from "../assets/images/suggestprofile.png"
import paymentIcon from "../assets/images/paymentIcon.png"
import profileCircle from "../assets/images/profile-circle.png"
import blockedUserIcon from "../assets/images/blockedUserIcon.png"
import eventCalenderIcon from "../assets/images/eventCalenderIcon.png"
import deleteAccountIcon from "../assets/images/deleteAccountIcon.png"
import flaggedIcon from "../assets/images/flaggedIcon.png"
import requestEnhancementIcon from "../assets/images/requestEnhancementIcon.png"
import termsAndPrivacy from "../assets/images/termsAndPrivacy.png"
import davido2 from "../assets/svg/davido2.svg"
import changePasswordIcon from "../assets/images/changePasswordIcon.png"
import CONFIG from "../config"
import { PATH_NAMES } from "./paths.constant"

export const DEFAULT_AUTH_CONTEXT = { authorized: false }

export const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone

export const COMPANY_NAME = "Chasescroll"

export const CHASESCROLL_VIDEO_BUCKET = "chasescroll-videos"

export const CLOSE_ENTITY = <>&#x2715;</>
export const CLOSE_ENTITY_BOLD = <>&#10006;</>

export const videoConfig = {
  bucketName: 'chasescroll-videos',
  region: CONFIG.VITE_AWS_REGION,
  accessKeyId: CONFIG.AWS_ACCESS_KEY,
  secretAccessKey: CONFIG.AWS_SECRET_KEY,
  s3Url: CONFIG.AWS_BASE_URL,
}

export const CREATE_EVENT_HEADER = [
  {
    label: "Theme",
    value: 0,
  },
  {
    label: "Information",
    value: 1,
  },
  {
    label: "Tickets",
    value: 2,
  },
]

export const CREATE_EXPLORE_SEARCH_TABS = [
  { value: "people", label: "People" },
  { value: "events", label: "Events" },
  { value: "communities", label: "Communities" },
]

export const PHYSICAL_LOCATION_OPTIONS = [
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
  { value: "portharcourt", label: "Port Harcourt" },,
  { value: "other", label: "others" },
]

export const ONLINE_PLATFORM_OPTIONS = [
  { value: "zoom", label: "Zoom" },
  { value: "meet", label: "Google Meet" },
  { value: "teams", label: "Microsoft Teams" },
  { value: "other", label: "others" },
]

export const ONBOARDING_FOOTER = [
  {
    label: "Sign in",
    path: "/",
  },
  {
    label: "Sign up",
    path: "/sign-up",
  },
  {
    label: "Home",
    path: "https://chasescroll.com/",
  },
  {
    label: "About us",
    path: "https://chasescroll.com/about",
  },
  {
    label: "Policy",
    path: "https://chasescroll.com/privacy-poilcy",
  },
  {
    label: "Terms and conditions",
    path: "https://chasescroll.com/terms",
  },
  {
    label: "Contact us",
    path: "https://chasescroll.com/contact",
  },
]

export const THREAD_DATA = [
  {
    id: nanoid(),
    name: "Davido",
    username: "@davido",
    avatar,
    image: threadImage,
    caption: "Davido @ Dubai Naija Concert",
    time: "2 hours ago",
    shares: 9000,
    likes: 999,
    comments: 1500,
    liked: false,
  },
  {
    id: nanoid(),
    name: "Davido",
    username: "@davido",
    avatar,
    caption:
      "Bac 2 da grind!!!!! NOVEMBER IS A MONTH OF BLESSINGS AND CHANGE!!! Nov 18th  (STATE FARM ARENA ) NOV 21st (BIG 30)  Nov 27th (Inauguration Osun state ) and finally NEW MUSIC!!✌🏾💨🔥",
    time: "2 hours ago",
    shares: 13500,
    likes: 5998,
    comments: 5,
    liked: true,
  },
  {
    id: nanoid(),
    name: "Davido",
    username: "@davido",
    avatar,
    image: threadImage,
    caption: "Davido @ O2 London Concert",
    time: "36 minutes ago",
    shares: 2000,
    likes: 388,
    comments: 15,
    liked: false,
  },
  {
    id: nanoid(),
    name: "Davido",
    username: "@davido",
    avatar,
    image: threadImage,
    caption: "Davido @ Dubai Naija Concert",
    time: "2 hours ago",
    shares: 9000,
    likes: 5998,
    comments: 1500,
    liked: false,
  },
  {
    id: nanoid(),
    name: "Davido",
    username: "@davido",
    avatar,
    caption:
      "Bac 2 da grind!!!!! NOVEMBER IS A MONTH OF BLESSINGS AND CHANGE!!! Nov 18th  (STATE FARM ARENA ) NOV 21st (BIG 30)  Nov 27th (Inauguration Osun state ) and finally NEW MUSIC!!✌🏾💨🔥",
    time: "2 hours ago",
    shares: 13500,
    likes: 999,
    comments: 5,
    liked: true,
  },
  {
    id: nanoid(),
    name: "Davido",
    username: "@davido",
    avatar,
    image: threadImage,
    caption: "Davido @ O2 London Concert",
    time: "36 minutes ago",
    shares: 2000,
    likes: 388,
    comments: 15,
    liked: false,
  },
]
export const EVENTS_LIST = [
  {
    id: nanoid(),
    name: "Lorem ipsum dolor sit",
    price: "$200. 00",
    date: "Oct 20th at 09:00 am",
    location: "State farm arena, ATL",
  },
  {
    id: nanoid(),
    name: "Lorem ipsum dolor sit",
    price: "$200. 00",
    date: "Oct 20th at 09:00 am",
    location: "State farm arena, ATL",
  },
  {
    id: nanoid(),
    name: "Lorem ipsum dolor sit",
    price: "$200. 00",
    date: "Oct 20th at 09:00 am",
    location: "State farm arena, ATL",
  },
  {
    id: nanoid(),
    name: "Lorem ipsum dolor sit",
    price: "$200. 00",
    date: "Oct 20th at 09:00 am",
    location: "State farm arena, ATL",
  },
  {
    id: nanoid(),
    name: "Lorem ipsum dolor sit",
    price: "$200. 00",
    date: "Oct 20th at 09:00 am",
    location: "State farm arena, ATL",
  },
]
export const COMMUNITIES_LIST = [
  {
    id: nanoid(),
    name: "BTC Blockchain Community",
    des: "Rorem ipsum  Dolor sit amet, conse",
    profile: "public",
  },
  {
    id: nanoid(),
    name: "BTC Blockchain Community",
    des: "Rorem ipsum  Dolor sit amet, conse",
    profile: "public",
  },
  {
    id: nanoid(),
    name: "BTC Blockchain Community",
    des: "Rorem ipsum  Dolor sit amet, conse",
    profile: "private",
  },
  {
    id: nanoid(),
    name: "BTC Blockchain Community",
    des: "Rorem ipsum  Dolor sit amet, conse",
    profile: "public",
  },
  {
    id: nanoid(),
    name: "BTC Blockchain Community",
    des: "Rorem ipsum  Dolor sit amet, conse",
    profile: "private",
  },
  {
    id: nanoid(),
    name: "BTC Blockchain Community",
    des: "Rorem ipsum  Dolor sit amet, conse",
    profile: "public",
  },
  {
    id: nanoid(),
    name: "BTC Blockchain Community",
    des: "Rorem ipsum  Dolor sit amet, conse",
    profile: "private",
  },
  {
    id: nanoid(),
    name: "BTC Blockchain Community",
    des: "Rorem ipsum  Dolor sit amet, conse",
    profile: "public",
  },
  {
    id: nanoid(),
    name: "BTC Blockchain Community",
    des: "Rorem ipsum  Dolor sit amet, conse",
    profile: "private",
  },
  {
    id: nanoid(),
    name: "BTC Blockchain Community",
    des: "Rorem ipsum  Dolor sit amet, conse",
    profile: "public",
  },
]
export const PEOPLE_PROFILES = [
  {
    id: nanoid(),
    name: "Tiwa Savge",
    handles: "DrSavage34",
  },
  {
    id: nanoid(),
    name: "Davido",
    handles: "@AdelekeDavid",
  },
  {
    id: nanoid(),
    name: "Davido",
    handles: "@AdelekeDavid",
  },
  {
    id: nanoid(),
    name: "Davido",
    handles: "@AdelekeDavid",
  },
  {
    id: nanoid(),
    name: "Davido",
    handles: "@AdelekeDavid",
  },
  {
    id: nanoid(),
    name: "Davido",
    handles: "@AdelekeDavid",
  },
  {
    id: nanoid(),
    name: "Davido",
    handles: "@AdelekeDavid",
  },
  {
    id: nanoid(),
    name: "Davido",
    handles: "@AdelekeDavid",
  },
  {
    id: nanoid(),
    name: "Davido",
    handles: "@AdelekeDavid",
  },
  {
    id: nanoid(),
    name: "Davido",
    handles: "@AdelekeDavid",
  },
]

export const HOME_MENU_ACTIONS = [
  {
    key: "share_post",
    label: "Share Post",
    route: PATH_NAMES.share,
  },
  {
    key: "report_user",
    label: "Report User",
    route: PATH_NAMES.report,
  },
  {
    key: "report_content",
    route: PATH_NAMES.report,
    label: "Report Content",
  },
]

export const EXPLORE_MENU_ACTIONS = [
  {
    key: "delete",
    label: "Delete",
  },
  {
    key: "block_user",
    label: "Block",
  },
]

export const EVENT_MENU_ACTIONS = [
  {
    key: "events",
    label: "My Events",
  },
  {
    key: "past_event",
    label: "Past Events",
  },
  {
    key: "saved_event",
    label: "Saved Events",
  },
]

export const COMMENTS = [
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 200,
    liked: false,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 345,
    liked: true,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 999,
    liked: false,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 200,
    liked: false,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 345,
    liked: true,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 999,
    liked: false,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 200,
    liked: false,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 345,
    liked: true,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 999,
    liked: false,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 200,
    liked: false,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 345,
    liked: true,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 999,
    liked: false,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 200,
    liked: false,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 345,
    liked: true,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 999,
    liked: false,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 200,
    liked: false,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 345,
    liked: true,
  },
  {
    id: nanoid(),
    comment: "A townhall different from bala blu, bulu blu... bulaba",
    time: "23 minutes ago",
    likes: 999,
    liked: false,
  },
]

export const TERMS_OF_USE = [
  {
    id: nanoid(),
    label: "Porem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nis Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
  {
    id: nanoid(),
    label: "Porem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nis Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
  {
    id: nanoid(),
    label: "Porem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nis Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
  {
    id: nanoid(),
    label: "Porem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nis Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
]

export const EVENT_CATEGORY = [
  {
    id: 1,
    category: "Music",
    image: image1,
    day: 20,
    month: "Dec",
    text: "I own this",
    address: "State farm Ohio",
    price: 200,
    interest: 12,
  },
  {
    id: 2,
    category: "Art",
    image: image2,
    day: 22,
    month: "Oct",
    text: "This is my field",
    address: "State sec Washington",
    price: 220,
    interest: 10,
  },
  {
    id: 3,
    category: "Movie",
    image: image3,
    day: 24,
    month: "Aug",
    text: "Allow me enjoy myself",
    address: "Abj state sec",
    price: 250,
    interest: 15,
  },
  {
    id: 4,
    category: "Workshop",
    image: image4,
    day: 15,
    month: "Jun",
    text: "Coke and Fanta",
    address: "Santa Monica",
    price: 300,
    interest: 19,
  },
  {
    id: 5,
    category: "Music",
    image: musicImg2,
    day: 13,
    month: "Mar",
    text: "Garri and sugar",
    address: "San Francisco",
    price: 229,
    interest: 22,
  },
  {
    id: 6,
    category: "Music",
    image: musicImg3,
    day: 13,
    month: "Mar",
    text: "I don blow",
    address: "Naija",
    price: 229,
    interest: 22,
  },
  {
    id: 7,
    category: "Wedding",
    image: image5,
    day: 13,
    month: "Mar",
    text: "Ghana must go",
    address: "Ghana",
    price: 229,
    interest: 22,
  },
  {
    id: 8,
    category: "Music",
    image: musicImg4,
    day: 13,
    month: "Mar",
    text: "Ghana must go",
    address: "Ghana",
    price: 229,
    interest: 22,
  },
]

export const MENU_OPTIONS = [
  {
    number: 236,
    svg: () => PostGridIcon,
    name: "Posts",
  },
  {
    number: 290,
    svg: ()=> NetworkIcon,
    name: "Network",
  },
  {
    number: 442,
    svg: () => EventsIcon,
    name: "Events",
  },
  {
    number: 16,
    svg: () => CommunitiesIcon,
    name: "Communities",
  },
]

export const EVENT_IMAGES = [
  {
    name: "Party",
    banner: image1,
  },
  {
    name: "Party",
    banner: image2,
  },
  {
    name: "Party",
    banner: image3,
  },
  {
    name: "Party",
    banner: image4,
  },
  {
    name: "Party",
    banner: image4,
  },
  {
    name: "Party",
    banner: image4,
  },
  {
    name: "Party",
    banner: image4,
  },
  {
    name: "Party",
    banner: image4,
  },
]

export const PROFILE = [
  {
    name: "Mike John",
    email: "otuekongdomino@gmail.com",
  },
]

export const REPORT_TYPE = [
  "Scam or Fraud",
  "Fake News",
  "Bullying or Harassment",
  "Suicide or Self Injury",
  "Nudity or Sexual Post",
  "Hate Speech",
  "Wrong Contact",
]

export const MENU_OPTION = [
  {
    label: "Health concerns",
    type: "radio",
    name: "reason",
  },
  {
    label: "Cost",
    type: "radio",
    name: "reason",
  },
  {
    label: "Distance",
    type: "radio",
    name: "reason",
  },
  {
    label: "Lack of interest",
    type: "radio",
    name: "reason",
  },
  {
    label: "Personal issues",
    type: "radio",
    name: "reason",
  },
  {
    label: "Schedule conflict",
    type: "radio",
    name: "reason",
  },
  {
    label: "Weather conditions",
    type: "radio",
    name: "reason",
  },
  {
    label: "Financial constraint",
    type: "radio",
    name: "reason",
  },
  {
    label: "Lack of transportation",
    type: "radio",
    name: "reason",
  },
  {
    label: "Accessibility issues",
    type: "radio",
    name: "reason",
  },
  {
    label: "Others",
    type: "radio",
    name: "reason",
  },
]

export const SUGGESTIONS_ARRAY = Array(24).fill({
  id: nanoid(),
  component: Suggestion,
})

export const EVENT_TYPE = {
  free: "Free",
  paid: "Paid",
}

export const EVENTS_ARRAY = [
  {
    id: nanoid(),
    component: CarouselEvent,
    caption: "#AFRICANXT 2023",
    image: freeTicketBanner,
    category: EVENT_TYPE.free,
  },
  {
    id: nanoid(),
    component: CarouselEvent,
    image: paidTicketBanner,
    category: EVENT_TYPE.paid,
  },
  {
    id: nanoid(),
    component: CarouselEvent,
    image: concert,
    category: EVENT_TYPE.paid,
  },
]

export const MESSAGE_MENU = [
  {
    id: nanoid(),
    label: "Delete chat",
    value: "delete",
  },
  {
    id: nanoid(),
    label: "Report user",
    value: "report",
  },
  {
    id: nanoid(),
    label: "Cancel",
    value: "cancel",
  },
]

export const SUGGESTION_MENU = [
  // {
  //   id: nanoid(),
  //   label: "Delete",
  //   value: "delete",
  // },
  {
    id: nanoid(),
    label: "Block",
    value: "block",
  },
  // {
  //   id: nanoid(),
  //   label: "Cancel",
  //   value: "cancel",
  // },
]

export const MAP_LOCATION = {
  location: "1600 Amphitheatre Parkway",
  city: "Mountain View, California",
  lat: 37.42216,
  lng: -122.08427,
}

export const FREE_TICKET_INFO = {
  banner: freeTicketBanner,
  eventName: "Netflix Oscar Awards",
  eventLogo,
  attendees: Array(25).fill({
    id: nanoid(),
    image: avatar,
  }),
  price: EVENT_TYPE.free,
  convener: "Neflix",
  timeAndDate: "2023-03-18T17:33:22.577Z",
  location: MAP_LOCATION,
  about:
    "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum",
}

export const PAID_TICKET_INFO = {
  banner: paidTicketBanner,
  eventName: "Ishaya's Birthday Bash",
  eventLogo,
  attendees: Array(20).fill({
    id: nanoid(),
    image: avatar,
  }),
  price: [
    {
      id: nanoid(),
      type: "Regular",
      amount: 100,
    },
    {
      id: nanoid(),
      type: "Gold",
      amount: 600,
    },
    {
      id: nanoid(),
      type: "Premium",
      amount: 700,
    },
  ],
  convener: "Ishaya",
  timeAndDate: "2023-12-18T17:33:22.577Z",
  location: MAP_LOCATION,
  about:
    "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum",
}

export const POLICY =
  "Payment has been debited from your account but would be credited to the Organizers account after a 5 days wait period. You would have the Right to cancel payment/Ticket only within this wait period. Your barcode would be added to your ticket after the wait period."
// Dummy function to fetch random communities request
export const REQUEST = [
  {
    id: nanoid(),
    name: "John | Haven Party Light Community",
    description:
      "Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    members: "1k",
    image: CommunityAvatar,
  },
  {
    id: nanoid(),
    name: "John | Haven Party Light Community",
    description:
      "Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    members: "3k",
    image: CommunityAvatar,
  },
  {
    id: nanoid(),
    name: "John | Haven Party Light Community",
    description:
      "Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    members: "4k",
    image: CommunityAvatar,
  },
  {
    id: nanoid(),
    name: "John | Haven Party Light Community",
    description:
      "Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    members: "5k",
    image: CommunityAvatar,
  },
]

// Dummy function to fetch random communities
export const RANDOMCOMMUNITIES = [
  {
    id: nanoid(),
    name: "Haven Party Light Community",
    members: "2k",
    description:
      "Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis fthetjeyjek Rorem ipsum dolor sit amet, c",
    image: CommunityAvatar,
  },
  {
    id: nanoid(),
    name: "Haven Party Light Community",
    members: "2k",
    description:
      "Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis fthetjeyjek Rorem ipsum dolor sit amet, c",
    image: CommunityAvatar,
  },
  {
    id: nanoid(),
    name: "Haven Party Light Community",
    members: "2k",
    description:
      "Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis fthetjeyjek Rorem ipsum dolor sit amet, c",
    image: CommunityAvatar,
  },
]

export const COMMUNITY_TABS = [
  "my-community",
  "find-community",
  "requested-community",
]
export const SECONDARY_NAV = [
  {
    id: nanoid(),
    name: "Posts",
    count: 280,
    link: "/posts",
    icon: PostGridIcon,
    type: "component1",
  },
  {
    id: nanoid(),
    name: "Network",
    count: 290,
    link: "/network",
    icon: NetworkIcon,
    type: "component2",
  },
  {
    id: nanoid(),
    name: "Events",
    count: 42,
    link: "/events",
    icon: EventsIcon,
    type: "component3",
  },
  {
    id: nanoid(),
    name: "Communities",
    count: 16,
    link: "/communities",
    icon: CommunitiesIcon,
    type: "component4",
  },
]

export const Options = [
  { label: "Setting", key: nanoid(), route: PATH_NAMES.settings },
  { label: "Edit Profile", key: nanoid(), route: "/edit-profile" },
  // { label: "Edit Currency", key: nanoid(), route: "/edit-currency" },
]

export const Images = [
  { image: img, key: nanoid() },
  { image: img, key: nanoid() },
  { image: img, key: nanoid() },
  { image: img, key: nanoid() },
  { image: img, key: nanoid() },
  { image: img, key: nanoid() },
]

export const MyConnect = [
  {
    image: davido2,
    name: "Burna",
    email: "Odugwuburna@gmail.com",
    id: nanoid(),
  },
  {
    image: davido2,
    name: "Burna",
    email: "Odugwuburna@gmail.com",
    id: nanoid(),
  },
  {
    image: davido2,
    name: "Burna",
    email: "Odugwuburna@gmail.com",
    id: nanoid(),
  },
  {
    image: davido2,
    name: "Burna",
    email: "Odugwuburna@gmail.com",
    id: nanoid(),
  },
  {
    image: davido2,
    name: "Burna",
    email: "Odugwuburna@gmail.com",
    id: nanoid(),
  },
]

export const EventList = [
  {
    id: nanoid(),
    image: image,
    name: "Libero interdum Boys to men jkkgn",
    category: "Movie",
    date: "Friday, Nov 25 .7pm-1amM",
    location: "State farm arena, ATL",
    status: "Attending",
  },
  {
    id: nanoid(),
    image: image,
    name: "Libero interdum Boys to men jkkgn",
    category: "Movie",
    date: "Friday, Nov 25 .7pm-1amM",
    location: "State farm arena, ATL",
    status: "Attending",
  },
  {
    id: nanoid(),
    image: image,
    name: "Libero interdum Boys to men jkkgn",
    category: "Movie",
    date: "Friday, Nov 25 .7pm-1amM",
    location: "State farm arena, ATL",
    status: "Attending",
  },
]

export const EventList2 = [
  {
    id: nanoid(),
    image: threadImage,
    name: "Libero interdum Boys to men jkkgn",
    category: "Movie",
    date: "Friday, Nov 25 .7pm-1amM",
    location: "State farm arena, ATL",
    status: "Attending",
  },
  {
    id: nanoid(),
    image: threadImage,
    name: "Libero interdum Boys to men jkkgn",
    category: "Movie",
    date: "Friday, Nov 25 .7pm-1amM",
    location: "State farm arena, ATL",
    status: "Attending",
  },
  {
    id: nanoid(),
    image: threadImage,
    name: "Libero interdum Boys to men jkkgn",
    category: "Movie",
    date: "Friday, Nov 25 .7pm-1amM",
    location: "State farm arena, ATL",
    status: "Attending",
  },
]
export const CommunityList = [
  {
    id: nanoid(),
    image: image,
    name: "Haven Party Light Community",
    paragraph: "John Commented on Post",
  },
  {
    id: nanoid(),
    image: image,
    name: "Haven Party Light Community",
    paragraph: "John Commented on Post",
  },
  {
    id: nanoid(),
    image: image,
    name: "Haven Party Light Community",
    paragraph: "John Commented on Post",
  },
]

export const SettingsPageList = [
  {
    id: nanoid(),
    type: "Edit Profile",
    route: "/edit-profile",
    icon: eventCalenderIcon,
  },
  {
    id: nanoid(),
    type: "Payment",
    route: PATH_NAMES.payments,
    icon: paymentIcon,
  },
  {
    id: nanoid(),
    type: "Event Dash Board",
    route: "/event-dashboard",
    icon: eventCalenderIcon,
  },
  {
    id: nanoid(),
    type: "Change Password",
    route: PATH_NAMES.changePassword,
    icon: changePasswordIcon,
  },
  {
    id: nanoid(),
    type: "Account Settings",
    route: PATH_NAMES.setPrivacy,
    icon: profileCircle,
  },
  {
    id: nanoid(),
    type: "Support & Help",
    // route: PATH_NAMES.suggestionPage,
    icon: "#",
  },
  {
    id: nanoid(),
    type: "Terms and Conditions",
    route: PATH_NAMES.termsAndConditions,
    icon: termsAndPrivacy,
  },
  {
    id: nanoid(),
    type: "Privacy Policy",
    route: PATH_NAMES?.privacy,
    icon: termsAndPrivacy,
  },
  {
    id: nanoid(),
    type: "Report a Bug",
    route: PATH_NAMES?.reportBug,
    icon: flaggedIcon,
  },
  {
    id: nanoid(),
    type: "Request an Enhancement",
    route: PATH_NAMES?.suggestionPage,
    icon: requestEnhancementIcon,
  },
  {
    id: nanoid(),
    type: "Blocked Users",
    route: PATH_NAMES.blockUsers,
    icon: blockedUserIcon,
  },
  {
    id: nanoid(),
    type: "Delete Account",
    route: PATH_NAMES?.confirmDelete,
    icon: deleteAccountIcon,
  },
]

export const Currencies = [
  { currencyCode: "NGN", currencyName: "Nigeria Naira", flag: "🇳🇬" },
  { currencyCode: "EUR", currencyName: "Euro", flag: "🇪🇺" },
  { currencyCode: "JPY", currencyName: "Japanese Yen", flag: "🇯🇵" },
  { currencyCode: "GBP", currencyName: "British Pound", flag: "🇬🇧" },
  { currencyCode: "CHF", currencyName: "Swiss Franc", flag: "🇨🇭" },
  { currencyCode: "AUD", currencyName: "Australian Dollar", flag: "🇦🇺" },
  { currencyCode: "CAD", currencyName: "Canadian Dollar", flag: "🇨🇦" },
  { currencyCode: "CNY", currencyName: "Chinese Yuan", flag: "🇨🇳" },
  { currencyCode: "HKD", currencyName: "Hong Kong Dollar", flag: "🇭🇰" },
  { currencyCode: "USD", currencyName: "US Dollar", flag: "🇺🇸" },
]

export const previousPage = () => {
  return history.back()
}

export const CHAT_MESSAGES = [
  {
    id: nanoid(),
    message: "Hey!, How are you?",
    sender: 1,
  },
  {
    id: nanoid(),
    message: "I'm alright my leader",
    sender: 0,
  },
  {
    id: nanoid(),
    message: "How madam?",
    sender: 1,
  },
  {
    id: nanoid(),
    message: "she dey alright oo",
    sender: 0,
  },
  {
    id: nanoid(),
    message: "she dey kitchen",
    sender: 0,
  },
  {
    id: nanoid(),
    message: "no be lie oga mi!... wahala for us wey neva marry o",
    sender: 1,
  },
  {
    id: nanoid(),
    message: "lmao!... dey play ",
    sender: 0,
  },
  {
    id: nanoid(),
    message:
      "guy later na... make I go dey with the love of my life. make you try find woman o... comot from streets",
    sender: 0,
  },
  {
    id: nanoid(),
    message: "he who finds a wife finds a good thing",
    sender: 0,
  },
  {
    id: nanoid(),
    message: "no be me talk am",
    sender: 0,
  },
]

export const CHAT_LIST = Array(20).fill({
  id: nanoid(),
  avatar,
  friend: "Person Name",
  preview: CHAT_MESSAGES[CHAT_MESSAGES.length - 1].message,
})

export const NOTIFICATION_FILTER = [
  {
    label: "All notifications",
    value: ""
  },
  {
    label: "Read notifications",
    value: "READ"
  },
  {
    label: "Unread notifications",
    value: "UNREAD"
  },
]

export const NOTIFICATIONS = Array(20).fill({
  id: nanoid(),
  title: "Created an event",
  description:
    "an event was created by your friends in the townhall different from balablu, bulublu and bulaba",
  time: "11 hrs ago",
})

export const TRANSACTION_PURPOSE = {
  fundWallet: 'FUND_WALLET',
  cashout: 'CASHOUT',
  payForTicket: 'PAY_FOR_TICKET',
}

export const TRANSACTION_STATUS = {
  started: 'STARTED',
  paid: 'PAID',
  cancelled: 'CANCELLED',
  error: 'ERROR',
  refunded: 'REFUNDED',
}

export const CURRENCY = {
  USD: 'USD',
  NGN: 'NGN',
}
