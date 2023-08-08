import {useState, useEffect } from "react" 
import ExplorePerson from "./ExplorePerson"
import Loader from "../Loader"
import { useQuery } from 'react-query'; 
import { AxiosError } from "axios";
import { toast } from "react-toastify";
// import httpService from '../../utils/httpService';
import { useAuth } from "../../context/authContext";
import { Spinner } from "@chakra-ui/react";
import useInfinteScroller from "../../hooks/useInfinteScroller";
// import page from "src/pages/authenticated/home/page";
import React from "react";
import httpService from "../../utils/httpService";

const ExplorePeople = () => { 
 
  const { searchValue } = useAuth()

  const [dataInfo, setData] = useState([] as any)

  const [page, setPage] = React.useState(0)

  const { results, isLoading, lastChildRef, refetch } = useInfinteScroller({url:'/user/search-users', pageNumber:page, setPageNumber:setPage})

  const { data } = useQuery(['getconnect'+searchValue], () => httpService.get('/user/search-users', {
    params: {
      searchText: searchValue
    }
  }), {
    onError: (error: AxiosError<any, any>) => {
      toast.error(error.response?.data);
    }, 
    onSuccess: (data) => {
      console.log(data);
      
      setData(data.data.content);
    }
  })

  useEffect(() => {
    if(!searchValue){ 
      setData(results)
    }
  }, [data, results, searchValue])

  return (
    <div className="w-full flex justify-center items-center ">
      <ul>
        {/* {dataInfo?.length < 0 ? (
          <Loader />
        ) :  */}
        {dataInfo?.map((person: any, i: number) => {
          if(searchValue){
            return (
                <ExplorePerson key={person?.userId} person={person} refetch={refetch} /> 
            )
          } else { 
            if (results.length === i + 1) {
              return (
                <ExplorePerson key={person?.userId} person={person} ref={lastChildRef} refetch={refetch} /> 
                )
            } else {
              return (
                  <ExplorePerson key={person?.userId} person={person} refetch={refetch} /> 
              )
            }
          }
         })
         
        //  suggestions?.map((person: any) => (
        //   <ExplorePerson key={person?.userId} person={person} />
        // ))
        }

     {isLoading && (
       <div className="w-full h-32 flex justify-center items-center">
         <Spinner size='md' color='brand.chasescrollButtonBlue' />
       </div>
     )}
     {!isLoading && dataInfo.length <= 0 && (
      <div className=' w-full py-5 flex justify-center font-bold text-2xl ' >
        No Records Found
      </div>
     )}
      </ul>
    </div>
  )
}

export default ExplorePeople
