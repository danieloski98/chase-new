import React from 'react'
import { Link } from 'react-router-dom';
import CONFIG from '@/config';
import { PATH_NAMES } from '@/constants/paths.constant';
import Loader from '../Loader';

interface IProps {
    communities: Array<any>;
    loading: boolean;
    hasError: boolean;
}

function MyCommunities({ communities, loading, hasError }: IProps) {

  if (loading) {
    return (
      <div className='w-full flex justify-center items-center'>
        <Loader />
      </div>
    )
  }

  if (!loading && hasError) {
    return (
      <div className="w-full flex justify-center items-center">
        <p className='text-4xl'>An error occured</p>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center pb-16">
                {communities?.map(community => (
                  <div
                    key={community.id}
                    className="py-4 flex items-center gap-4 w-full max-w-2xl border-gray-400 border-b-[1px] "
                  >
                    <div className="border-chasescrollBlue border-l-4 rounded-b-full rounded-tl-full">
                      <img
                        src={community.data.imgSrc ? `${CONFIG.RESOURCE_URL}/${community.data.imgSrc}` : `https://ui-avatars.com/api/?background=random&name=${community.data.name}&length=1`}
                        alt={community.name}
                        className="flex-grow w-24 max-w-[96px] h-24 object-cover border-l-4 border-white rounded-b-full rounded-tl-full"
                      />
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex flex-col gap-3">
                        <Link to={`${PATH_NAMES.community}/${community.id}`} className="font-medium text-lg md:text-2xl">
                          {community.data.name}
                        </Link>
                        <div className="text-sm md:text-base opacity-[50%]">
                          {community.data.description}
                        </div>
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
  )
}

export default MyCommunities