import OverlayWrapper from "@/components/OverlayWrapper"

const CancelConfirmation = () => {
  return (
    <OverlayWrapper>
      <div>
        <div className="border rounded-lg">
          <div className="px-4 py-4">
            <h1 className="font-bold">
              Do you want to allow “Chasescroll” cancel ticket?
            </h1>
            <p className="font-light text-sm text-center">
              Are you sure you want to cancel ticket payment
            </p>
          </div>
          <div className="grid">
            <div className="grid grid-cols-2 divide-x text-xs text-center border-t">
              <div>
                <button className=" py-2 rounded-lg text-chasescrollBlue mx-2 my-2 font-bold w-3/4">
                  No
                </button>
              </div>
              <div>
                <button className="py-2 rounded-lg text-chasescrollBlue mx-2 my-2 font-bold w-3/4">
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OverlayWrapper>
  )
}

export default CancelConfirmation
