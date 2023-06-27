import OverlayWrapper from "@/components/OverlayWrapper"
import { MENU_OPTION } from "@/constants"


const CancellationReason = () => {
  return (
    <OverlayWrapper>
      <div className="w-full ">
        <div className="border w-2/5 mx-auto py-4 px-8 rounded-lg">
          <form className="grid gap-4 text-chasescrollTextGrey mb-6 px-3">
            {MENU_OPTION.map(element => (
              <div className="flex justify-between border-b">
                <label>{element.label}</label>
                <input type={element.type} name={element.name} id="" />
              </div>
            ))}
          </form>
        </div>
      </div>
    </OverlayWrapper>
  )
}

export default CancellationReason
