import OverlayWrapper from "@/components/OverlayWrapper"
import TicketDetails from "@/pages/authenticated/explore/modals/TicketDetails.jsx"

const Cancelled = () => {
  return (
    <OverlayWrapper>
      <div className="flex flex-col">
        <div className="text-red-600 text-5xl rotate-12">
          <h1>Ticket Cancelled</h1>
        </div>
        <div className="blur-sm">
          <TicketDetails />
        </div>
      </div>
    </OverlayWrapper>
  )
}

export default Cancelled
