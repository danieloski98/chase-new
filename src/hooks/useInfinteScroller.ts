import React from 'react'
import { useQuery } from 'react-query';
import httpService from '../utils/httpService'
import { PaginatedResponse } from '../models/PaginatedResponse'
import { AxiosResponse } from 'axios'; 
import lodash from "lodash"

type IProps = {
    url: string;
    pageNumber: number;
    setPageNumber:  (value: React.SetStateAction<number>) => void;
    search?: string
}

function useInfinteScroller<T>({ url, pageNumber, setPageNumber, search }: IProps) {
    const [results, setResults] = React.useState<T[]>([]);
    const [hasNextPage, setHasNextPage] = React.useState(false);
    const intObserver = React.useRef<IntersectionObserver>();


    // useQuery
    const { data, isLoading, isError, error, refetch, isRefetching } = useQuery<AxiosResponse<PaginatedResponse<T>, PaginatedResponse<T>>>([`get${url}`, pageNumber ], () => httpService.get(`${url}`, {
      params : {
        page: pageNumber
      }
    }), {
        onSuccess: (data) => {
          const item: PaginatedResponse<T> = data?.data as PaginatedResponse<T>
          // console.log(item);
              // results.push(...item.content);
              // setResults(results);
              // //setResults(prev => [...data.data.content, ...prev]);
              // setHasNextPage(data.data.last ? false:true);
              // window.scrollTo(0, window.innerHeight);
          if(isRefetching) {  
            results.push(...item.content); 
            // setResults(lodash.uniqBy(results, search ? search : "id"));
            // setResults(lodash.uniq(item?.content));
            setResults(lodash.uniq(results));
          } else {
            // setResults(lodash.uniqBy(item?.content, "id"));
            setResults(lodash.uniq(item?.content));
          }
          setHasNextPage(data.data.last ? false:true);
          window.scrollTo(0, window.innerHeight); 
        }
    })

    const lastChildRef = React.useCallback((post: any) => {
        if (isLoading) return;
        if (intObserver.current) intObserver.current.disconnect();
        intObserver.current = new IntersectionObserver((posts) => {
          if (posts[0].isIntersecting && hasNextPage) {
            setPageNumber(prev => prev + 1); 
          }
        });
        if (post) intObserver.current.observe(post);
       }, [isLoading, hasNextPage, setPageNumber]);

  return {
    data,
    isLoading,
    isError, 
    error, 
    refetch,
    hasNextPage,
    lastChildRef,
    results,
    isRefetching
  }
}

export default useInfinteScroller