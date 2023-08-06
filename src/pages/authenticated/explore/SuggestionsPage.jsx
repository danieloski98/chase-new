import { Link } from "react-router-dom"
import { PATH_NAMES } from "@/constants/paths.constant"
import PageWrapper from "@/components/PageWrapper"
import { SUGGESTIONS_ARRAY } from "@/constants"
import { CaretLeftIcon } from "@/components/Svgs"
import { useEffect, useState } from "react"
import Suggestion from "../../../components/explore/Suggestion"
import { GET_SUGGESTED_FRIENDS } from "../../../constants/endpoints.constant"
import { useAuth } from "../../../context/authContext"
import { useFetch } from "../../../hooks/useFetch"

const SuggestionsPage = () => {
  const [suggestions, setSuggestions] = useState([])
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

  useEffect(() => {
    getSuggestions()
  }, [check])
  console.log(suggestions);

  return (
    <PageWrapper>
      {() => (
        <div className="bg-chasescrollBgBlue pb-20">
          <header className="relative flex items-center justify-between bg-[#D0D4EB]">
            <Link
              to={PATH_NAMES.explore}
              className="absolute top-2 left-0 text-left justify-center items-center p-4"
            >
              <CaretLeftIcon />
            </Link>
            <h1 className="text-center w-full lg:text-4xl text-3xl py-4">Suggestions</h1>
          </header>

          <div className="flex gap-4 p-4 flex-wrap items-center justify-center overflow-auto w-full">
            {suggestions?.map(suggestion => (
              <div key={suggestion?.userId} className="w-40 rounded-b-3xl rounded-tl-3xl">
                <Suggestion
                  data={suggestion}
                  key={suggestion.id}
                  userId={suggestion?.userId}
                  firstName={suggestion?.firstName}
                  lastName={suggestion?.lastName}
                  publicProfile={suggestion?.publicProfile}
                  username={suggestion?.username}
                  setCheck={setCheck}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default SuggestionsPage
