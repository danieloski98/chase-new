import React, { useState } from "react"
import ExplorePeople from "@/components/explore/ExplorePeople"
import ExploreEvents from "@/components/explore/ExploreEvents"
import ExploreCommunities from "@/components/explore/ExploreCommunities"
import CreateExploreSearchTabs from "../../../components/explore/CreateExploreSearchTabs"
import { CREATE_EXPLORE_SEARCH_TABS } from "../../../constants"
import PageWrapper from "../../../components/PageWrapper"

const SearchExplorePage = () => {
  const [activeTab, setActiveTab] = useState(
    CREATE_EXPLORE_SEARCH_TABS[0].value
  )

  return (
    <PageWrapper>
      {() => (
        <div className=" w-full px-6 lg:w-[600px] mx-auto h-full flex flex-col">
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
