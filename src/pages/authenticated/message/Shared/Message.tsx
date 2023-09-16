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
import { HStack, Text, Avatar, VStack, Flex, Spinner } from '@chakra-ui/react'
import { formatTimeAgo } from '../../../../utils/helpers';
import { COLORS } from '../../../../utils/colors';
import { FiHeart, FiMessageSquare, FiDownload } from 'react-icons/fi'

interface IProps {
    messages: ChatMessage[];
    isLoading: boolean;
}

const MessageChip = ({message, userId}: {
    message: ChatMessage,
    userId: string
}) => {
    return (
        <React.Fragment key={message?.id}>
            <HStack flexDirection={message?.self ? 'row':'row-reverse' } alignItems='flex-start'>
                <div
                className={`rounded-t-xl p-3 text-sm w-full ${message?.self
                    ? "bg-chasescrollBlue text-white rounded-bl-xl"
                    : "bg-white text-gray-800 rounded-br-xl"
                    } `}
                >
                    {message?.mediaType !== null ? (
                        <div>
                            {
                                !message.self && (
                                    <Text width='100%' textAlign={'left'} marginBottom={'10px'}>~{ message.createdBy.username }</Text>
                                )
                            }
                            { message.mediaType === 'VIDEO' &&  message.media.split('.')[1] ==='mp4' && (
                                <div className="flex flex-col gap-2">
                                    <VideoPlayer videoUrl={`${CONFIG.RESOURCE_URL}/${message?.media}`}/>
                                    <Text textAlign={'left'} marginBottom={'10px'}>{message?.message ? message?.message : ''}</Text>
                                </div>
                            )}
                            {
                                message.mediaType === 'PICTURE' && message.media.split('.')[1] !== 'mp4' && (
                                    <div className="flex flex-col gap-2">
                                        <img
                                            src={`${CONFIG.RESOURCE_URL}${message?.media}`}
                                            alt="media"
                                            className="cursor-pointer sm:max-w-[100%] lg:max-w-[300px] rounded-[10px]"
                                            // onClick={() => toggleMediaVisibility(`${CONFIG.RESOURCE_URL}${message?.mediaRef}`)}
                                        />
                                    <Text textAlign={'left'} marginBottom={'10px'}>{message?.message ? message?.message : ''}</Text>
                                    </div>
                                )
                            }{
                                message.mediaType !== 'PICTURE' && message.mediaType !== 'VIDEO' && (
                                    <div className="flex flex-col gap-2">
                                <div className="w-32 h-32 flex items-center justify-center">
                                    {message.media !== '' || message.media.length < 1 && message.media?.split('.')[1]?.toUpperCase()}
                                    { (
                                       <HStack width='100%'>
                                         <a href={`${CONFIG.RESOURCE_URL}${message?.media}`} download={message.media}>
                                            <FiDownload fontSize='40px' color={message.self ? 'white' : COLORS.chasescrollBlue} className='cursor-pointer' />
                                        </a>
                                        <Text>Download File {message.media}</Text>
                                       </HStack>
                                    )}
                                </div>
                            <Text textAlign={'left' } fontSize={'16px'}>{message?.message ? message?.message : ''}</Text>
                            </div>
                                )
                            }
                        </div>
                    ) : (
                        <VStack alignItems={'flex-end'} width='100%'>
                            {
                                !message.self && (
                                    <Text width='100%' textAlign={'left'} marginBottom={'10px'}>~{ message.createdBy.username }</Text>
                                )
                            }
                            <Text width='100%' fontSize={'14px'} textAlign={'left'}>{message?.message}</Text>
                        </VStack>
                    )}
                    <Text size='xs' fontSize={'12px'} mt='15px' color={'gray.400'} textAlign={'right'}>{formatTimeAgo(message.createdDate)}</Text>
                </div>
                <Avatar 
                    src={`${CONFIG.RESOURCE_URL}/${message?.createdBy?.data?.imgMain?.value}`}
                    name={`${message?.createdBy?.username}`}
                    size={['xs', 'sm']}
                />
            </HStack>

        </React.Fragment>
    )
}

 const Message = React.forwardRef<any, IProps>(({isLoading, messages}, ref) => {
    // ({ isLoading, messages, ref }: IProps) {
        console.log(messages);
        const { userId } = useAuth();
        const id: string | null = userId as string | null
        const [len, setLen] = React.useState(messages?.length);
    
        console.log(messages);
    
        React.useEffect(() => {
            if (messages?.length !== len) {
                setLen(messages?.length);
                document.querySelector('#lastMsg')?.scrollIntoView({ behavior: 'smooth' });
            }
        }, [messages, len])
      return (
        <div className={`flex flex-col w-full h-full gap-4 sm:px-5 py-12  lg:px-10 ${isLoading ? 'justify-center items-center' : ''}`} id='v'>
        {messages !== undefined && messages.map((message, i) => (
            <div id={i === messages.length - 1 ? 'lastMsg':''} ref={ i === messages?.length - 1 ? ref:null} key={i} className={`sm:min-w-32 sm:max-w-32 md:max-w-[100px] lg:min-w-[400px] pb-5 border-b-[2px] m border-gray-300 h-aut0 ${message?.self
                ? "rounded-bl-xl self-end"
                : "rounded-br-xl self-start"
                }`}>
                <MessageChip message={message} userId={id as string} />
            </div>
            ))}
            { isLoading && (
                <Flex width={'100%'} justifyContent={'center'} alignItems={'center'}>
                    <Spinner colorScheme='blue' color='chasescrollBlue' size='md' />
                </Flex>
            )}
    </div>
      )
})

export default Message;
