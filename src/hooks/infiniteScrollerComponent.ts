import React from 'react'
import { useQuery } from 'react-query' 
import httpService from '../utils/httpService';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import lodash from 'lodash'; 

interface Props {
    url: string,
    filter: string,
    limit: number
}

function InfiniteScrollerComponent(props: Props) {
    const {
        url,
        filter,
        limit
    } = props

    const [size, setSize] = React.useState(10)
    const [hasNextPage, setHasNextPage] = React.useState(false);
    const [results, setResults] = React.useState([] as any) 
    const intObserver = React.useRef<IntersectionObserver>();

    const { data, isLoading, refetch, isRefetching } = useQuery([url], () => httpService.get(`${url}`, {
        params: {
          size: size
        }
      }), {
        onError: (error: AxiosError<any, any>) => {
          toast.error(error.response?.data);
        }, 
        
        onSuccess: (data: any) => {  
            console.log(data);
            if(isRefetching){
                results.push(...data?.data?.content);  

                setResults(lodash.uniqBy(results, filter ? filter : "id")); 
            } else {

                setResults(lodash.uniqBy(data?.data?.content, filter ? filter : "id")); 
            }
            setHasNextPage(data.data.last ? false:true);
            window.scrollTo(0, window.innerHeight); 
        //   setData(data.data.content);
        }
    })  
    
    

    const ref = React.useCallback((post: any) => {
        if (isLoading && isRefetching) return;
        if (intObserver.current) intObserver.current.disconnect();
        intObserver.current = new IntersectionObserver((posts) => {
          if (posts[0].isIntersecting && hasNextPage && !isRefetching) {
            setSize(prev => prev + limit); 
            refetch()
            console.log(size); 
          }
        });
        if (post) intObserver.current.observe(post);
       }, [isLoading, hasNextPage, setSize, isRefetching]);

    return {
        data,
        isLoading, 
        refetch, 
        results,
        ref,
        isRefetching
    }
}

export default InfiniteScrollerComponent
