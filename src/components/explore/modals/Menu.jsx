import PropTypes from "prop-types"
import { EXPLORE_MENU_ACTIONS } from "@/constants"
import OverlayWrapper from "@/components/OverlayWrapper"
import { isEven } from "@/utils/helpers"

const Menu = ({ handleItemClick, toggleMoreOptions, threadId }) => {
  return (
    <OverlayWrapper>
      <div className="flex flex-col rounded-lg bg-white text-center w-48 shadow-lg">
        {EXPLORE_MENU_ACTIONS.map((menuItem, index) => (
          <div
            key={menuItem.key}
            className={`py-3 cursor-pointer border-b border-gray-200 ${
              isEven(index) ? "text-black" : "text-red-500"
            }`}
            onClick={() => handleItemClick(menuItem.key, threadId)}
          >
            {menuItem.label}
          </div>
        ))}
        <div
          className="py-3 cursor-pointer text-red-500"
          onClick={toggleMoreOptions}
        >
          Cancel
        </div>
      </div>
    </OverlayWrapper>
  )
}

Menu.propTypes = {
  handleItemClick: PropTypes.func,
  toggleMoreOptions: PropTypes.func,
  threadId: PropTypes.string,
}

export default Menu
