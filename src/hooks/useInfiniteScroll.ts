import React, { useState, useEffect } from 'react'
import { IMediaContent, IMediaPost } from '../models/MediaPost';
import httpService from '@/utils/httpService'
import { useMutation, useQuery } from 'react-query';

// const getPosts = async (pageParam = 0, userId: string, options = {}) => {
//     const response = await httpService.get(`/feed/get-user-and-friends-posts?userID=${userId}&page=${pageParam}&size=20`, options);
//     console.log(response.data);
//     return response.data as IMediaPost;
// }

function useInfiniteScroll({ userID, pageParam = 0}: {
    userID: string,
    pageParam: number
}) {
    const [results, setResults] = useState<IMediaContent[]>([]);
    const [hasNextPage, setHasNextPage] = useState(false);

    const { mutate } = useMutation({
      mutationFn: () => httpService.get(`/feed/get-user-and-friends-posts?userID=${userID}&page=${0}&size=20`),
      onSuccess: (data: any) => {
        const item: IMediaPost = data.data as IMediaPost;
        console.log(item.content);
        results.unshift(item.content[0]);
        setResults(results);
      }
    })

    // switching to usequery
    const { isError, error, isLoading, refetch } = useQuery(['getFeedsPosts', userID, pageParam], () => httpService.get(`/feed/get-user-and-friends-posts?userID=${userID}&page=${pageParam}&size=20`), {
        onSuccess: (data) => {
          console.log(`Called`);
            const item: IMediaPost = data.data as IMediaPost;
            //const sets = new Set([...results, ...data.data.content])
            //const arr = [...results, ...data.data.content];
            results.push(...item.content);
              setResults(results);
              //setResults(prev => [...data.data.content, ...prev]);
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
    refresh
  }
}

export default useInfiniteScroll