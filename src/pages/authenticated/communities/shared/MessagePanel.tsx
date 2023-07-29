import { HStack, Input, InputGroup, InputLeftElement, Image, Avatar, VStack, Text, Spinner } from '@chakra-ui/react';
import CONFIG from '../../../../config';
import { useAuth } from '../../../../context/authContext';
import { IMediaContent } from '../../../../models/MediaPost'
import { Fragment, useState } from 'react';
import { FiHeart, FiMessageSquare } from 'react-icons/fi'
import { useMutation, useQueryClient } from 'react-query';
import httpService from '../../../../utils/httpService';
import { ADD_POST_COMMENT, LIKE_POST } from '../../../../constants/endpoints.constant';
import { toast } from 'react-toastify';
import { COLORS } from '../../../../utils/colors';
import { formatTimeAgo } from '../../../../utils/helpers';

interface IProps {
    messages: IMediaContent[];
    isLoading: boolean;
}
const MessageChip = ({message, userId}: {
    message: IMediaContent,
    userId: string
}) => {
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
            <div
            className={`rounded-t-xl p-3 text-sm w-full ${message?.user?.userId === userId
                ? "bg-white text-gray-800 rounded-bl-xl"
                : "bg-white text-gray-800 rounded-br-xl"
                } `}
            >
            {message?.mediaRef !== null ? (
                <div className="flex flex-col gap-2">
                    <img
                        src={`${CONFIG.RESOURCE_URL}${message?.mediaRef}`}
                        alt="media"
                        className="cursor-pointer sm:max-w-[100%] lg:max-w-[400px]"
                        // onClick={() => toggleMediaVisibility(`${CONFIG.RESOURCE_URL}${message?.mediaRef}`)}
                    />
                    {message?.text ? message?.text : ''}
                </div>
            ) : message?.text}
            <Text size='xs' color='gray.400' textAlign={message?.user.userId === userId ? 'right' : 'left'}>{formatTimeAgo(message.timeInMilliseconds)}</Text>
        </div>

        <HStack width='100%' flexDirection={message.user.userId === userId ? 'row' : 'row-reverse'} justifyContent='space-between' alignItems='center' alignSelf={message?.user.userId === userId ? 'flex-end':'flex-start'} marginTop='10px' >
            <InputGroup>
                <InputLeftElement>
                    <Avatar size='sm' src={`${CONFIG.RESOURCE_URL}${message?.user?.data.imgMain}`} name={`${message.user.firstName} ${message.user.lastName}`} />
                </InputLeftElement>
                <Input value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => { e.key === 'Enter' && commentPost.mutate()}} placeholder='Add a comment' width='250px' height={'40px'} bg='white' borderTopLeftRadius='20px' borderBottomLeftRadius='20px' borderTopRightRadius='20px' />
            </InputGroup>

            <HStack alignItems='center'>
                <VStack spacing={0} cursor='pointer' onClick={() => mutate()}>
                    {!isLoading && (
                        <>
                            <FiHeart fontSize='20px' />
                            <Text>{message.likeCount}</Text>
                        </>
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
                        <>
                          <FiMessageSquare fontSize='20px' />
                          <Text>{message.commentCount}</Text>
                        </>
                    )}
                </VStack>
            </HStack>
        </HStack>
        </Fragment>
    )
}
const MessagePanel = ({messages, isLoading}: IProps) => {
    const { userId } = useAuth()
  return (
    <div className={`flex flex-col w-full h-full gap-4 sm:px-5  lg:px-10 ${isLoading ? 'justify-center items-center' : ''}`} id='v'>
    {messages?.map((message, i) => (
        <div key={i} className={`sm:min-w-32 sm:max-w-32 md:max-w-[100px] lg:min-w-[400px] pb-5 border-b-[2px] m border-gray-300 h-aut0 ${message?.user?.userId === userId
            ? "rounded-bl-xl self-end"
            : "rounded-br-xl self-start"
            }`}>
            <MessageChip message={message} userId={userId as string} />
        </div>
        ))}
</div>
  )
}

export default MessagePanel