import {useState } from "react" 
import ExplorePerson from "./ExplorePerson"
import Loader from "../Loader"
import { useQuery } from 'react-query'; 
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import httpService from '../../utils/httpService';
import { useAuth } from "../../context/authContext";

const ExplorePeople = () => {
  
  const [suggestions, setSuggestions] = useState([] as any) 

  // const getSuggestions = async () => {
  //   const suggestions = await sendRequest(
  //     GET_SUGGESTED_FRIENDS,
  //     'GET',
  //     null,
  //     { Authorization: `Bearer ${token}` }
  //   )
  //   if (suggestions) setSuggestions(suggestions)
  // }

  const { searchValue } = useAuth()

  const { isLoading } = useQuery(['getconnect'+searchValue], () => httpService.get('/user/suggest-connections', {
    params: {
      searchText: searchValue
    }
  }), {
    onError: (error: AxiosError<any, any>) => {
      toast.error(error.response?.data);
    }, 
    onSuccess: (data) => {
      setSuggestions(data.data.content);
    }
  })
  // useEffect(() => {
  //   getSuggestions()
  // }, [])

  return (
    <div className="w-full flex justify-center items-center ">
      <ul>
        {isLoading ? (
          <Loader />
        ) : suggestions?.map((person: any) => (
          <ExplorePerson key={person?.userId} person={person} />
        ))}
      </ul>
    </div>
  )
}

export default ExplorePeople