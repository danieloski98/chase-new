import { Link } from "react-router-dom"
import { PATH_NAMES } from "@/constants/paths.constant"
import PageWrapper from "@/components/PageWrapper"
import { SUGGESTIONS_ARRAY } from "@/constants"
import { CaretLeftIcon } from "@/components/Svgs"
import React, { useEffect, useState } from "react"
import Suggestion from "../../../components/explore/Suggestion"
import { GET_SUGGESTED_FRIENDS } from "../../../constants/endpoints.constant"
import { useAuth } from "../../../context/authContext"
import { useFetch } from "../../../hooks/useFetch"
import useInfinteScroller from "../../../hooks/useInfinteScroller"
import { Spinner } from "@chakra-ui/react"
import InfiniteScrollerComponent from "../../../hooks/infiniteScrollerComponent"
import UserTile from "../../../components/exploreComponents/sharedComponent/userTiles"

const SuggestionsPage = () => {
  const [suggestionsdata, setSuggestions] = useState([])
  const [check, setCheck] = useState(false)
  const { token } = useAuth()
  const { sendRequest } = useFetch()

  const getSuggestions = async () => {
    const suggestions = await sendRequest(
      GET_SUGGESTED_FRIENDS,
      'GET',
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (suggestions) setSuggestions(suggestions?.content)
  }

  const [page, setPage] = React.useState(0)
  const { results, isLoading, ref, refetch, isRefetching } = InfiniteScrollerComponent({url:'/user/suggest-connections', limit:20, filter: "userId"})

  useEffect(() => {
    getSuggestions()
  }, [check])  

  return (
    <PageWrapper>
      {() => (
        <div className="bg-chasescrollBgBlue pb-20">
          <header className=" flex items-center sticky top-0 z-[100] justify-between bg-[#D0D4EB]">
            <Link
              to={PATH_NAMES.explore}
              className="absolute top-2 left-0 text-left justify-center items-center p-4"
            >
              <CaretLeftIcon />
            </Link>
            <h1 className="text-center w-full lg:text-4xl text-3xl py-4">Suggestions</h1>
          </header>
          {!isLoading &&(
            <> 
              <div className="flex gap-4 p-4 flex-wrap items-center justify-center overflow-auto w-full">
                {results?.map((suggestion, i) => { 
                  if (results?.length === i + 1) {
                    return( 
                      <div  ref={ref}   key={suggestion?.userId} className="w-40 rounded-b-3xl rounded-tl-3xl">
                        <UserTile
                          ref={ref} 
                          data={suggestion}
                          key={suggestion.id}
                          userId={suggestion?.userId}
                          firstName={suggestion?.firstName}
                          lastName={suggestion?.lastName}
                          publicProfile={suggestion?.publicProfile}
                          username={suggestion?.username}  
                        /> 
                      </div>
                    )
                  } else {
                    return( 
                      <div key={suggestion?.userId} className="w-40 rounded-b-3xl rounded-tl-3xl">
                        <UserTile
                          data={suggestion}
                          key={suggestion.id}
                          userId={suggestion?.userId}
                          firstName={suggestion?.firstName}
                          lastName={suggestion?.lastName}
                          publicProfile={suggestion?.publicProfile}
                          username={suggestion?.username}  
                        />
                      </div>
                    )
                  }
                })}
              </div>

              {results?.length < 1 && ( 
                <div className=' w-full py-2 flex justify-center font-bold text-2xl ' >
                  No Records Found
                </div>
              )}
            </>
          )} 
          {(isLoading || isRefetching) && (
            <div className="w-full h-32 pb-8 flex justify-center items-center">
              <Spinner size='md' color='brand.chasescrollButtonBlue' />
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  )
}

export default SuggestionsPage
