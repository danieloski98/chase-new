import OverlayWrapper from "@/components/OverlayWrapper"
import { CheckMarkIcon } from "@/components/Svgs"

const Confirmation = () => {
  return (
    <OverlayWrapper>
      <div className="w-1/4 flex flex-col">
        <div className="border rounded-lg">
          <div className="mx-auto flex flex-col items-center gap-4 my-8">
            <CheckMarkIcon />
            <h1 className="font-bold text-2xl">Verification</h1>
            <p className="px-4 text-center text-sm">
              Verification successful! Payment completed.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-chasescrollBlue text-white border font-bold text-sm w-full rounded-md py-2 my-8 mx-8">
              {" "}
              Continue
            </button>
          </div>
        </div>
      </div>
    </OverlayWrapper>
  )
}

export default Confirmation
