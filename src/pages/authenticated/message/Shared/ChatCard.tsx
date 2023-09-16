import React from 'react';
import { Chat } from '../../../../models/Chat';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, HStack, Heading, Text, VStack, Avatar, Box, Spinner } from '@chakra-ui/react';
import ProfilePhoto from '../../../../components/ProfilePhoto';
import CONFIG from '../../../../config';
import moment from 'moment';
import { useQuery, useQueryClient } from 'react-query';
import httpService from '../../../../utils/httpService';



interface IProps {
    chat: Chat;
    setSelected: (data: Chat) => void,
    smallScreen?: boolean;
    activeChat: Chat | null;
}
export default function ChatCard({ chat, setSelected, smallScreen, activeChat }: IProps) {
    const params = useParams();
    const [newMsg, setNewMsg] = React.useState(0);
    const queryClient = useQueryClient()

    // query
    const { isLoading } = useQuery(['getMessageCoount', chat.id], () => httpService.get(`/chat/new_message_count`, {
        params: {
            chatID: chat.id,
        }
    }), {
        refetchInterval: 1000,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['getChats'])
            setNewMsg(data?.data);
        }
    })

    const handleSetActive = () => {
        setSelected(chat);
    }

    React.useEffect(() => {
        if (smallScreen === false) {
            if (chat.id === params.id) setSelected(chat);
        }
    }, [chat, params.id, setSelected, smallScreen]);

    // FUNCTIONS

    const url = React.useCallback(() => {
        if (chat.type === 'GROUP') {
            return `${CONFIG.RESOURCE_URL}${chat.image}`;
        }else {
            return chat.otherUser.data.imgMain?.value ? `${CONFIG.RESOURCE_URL}${chat.otherUser.data.imgMain?.value}`:`${CONFIG.RESOURCE_URL}${chat.image}`;
        }
    }, [chat]);

    const name = React.useCallback(() => {
        if (chat.type === 'GROUP') {
            return `${chat.name}`;
        }else {
            return `${chat.otherUser.username}`;
        }
    }, [chat]);

  return (
    <HStack 
        onClick={handleSetActive}
        bg={ !smallScreen &&chat.id === activeChat?.id ? '#D0D4EB':'white'}
        borderRadius={chat.id === activeChat?.id ? '20px':'0px'}
        width='100%' height='100px' justifyContent='space-between' borderBottomWidth={0.5} borderBottomColor='lightgrey' paddingY='4' cursor='pointer'>

        <HStack width='100%'  paddingRight='10px' justifyContent='space-between'>

           <HStack>
                <VStack justifyContent={'center'} alignItems='center' spacing={0} width='50px' height='50px' borderRadius='25px' borderWidth={chat.type === 'GROUP' ? 2:0} borderColor='brand.chasescrollBlue' overflow='hidden'>
                    <Avatar 
                            src={url()}
                            name={name()}
                            size='md'
                        />
                </VStack>
                <VStack alignItems={'flex-start'}>
                    { chat.type === 'ONE_TO_ONE' && <Heading size='sm' as='h4'>@{chat.otherUser.username.toUpperCase().length > 10 ? `${chat.otherUser.username.substring(0, 10)}...`:chat.otherUser.username}</Heading>}
                    { chat.type === 'GROUP' && <Heading size='sm' as='h4'>{chat.name[0].toUpperCase()}{chat.name.substring(1, chat.name.length).length > 10 ? `${chat.name.substring(1, 10)}...`: chat.name.substring(1, chat.name.length)}</Heading> }
                    <Text>{chat?.lastMessage ? chat?.lastMessage.length > 5 ? `${chat?.lastMessage.substring(0, 5)}...` : chat?.lastMessage : ''}</Text>
                </VStack>
           </HStack>

            <VStack flex={0.5}  alignItems='flex-end' >
            <Text fontSize={'12px'} color='gray.500'>{moment(chat.lastMessageUpdate).fromNow().replace('minutes', 'mins')}</Text>

                <HStack justifyContent='flex-end' width='100%'>
                    { isLoading && <Spinner color='chasescrollBlue' />}
                    { !isLoading && newMsg > 0 && <Badge colorScheme='blue'>{newMsg}</Badge> }
                </HStack>
            </VStack>

        </HStack>

        
    </HStack>
  );
}
