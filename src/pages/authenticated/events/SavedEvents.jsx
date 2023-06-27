import PageWrapper from "@/components/PageWrapper"
import SavedEvent from "@/components/events/SavedEvent"
import { FindEvent, ArrowRight } from "@/components/Svgs"

const SavedEvents = () => {
  const EVENTS_ARRAY = Array(4).fill(<SavedEvent />)
  return (
    <PageWrapper>
      {() => (
        <div className="grid gap-2 px-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center justify-center">
              <h1 className="text-2xl font-bold py-4">Saved Events</h1>
              <ArrowRight />
            </div>
            <FindEvent />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 overflow-auto py-2">
            {EVENTS_ARRAY.map((suggest, index) => (
              <div key={index}>{suggest}</div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default SavedEvents