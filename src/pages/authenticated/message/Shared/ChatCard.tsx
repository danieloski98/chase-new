import React from 'react';
import { Chat } from '../../../../models/Chat';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, HStack, Heading, Text, VStack, Avatar } from '@chakra-ui/react';
import ProfilePhoto from '../../../../components/ProfilePhoto';
import CONFIG from '../../../../config';
import moment from 'moment';



interface IProps {
    chat: Chat;
    setSelected: (data: Chat) => void,
    smallScreen?: boolean;
    activeChat: Chat | null;
}
export default function ChatCard({ chat, setSelected, smallScreen, activeChat }: IProps) {
    const params = useParams();

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
            return `${CONFIG.RESOURCE_URL}${chat.otherUser.data.imgMain?.value}`;
        }
    }, [chat]);

    const name = React.useCallback(() => {
        if (chat.type === 'GROUP') {
            return `${chat.name}`;
        }else {
            return `${chat.otherUser.firstName} ${chat.otherUser.lastName}`;
        }
    }, [chat]);

  return (
    <HStack 
    onClick={handleSetActive}
    bg={ !smallScreen &&chat.id === activeChat?.id ? '#D0D4EB':'white'}
    borderRadius={chat.id === activeChat?.id ? '20px':'0px'}
    px='10px'
    width='100%' height='100px' justifyContent='space-between' borderBottomWidth={0.5} borderBottomColor='lightgrey' paddingY='4' cursor='pointer'>
        <HStack paddingRight='10px'>
            <Avatar 
                src={url()}
                name={name()}
                size='md'
                borderColor='red'
            />

            <VStack alignItems='flex-start'>
                <Heading size='sm' as='h4'>{chat.name[0].toUpperCase()}{chat.name.substring(1, chat.name.length)}</Heading>
                <Text>{chat?.lastMessage ? chat?.lastMessage.length > 20 ? `${chat?.lastMessage.substring(0, 20)}...` : chat?.lastMessage : ''}</Text>
            </VStack>
        </HStack>

        <VStack>
            {/* <Text>{moment(chat)}</Text> */}
        </VStack>
    </HStack>
  );
}
