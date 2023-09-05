import ExplorePerson from "./ExplorePerson" 
import { useAuth } from "../../context/authContext";
import { Spinner } from "@chakra-ui/react"; 
import InfiniteScrollerComponent from "../../hooks/infiniteScrollerComponent";

const ExplorePeople = () => { 
 
  const { searchValue } = useAuth() 

  const { results, isLoading, ref, refetch, isRefetching } = InfiniteScrollerComponent({url:`/user/search-users?searchText=${searchValue}`, limit:10, filter: "userId"})
 

  return (
    <div className="w-full flex justify-center items-center ">
      <ul>
        {/* {dataInfo?.length < 0 ? (
          <Loader />
        ) :  */}
        {results?.map((person: any, i: number) => { 
          if (results.length === i + 1) {
            return (
              <ExplorePerson key={person?.userId} person={person} ref={ref} refetch={refetch} /> 
              )
          } else {
            return (
                <ExplorePerson key={person?.userId} person={person} refetch={refetch} /> 
            )
          }
         })
         
        //  suggestions?.map((person: any) => (
        //   <ExplorePerson key={person?.userId} person={person} />
        // ))
        }

     {(isLoading || isRefetching) && (
       <div className="w-full h-32 flex justify-center items-center">
         <Spinner size='md' color='brand.chasescrollButtonBlue' />
       </div>
     )}
     {!isLoading && results.length <= 0 && (
      <div className=' w-full py-5 flex justify-center font-bold text-2xl ' >
        No Records Found
      </div>
     )}
      </ul>
    </div>
  )
}

export default ExplorePeople
