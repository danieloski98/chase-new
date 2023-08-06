import Comments from "@/pages/authenticated/home/Comments"
import Share from "@/pages/authenticated/home/Share"
import ReportUser from "@/pages/authenticated/ReportUser"
import PaidTicketPage from "@/pages/authenticated/explore/PaidTicketPage"
import FreeTicketPage from "@/pages/authenticated/explore/FreeTicketPage"
import SuggestionsPage from "@/pages/authenticated/explore/SuggestionsPage"
import Attendees from "@/pages/authenticated/explore/Attendees"
import TicketNumber from "@/components/explore/modals/TicketNumber"
import MyEvents from "@/pages/authenticated/events/MyEvents"
import CreateCommunity from "@/pages/authenticated/communities/CreateCommunity"
import Communities from "@/pages/authenticated/communities"
import Community from "@/pages/authenticated/communities/Community"
import CommunityInfo from "@/pages/authenticated/communities/CommunityInfo"
import Profile_1 from "@/pages/authenticated/profile"
import EventTicketPaid from "@/components/events/EventTicketPaid"
import CreateEvents from "@/pages/authenticated/events/CreateEvents"
import BlockUsers from "@/pages/authenticated/profile/BlockUsers"
import ChangePassword from "@/pages/authenticated/profile/ChangePassword"
import CurrencySelectionForm from "@/pages/authenticated/profile/CurrencySelectionForm"
import EditProfile from "@/pages/authenticated/profile/EditProfile"
import PasswordUpdateForm from "@/pages/authenticated/profile/PasswordUpdateForm"
import PersonalInfoForm from "@/pages/authenticated/profile/PersonalInformation"
import SuggestionPage from "@/pages/authenticated/profile/SuggestionPage"
import PrivacyPage from "@/pages/authenticated/profile/modals/PrivacyPage"
import ReportABug from "@/pages/authenticated/profile/ReportABug"
import TermsAndConditions from "@/pages/authenticated/profile/TermsAndConditions"
import SearchExplorePage from "@/pages/authenticated/explore/SearchExplorePage"
import CreateGroup from "@/pages/authenticated/message/CreateGroup"
import Settings from "@/pages/authenticated/settings"
import Payment from "@/pages/authenticated/settings/payment"
import TransactionHistory from "@/pages/authenticated/settings/payment/TransactionHistory"
import UserPosts from "@/pages/authenticated/profile/UserPosts"
import SignUp from "@/pages/unauthenticated/onboarding/SignUp"
import Verify from "@/pages/unauthenticated/onboarding/Verify"
import ForgotPassword from "@/pages/unauthenticated/onboarding/ForgotPassword"
import { PATH_NAMES } from "./paths.constant"
import { BellIcon, HomeIcon, MessageIcon, ProfileIcon2, SearchIcon, UsersIcon } from "@/components/Svgs"
import Home from "@/pages/authenticated/home"
import Explore from "@/pages/authenticated/explore"
import Message from "@/pages/authenticated/message"
import Notifications from "@/pages/authenticated/notifications"
import PaymentDetails from "@/pages/authenticated/settings/payment/PaymentDetails"
import Wallet from "@/pages/authenticated/settings/payment/Wallet"
import { CalendarIcon } from "@/components/Svgs"
import Events from "@/pages/authenticated/events/Events"
import EventDashboard from "@/pages/authenticated/eventdashboard"
import EditEvents from "@/pages/authenticated/events/EditEvents"
// import EventDashboard from "@/pages/authenticated/eventdashboard"
import MessageSettings from "@/pages/authenticated/message/MessageSettings"

export const NAVIGATION_ROUTES = [
  {
    label: "Home",
    path: PATH_NAMES.home,
    icon: HomeIcon,
    element: Home,
    withMobile: true,
  },
  {
    label: "Explore",
    path: PATH_NAMES.explore,
    icon: SearchIcon,
    element: Explore,
    withMobile: true,
  },
  {
    label: "Event",
    path: PATH_NAMES.events,
    icon: CalendarIcon,
    element: Events,
    withMobile: true,
  },
  {
    label: "Message",
    path: PATH_NAMES.message,
    icon: MessageIcon,
    element: Message,
    withMobile: false,
    forMobile: true,
  },
  {
    label: "Communities",
    path: PATH_NAMES.communities,
    icon: UsersIcon,
    element: Communities,
    withMobile: true,
  },
  {
    label: "Notifications",
    path: PATH_NAMES.notifications,
    icon: BellIcon,
    element: Notifications,
    withMobile: false,
    forMobile: true,
  },
  {
    label: "Profile",
    path: PATH_NAMES.profile,
    icon: ProfileIcon2,
    element: Profile_1,
    withMobile: true,
    forMobile: false,
  },
  // {
  //   label: "eventDashboard",
  //   path: PATH_NAMES.eventDashboard,
  //   icon: ProfileIcon2,
  //   element: EventDashboard,
  //   withMobile: true,
  //   forMobile: false,
  // },
  // {
  //   label: "Profile",
  //   path: PATH_NAMES.profile,
  //   icon: BellIcon,
  //   element: Settings,
  //   withMobile: false,
  //   forMobile: true,
  // },
]

export const OTHER_UNAUTHENTICATED_ROUTES = [
  {
    path: PATH_NAMES.signUp,
    element: SignUp,
  },
  {
    path: PATH_NAMES.verify,
    element: Verify,
  },
  {
    path: PATH_NAMES.forgotPassword,
    element: ForgotPassword,
  },
]

export const OTHER_AUTHENTICATED_ROUTES = [
  {
    path: `${PATH_NAMES.comments}/:postID`,
    element: Comments,
  },
  {
    path: `${PATH_NAMES.share}/:id`,
    element: Share,
  },
  {
    path: `${PATH_NAMES.messageSettings}/:id`,
    element: MessageSettings,
  },
  {
    path: `${PATH_NAMES.report}/:id`,
    element: ReportUser,
  },
  {
    path: `${PATH_NAMES.tickets}/:id`,
    element: PaidTicketPage,
  },
  {
    path: `${PATH_NAMES.event}/:id`,
    element: PaidTicketPage,
  },
  {
    path: `${PATH_NAMES.freeTickets}/:id`,
    element: FreeTicketPage,
  },
  {
    path: PATH_NAMES.suggestions,
    element: SuggestionsPage,
  },
  {
    path: PATH_NAMES.attendees,
    element: Attendees,
  },
  {
    path: PATH_NAMES.modal,
    element: TicketNumber,
  },
  {
    path: PATH_NAMES.events,
    element: MyEvents,
  },
  {
    path: PATH_NAMES.eventDashboard,
    element: EventDashboard,
  },
  {
    path: PATH_NAMES.createCommunity,
    element: CreateCommunity,
  },
  {
    path: PATH_NAMES.communities,
    element: Communities,
  },
  {
    path: `${PATH_NAMES.community}/:id`,
    element: Community,
  },
  {
    path: `${PATH_NAMES.communityInfo}/:id`,
    element: CommunityInfo,
  },
  {
    path: `${PATH_NAMES.profile}/:userId`,
    element: Profile_1,
  },
  {
    path: PATH_NAMES.eventTickets,
    element: EventTicketPaid,
  },
  {
    path: PATH_NAMES.createEvent,
    element: CreateEvents,
  },
  {
    path: PATH_NAMES.editevent,
    element: EditEvents,
  },
  {
    path: PATH_NAMES.blockUsers,
    element: BlockUsers,
  },
  {
    path: PATH_NAMES.changePassword,
    element: ChangePassword,
  },
  {
    path: PATH_NAMES.currencySelectionForm,
    element: CurrencySelectionForm,
  },
  {
    path: PATH_NAMES.editProfile,
    element: EditProfile,
  },
  {
    path: PATH_NAMES.passwordUpdate,
    element: PasswordUpdateForm,
  },
  {
    path: PATH_NAMES.personalInfo,
    element: PersonalInfoForm,
  },
  {
    path: PATH_NAMES.suggestionPage,
    element: SuggestionPage,
  },
  {
    path: PATH_NAMES.setPrivacy,
    element: PrivacyPage,
  },
  {
    path: PATH_NAMES.reportBug,
    element: ReportABug,
  },
  {
    path: PATH_NAMES.termsAndConditions,
    element: TermsAndConditions,
  },
  {
    path: PATH_NAMES.SearchExplore,
    element: SearchExplorePage,
  },
  {
    path: PATH_NAMES.createGroup,
    element: CreateGroup,
  },
  {
    path: PATH_NAMES.settings,
    element: Settings,
  },
  {
    path: PATH_NAMES.payments,
    element: Payment,
  },
  {
    path: PATH_NAMES.paymentDetails,
    element: PaymentDetails,
  },
  {
    path: PATH_NAMES.transactionHistory,
    element: TransactionHistory,
  },
  {
    path: `${PATH_NAMES.wallet}/:userId`,
    element: Wallet,
  },
  {
    path: `${PATH_NAMES.posts}/:userID/:postID`,
    element: UserPosts,
  },
]
