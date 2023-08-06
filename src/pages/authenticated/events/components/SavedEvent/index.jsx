import React from 'react'
import useInfinteScroller from '../../../../../hooks/useInfinteScroller'
import { formatTime, formatTimestampToDate } from '../../../../../utils/helpers'
import { Spinner } from "@chakra-ui/react";
import { useAuth } from '../../../../../context/authContext';
import { Link } from "react-router-dom"
import { PATH_NAMES } from '../../../../../constants/paths.constant';
import CONFIG from '../../../../../config';
import { BookmarkIcon, BookmarkIconFill, CalendarIcon, LocationIcon_2 } from "../../../../../components/Svgs"
import EventTiles from '../../../../../components/eventTiles';


function SavedEventTab() {

    const { userName, token, userId, setEventCategory } = useAuth()
    const [page, setPage] = React.useState(0) 

    const { results, isLoading, lastChildRef, refetch } = useInfinteScroller({url: "/events/get-saved-events?typeID="+userId, pageNumber:page, setPageNumber:setPage})

    return (
        <>
            {!isLoading && (

                <div className="mb-[100px] flex flex-col gap-5 mx-auto">  
                    {results.map((event, i) => { 
                        if (results.length === i + 1) {
                            return( 
                                <EventTiles event={event} ref={lastChildRef} getdata={refetch}  />
                            )
                        } else {
                            return( 
                                <EventTiles event={event} getdata={refetch}  />
                            )
                        }
                    })} 
                </div>
            )}


            {!isLoading && (
                <>
                    {results.length < 1 && ( 
                        <div className="w-full h-32 flex justify-center items-center">
                            <p className=" font-semibold " >No Records Found</p>
                        </div>
                    )}
                </>
            )}
            
            {isLoading && (
                <div className="w-full h-32 flex justify-center items-center">
                    <Spinner size='md' color='brand.chasescrollButtonBlue' />
                </div>
            )}
        </>
    )
}

export default SavedEventTab
