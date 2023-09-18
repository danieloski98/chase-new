import React, { useState } from "react"
import ExplorePeople from "@/components/explore/ExplorePeople"
import ExploreEvents from "@/components/explore/ExploreEvents"
import ExploreCommunities from "@/components/explore/ExploreCommunities"
import CreateExploreSearchTabs from "../../../components/explore/CreateExploreSearchTabs"
import { CREATE_EXPLORE_SEARCH_TABS } from "../../../constants"
import PageWrapper from "../../../components/PageWrapper"
import { useAuth } from "../../../context/authContext"
import { Input } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { PATH_NAMES } from "../../../constants/paths.constant"
import { ExploreSearchIcon } from "../../../components/Svgs"

const SearchExplorePage = () => {
  const [activeTab, setActiveTab] = useState(
    CREATE_EXPLORE_SEARCH_TABS[0].value
  )
  const { searchValue, setSearchValue } = useAuth()

  return (
    <PageWrapper>
      {() => (
        <div className=" w-full px-6 lg:w-[600px] mx-auto h-full flex flex-col"> 
          <div className="py-5">
            <Link to={PATH_NAMES.SearchExplore}>
              <div className="relative text-gray-400 border-[#5D70F9] rounded-lg w-full ">
                <span className="absolute inset-y-0 left-2 flex items-center pl-1 pr-2">
                  <ExploreSearchIcon />
                </span>
                <Input
                  value={searchValue}
                  onChange={(e)=> setSearchValue(e.target.value)}
                  // className=" bg-white focus:outline-none focus:ring-0 font-medium text-sm placeholder-gray-500 pl-6 pr-3 py-2 "
                  type="text"
                  w={"100%"}
                  h={"45px"}
                  pl={"40px"}
                  placeholder="Search for users, event or ..."
                />
              </div>
            </Link>
          </div>

          <CreateExploreSearchTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="w-full flex-1 overflow-auto pt-8">
            {activeTab === CREATE_EXPLORE_SEARCH_TABS[0].value && (
              <div>
                <ExplorePeople />
              </div>
            )}
            {activeTab === CREATE_EXPLORE_SEARCH_TABS[1].value && (
              <div>
                <ExploreEvents />
              </div>
            )}
            {activeTab === CREATE_EXPLORE_SEARCH_TABS[2].value && (
              <div>
                <ExploreCommunities />
              </div>
            )}
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default SearchExplorePage
