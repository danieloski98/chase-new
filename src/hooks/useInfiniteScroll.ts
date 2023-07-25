import React, { useState, useEffect } from 'react'
import { IMediaContent, IMediaPost } from '@/models/MediaPost';
import httpService from '@/utils/httpService'

const getPosts = async (pageParam = 0, userId: string, options = {}) => {
    const response = await httpService.get(`/feed/get-user-and-friends-posts?userID=${userId}&page=${pageParam}&size=20`, options);
    console.log(response.data);
    return response.data as IMediaPost;
}

function useInfiniteScroll({ userID, pageParam = 0}: {
    userID: string,
    pageParam: number
}) {
    const [results, setResults] = useState<IMediaContent[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<any>({});
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        setError({})

        const abortController = new AbortController();
        const { signal } = abortController;
        getPosts(pageParam, userID, { signal })
        .then((data: IMediaPost) => {
            setResults(prev => prev.concat(data.content));
            setHasNextPage(data.last ? false:true);
            setIsLoading(false);
            window.scrollTo(0, 500);
        })
        .catch((error) => {
            setIsLoading(false);
            if (signal.aborted) return;
            setIsError(error);
            setError(error);
        })

        return () => {
            abortController.abort();
        }
    }, [pageParam, userID]);
  return {
    results,
    isLoading,
    isError,
    error,
    hasNextPage,
  }
}

export default useInfiniteScroll