import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VideoPlayer from '../../../../components/VideoPlayer';
import CONFIG from '../../../../config';
import { useAuth } from '../../../../context/authContext';
import { ChatMessage } from '../../../../models/ChatMessage';
import { PaginatedResponse } from '../../../../models/PaginatedResponse';
import httpService from '../../../../utils/httpService';
import { Text } from '@chakra-ui/react'
import { formatTimeAgo } from '../../../../utils/helpers';

interface IProps {
    messages: PaginatedResponse<ChatMessage>;
    isLoading: boolean;
}

const MessageChip = ({message, userId}: {
    message: ChatMessage,
    userId: string
}) => {
    const navigate = useNavigate();
    const [comment, setComment] = React.useState('');
    console.log(message);

    const queryClient = useQueryClient();
    const mu = useMutation({
        mutationFn: () => httpService.post(`/hdhell/${message.id}`),
        onSuccess: (data) => {
            toast.success('Post liked');
            queryClient.invalidateQueries(['getMessages'])
        }
    })

    const commentPost = useMutation({
        mutationFn: () => httpService.post(`/kkm`, { postID: message.id, comment }),
        onSuccess: (data) => {
            toast.success('comment saved');
            queryClient.invalidateQueries(['getMessages'])
            setComment('')
        }
    })
    return (
        <React.Fragment key={message?.id}>
            <div
            className={`rounded-t-xl p-3 text-sm w-full ${message?.self
                ? "bg-white text-gray-800 rounded-bl-xl"
                : "bg-white text-gray-800 rounded-br-xl"
                } `}
            >
            {message?.mediaType !== null ? (
                <div>
                    { message.mediaType === 'VIDEO' &&  message.media.split('.')[1] ==='mp4' && (
                         <div className="flex flex-col gap-2">
                            <VideoPlayer videoUrl={`${CONFIG.RESOURCE_URL}/${message?.media}`}/>
                            {message?.message ? message?.message : ''}
                        </div>
                    )}
                    {
                         message.mediaType === 'PICTURE' && message.media.split('.')[1] !== 'mp4' && (
                            <div className="flex flex-col gap-2">
                                <img
                                    src={`${CONFIG.RESOURCE_URL}${message?.media}`}
                                    alt="media"
                                    className="cursor-pointer sm:max-w-[100%] lg:max-w-[400px]"
                                    // onClick={() => toggleMediaVisibility(`${CONFIG.RESOURCE_URL}${message?.mediaRef}`)}
                                />
                            {message?.message ? message?.message : ''}
                            </div>
                         )
                    }
                </div>
            ) : message?.message}
            <Text size='xs' color='gray.400' textAlign={message?.self ? 'right' : 'left'}>{formatTimeAgo(message.createdDate)}</Text>
        </div>

        </React.Fragment>
    )
}

export default function Message({ isLoading, messages }: IProps) {
    const { userId } = useAuth();
    const id: string | null = userId as string | null
  return (
    <div className={`flex flex-col w-full h-full gap-4 sm:px-5 py-12  lg:px-10 ${isLoading ? 'justify-center items-center' : ''}`} id='v'>
    {messages?.content.map((message, i) => (
        <div key={i} className={`sm:min-w-32 sm:max-w-32 md:max-w-[100px] lg:min-w-[400px] pb-5 border-b-[2px] m border-gray-300 h-aut0 ${message?.self
            ? "rounded-bl-xl self-end"
            : "rounded-br-xl self-start"
            }`}>
            <MessageChip message={message} userId={id as string} />
        </div>
        ))}
</div>
  )
}
