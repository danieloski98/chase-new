import { HStack, Input, InputGroup, InputLeftElement, Image, Avatar, VStack, Text, Spinner } from '@chakra-ui/react';
import CONFIG from '../../../../config';
import { useAuth } from '../../../../context/authContext';
import { IMediaContent } from '../../../../models/MediaPost'
import { Fragment, useState } from 'react';
import { FiHeart, FiMessageSquare, FiDownload } from 'react-icons/fi'
import { useMutation, useQueryClient } from 'react-query';
import httpService from '../../../../utils/httpService';
import { ADD_POST_COMMENT, LIKE_POST } from '../../../../constants/endpoints.constant';
import { toast } from 'react-toastify';
import { COLORS } from '../../../../utils/colors';
import { formatTimeAgo } from '../../../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { CommentsIcon, EmptyHeartIcon, FilledHeartIcon } from '../../../../components/Svgs';
import VideoPlayer from '../../../../components/VideoPlayer';

interface IProps {
    messages: IMediaContent[];
    isLoading: boolean;
}
const MessageChip = ({message, userId}: {
    message: IMediaContent,
    userId: string
}) => {
    const navigate = useNavigate();
    const [comment, setComment] = useState('');

    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: () => httpService.post(`${LIKE_POST}/${message.id}`),
        onSuccess: (data) => {
            toast.success('Post liked');
            queryClient.invalidateQueries(['getMessages'])
        }
    })

    const commentPost = useMutation({
        mutationFn: () => httpService.post(`${ADD_POST_COMMENT}`, { postID: message.id, comment }),
        onSuccess: (data) => {
            toast.success('comment saved');
            queryClient.invalidateQueries(['getMessages'])
            setComment('')
        }
    })
    return (
        <Fragment key={message?.id}>
            <HStack alignItems='flex-start' flexDirection={message?.user.userId === userId ? 'row':'row-reverse'}>
            <div
            className={`rounded-t-xl p-3 text-sm w-full ${message?.user?.userId === userId
                ? "bg-white text-gray-800 rounded-bl-xl"
                : "bg-white text-gray-800 rounded-br-xl"
                } `}
            >
            {message?.mediaRef !== null ? (
                <div>
                    <Text textAlign={message.user.userId === userId ? 'right' : 'left'} marginBottom={'10px'}>~{ message?.user?.username }</Text>
                    { message.type === 'WITH_IMAGE' &&  message.mediaRef.split('.')[1] ==='mp4' && (
                         <div className="flex flex-col gap-2">
                            <VideoPlayer videoUrl={`${CONFIG.RESOURCE_URL}/${message?.mediaRef}`}/>
                            {message?.text ? message?.text : ''}
                        </div>
                    )}
                    {
                         message.type === 'WITH_IMAGE' && message.mediaRef.split('.')[1] !=='mp4' && (
                            <div className="flex flex-col gap-2">
                                <img
                                    src={`${CONFIG.RESOURCE_URL}${message?.mediaRef}`}
                                    alt="media"
                                    className="cursor-pointer sm:max-w-[100%] lg:max-w-[300px]"
                                    // onClick={() => toggleMediaVisibility(`${CONFIG.RESOURCE_URL}${message?.mediaRef}`)}
                                />
                            {message?.text ? message?.text : ''}
                            </div>
                         )
                    }
                    {
                        message.type === 'WITH_FILE' && (
                            <div className="flex flex-col gap-2">
                                <div className="w-32 h-32 flex items-center justify-center">
                                    {message.mediaRef !== '' || message.mediaRef.length < 1 && message.mediaRef.split('.')[1].toUpperCase()}
                                    { (
                                       <HStack width='100%'>
                                         <a href={`${CONFIG.RESOURCE_URL}${message?.mediaRef}`} download={message.mediaRef}>
                                            <FiDownload fontSize='40px' color={COLORS.chasescrollBlue} className='cursor-pointer' />
                                        </a>
                                        <Text>Download File {message.mediaRef}</Text>
                                       </HStack>
                                    )}
                                </div>
                            {message?.text ? message?.text : ''}
                            </div>
                        )
                    }
                </div>
            ) : (
                <VStack alignItems={message.user.userId === userId ? 'right' : 'left'}>
                    <Text textAlign={message.user.userId === userId ? 'right' : 'left'} marginBottom={'10px'}>~{ message?.user?.username }</Text>
                    <Text>{message?.text}</Text>
                </VStack>
            )}
            <Text size='xs' color='gray.400' textAlign={message?.user.userId === userId ? 'right' : 'left'}>{formatTimeAgo(message.timeInMilliseconds)}</Text>
        </div>
        <Avatar 
            src={`${CONFIG.RESOURCE_URL}/${message?.user?.data.imgMain.value}`}
            name={`${message.user.username}`}
            size={['xs', 'sm']}
        />
            </HStack>

        <HStack width='100%' flexDirection={message.user.userId === userId ? 'row' : 'row-reverse'} justifyContent='space-between' alignItems='center' alignSelf={message?.user.userId === userId ? 'flex-end':'flex-start'} marginTop='10px' >
            <InputGroup>
                <InputLeftElement>
                    <Avatar size='sm' src={`${CONFIG.RESOURCE_URL}${message?.user?.data.imgMain.value}`} name={`${message.user.firstName} ${message.user.lastName}`} />
                </InputLeftElement>
                <Input value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => { e.key === 'Enter' && commentPost.mutate()}} placeholder='Add a comment' width='250px' height={'40px'} bg='white' borderTopLeftRadius='20px' borderBottomLeftRadius='20px' borderTopRightRadius='20px' />
            </InputGroup>

            <HStack alignItems='center'>
                <VStack spacing={0} cursor='pointer' onClick={() => mutate()}>
                    {!isLoading && (
                        <div className='cursor-pointer flex flex-col justify-center items-center'>
                            { message.likeCount > 0 ? <FilledHeartIcon /> : <EmptyHeartIcon />}
                            <Text>{message.likeCount}</Text>
                        </div>
                    )}
                    { isLoading && (
                        <Spinner color={COLORS.chasescrollBlue} />
                    )}
                </VStack>

                <VStack spacing={0}>
                    {commentPost.isLoading && (
                        <Spinner color={COLORS.chasescrollBlue} />
                    )}
                    {!commentPost.isLoading && (
                        <div onClick={() => navigate(`/home/comments/${message.id}`)} className='cursor-pointer flex flex-col justify-center items-center'>
                          <CommentsIcon />
                          <Text width='100%'>{message.commentCount}</Text>
                        </div>
                    )}
                </VStack>
            </HStack>
        </HStack>
        </Fragment>
    )
}
const MessagePanel = ({messages, isLoading}: IProps) => {
    const { userId } = useAuth();
    const id: string | null = userId as string | null
  return (
    <div className={`flex flex-col w-full h-full gap-4 sm:px-5  lg:px-10 ${isLoading ? 'justify-center items-center' : ''}`} id='v'>
    {messages?.map((message, i) => (
        <div key={i} className={`sm:min-w-32 sm:max-w-32 md:max-w-[100px] lg:min-w-[400px] pb-5 border-b-[2px] m border-gray-300 h-aut0 ${message?.user?.userId === userId
            ? "rounded-bl-xl self-end"
            : "rounded-br-xl self-start"
            }`}>
            <MessageChip message={message} userId={id as string} />
        </div>
        ))}
</div>
  )
}

export default MessagePanel
