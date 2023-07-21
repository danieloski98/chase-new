import PropTypes from "prop-types"
import { CREATE_EXPLORE_SEARCH_TABS } from "@/constants/index"
import { CancelIcon } from "@/components/Svgs"

const CreateExploreSearchTabs = ({ activeTab, setActiveTab }) => {
  const handleTabClick = tabName => {
    setActiveTab(tabName)
  }
  const handleClose = () => {
    window.close()
    window.history.back()
  }

  return (
    <div className="grid gap-2 md:gap-8 w-full h-auto px-6 py-4 shadow-sm">
      <div className="flex gap-4 items-center ml-2">
        <button onClick={handleClose}>
          <CancelIcon />
        </button>
      </div>
      <div className="flex gap-16 justify-evenly md:justify-between">
        {CREATE_EXPLORE_SEARCH_TABS.map(({ label, value }) => {
          const isActive = activeTab === value

          return (
            <button
              key={value}
              className={`text-sm md:text-base md:p-2 md:px-8 px-2 ${
                isActive
                  ? "text-chasescrollBlue"
                  : "text-gray-300 hover:bg-gray-50 hover:text-chasescrollBlue"
              }`}
              onClick={() => handleTabClick(value)}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

CreateExploreSearchTabs.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
}

export default CreateExploreSearchTabs
