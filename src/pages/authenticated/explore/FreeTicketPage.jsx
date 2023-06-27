import PageWrapper from "@/components/PageWrapper"
import { FREE_TICKET_INFO } from "@/constants"
import TicketPageTemplate from "./TicketPageTemplate"

const FreeTicketPage = () => {
  return (
    <PageWrapper>
      {() => (
        <TicketPageTemplate {...FREE_TICKET_INFO} />
      )}
    </PageWrapper>
  )
}

export default FreeTicketPage
