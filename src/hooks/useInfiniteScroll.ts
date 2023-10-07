import React, { useState } from 'react'
import { IMediaContent, IMediaPost } from '../models/MediaPost';
import httpService from '../utils/httpService'
import { useMutation, useQuery } from 'react-query';
import lodash from "lodash"



function useInfiniteScroll({ userID, pageParam = 0}: {
    userID: string,
    pageParam: number
}) {
    const [results, setResults] = useState<IMediaContent[]>([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [newIttem, setNew] = React.useState<IMediaContent[]>([]);

    const { mutate } = useMutation({
      mutationFn: () => httpService.get(`/feed/get-public-posts?userID=${userID}&page=${0}&size=20`),
      onSuccess: (data: any) => {
        console.log(data.data.content[0]);
        const item: IMediaPost = data.data as IMediaPost;
        //const arr = [...item.content, ...newIttem, ...results];
        newIttem.unshift(item.content[0]);
        // setNew(lodash.uniq(newIttem));

        setNew(lodash.uniqBy(newIttem, "id")); 
        //setResults(lodash.uniq(arr));
      }
    })

    // switching to usequery
    const { isError, error, isLoading, refetch } = useQuery(['getFeedsPosts', userID, pageParam], () => httpService.get(`/feed/get-user-and-friends-posts?userID=${userID}&page=${pageParam}&size=20`), {
        onSuccess: (data) => {
            const item: IMediaPost = data.data as IMediaPost;
            results.push(...item.content);
              setResults(results);
              setHasNextPage(data.data.last ? false:true);
              window.scrollTo(0, window.innerHeight);
        }
    })

    const refresh = React.useCallback((id: string) => {
        setResults(results.filter(item => item.id !== id));
    }, [results])
  return {
    results,
    isLoading,
    isError,
    error,
    hasNextPage,
    refetch, 
    mutate,
    refresh,
    newIttem
  }
}

export default useInfiniteScroll