import { useEffect, useState } from "react"
import { PEOPLE_PROFILES } from "../../constants"
import { useAuth } from "../../context/authContext"
import { useFetch } from "../../hooks/useFetch"
import { GET_SUGGESTED_FRIENDS, REMOVE_FRIEND, SEND_FRIEND_REQUEST } from "../../constants/endpoints.constant"
import ExplorePerson from "./ExplorePerson"
import Loader from "../Loader"

const ExplorePeople = () => {
  const [isConnected, setIsConnected] = useState(true)
  const [suggestions, setSuggestions] = useState([])
  const { token } = useAuth()
  const { sendRequest } = useFetch()

  const getSuggestions = async () => {
    const suggestions = await sendRequest(
      GET_SUGGESTED_FRIENDS,
      'GET',
      null,
      { Authorization: `Bearer ${token}` }
    )
    if (suggestions) setSuggestions(suggestions)
  }

  useEffect(() => {
    getSuggestions()
  }, [])

  return (
    <div className="w-full flex justify-center items-center ">
      <ul>
        {!suggestions.content ? (
          <Loader />
        ) : suggestions?.content?.map(person => (
          <ExplorePerson key={person?.userId} person={person} />
        ))}
      </ul>
    </div>
  )
}

export default ExplorePeople
