import { Link } from "react-router-dom" 
import { PATH_NAMES } from "../../../constants/paths.constant"
import PageWrapper from "../../../components/PageWrapper"
import { useAuth } from "../../../context/authContext.jsx"
import { useEffect, useState } from "react"
import { useFetch } from "../../../hooks/useFetch.js"
import {
  GET_SUGGESTED_FRIENDS, 
} from "../../../constants/endpoints.constant.js" 
import Carousel from "../../../components/exploreComponents/carousel/index.jsx" 
import CONFIG from "../../../config/index.js"
import UserTile from "../../../components/exploreComponents/sharedComponent/userTiles/index.js"

const Explore = () => { 
 
  const [suggestions, setSuggestions] = useState([])
  const { userName, token } = useAuth()
  const { sendRequest } = useFetch() 

  const getSuggestions = async () => {
    const suggestions = await sendRequest(GET_SUGGESTED_FRIENDS, "GET", null, {
      Authorization: `Bearer ${token}`,
    })
    if (suggestions) setSuggestions(suggestions?.content)
  } 

  useEffect(() => { 
    getSuggestions()
  }, [])

  return (
    <PageWrapper>
      {() => (
        <div className="py-9 flex flex-col gap-4">
          <header className="flex flex-col gap-4 px-4">
            <h1 className="text-3xl font-bold text-chasescrollDarkBlue">Hello {userName}</h1>
            <p className="text-chasescrollBlue font-bold">Top Events</p>
          </header>

          <section className="w-full mx-auto text-chasescrollBlue">
            <Carousel /> 
          </section>

          <section className="px-4 pb-8">
            <div className="flex justify-between">
              <h3 className="text-sm font-bold">People you may know</h3>
              <Link
                to={PATH_NAMES.suggestions}
                className="text-sm text-chasescrollBlue font-bold"
              >
                See all
              </Link>
            </div>
            <div className="flex gap-4 overflow-auto py-4">
              {suggestions?.slice(0, 6)?.map((suggestion: any) => (
                <div key={suggestion?.userId} className="w-40 rounded-b-3xl rounded-tl-3xl">
                  <UserTile
                    key={suggestion.id}
                    userId={suggestion?.userId}
                    data={suggestion}
                    firstName={suggestion?.firstName}
                    lastName={suggestion?.lastName}
                    publicProfile={suggestion?.publicProfile}
                    img={`${CONFIG.RESOURCE_URL}${suggestion?.data?.imgMain?.value}`}  
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </PageWrapper>
  )
}

export default Explore
