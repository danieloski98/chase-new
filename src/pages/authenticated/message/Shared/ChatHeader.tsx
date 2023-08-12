import React from 'react';
import { HStack, Heading, Text, VStack, Menu, MenuButton, MenuList, MenuItem, Spinner, Avatar } from '@chakra-ui/react';
import ProfilePhoto from '../../../../components/ProfilePhoto';
import CONFIG from '../../../../config';
import { ICommunity } from '../../../../models/Communitty';
import { FiAlertCircle, FiChevronLeft } from 'react-icons/fi'
import { COLORS } from '../../../../utils/colors';
import { Link, useNavigate } from 'react-router-dom'
import { PATH_NAMES } from '../../../../constants/paths.constant';
import { useAuth } from '../../../../context/authContext';
import { useMutation, useQueryClient } from 'react-query';
import httpService from '../../../../utils/httpService';
import { toast } from 'react-toastify';
import { Chat } from 'src/models/Chat';


interface IProps {
    chat: Chat;
    setActive: (data: Chat| null) => void
}

const ChatHeader = ({ chat, setActive }: IProps) => {
    console.log(chat);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { userId } = useAuth();
    const { isLoading, mutate } = useMutation({
        mutationFn: () => httpService.delete(`/chat/leave-chat?chatID=${chat.id}`),
        onSuccess: () => {
            toast.success('Action successful');
            queryClient.invalidateQueries(['getChats']);
            setActive(null);
        },
        onError: (error: any) => {
            toast.error(JSON.stringify(error.response?.data));
        }
    });

    // FUNCTIONS

    const handleNavigation = React.useCallback(() => {
       
        if (chat.type === 'GROUP') {
            navigate(`/message/settings/${chat.id}`)
        } else {
            navigate(`/profile/${chat?.otherUser?.userId}`);
        }
    }, [chat, navigate]);

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
    <HStack width='100%' height='100px' bg='white' shadow='sm' zIndex={5} paddingX='20px' justifyContent='space-between'>
        <HStack paddingRight='10px' spacing={[2, 6]}>
            <div className="block lg:hidden xl:hidden" onClick={() => setActive && setActive(null)}>
                <FiChevronLeft fontSize='30px' color='black' />
            </div>
            <Avatar 
                src={url()}
                name={name()}
                size='md'
            />
            {/* <ProfilePhoto image={url()} /> */}

            <VStack alignItems='flex-start'>
                <Text color='gray.600' size='md' cursor='pointer' onClick={handleNavigation}>{name()}</Text>
            </VStack>
        </HStack>

        <Menu>
            <MenuButton>
                <Text fontSize='lg'>
                    <FiAlertCircle fontSize='30px' color={COLORS.chasescrollBlue} />
                </Text>
            </MenuButton>
            <MenuList p='0px'>
                <MenuItem borderBottomWidth='1px' borderBottomColor='gray.200' height='50px' onClick={() => mutate()}>
                    <Text size='xs' color='red.500'>Leave Chat</Text>
                    { isLoading && <Spinner size='sm' colorScheme='red' marginLeft='10px'/> }
                </MenuItem>
                {/* <MenuItem height='50px'>
                    <Text size='xs' color='red.500'>Delete Group</Text>
                </MenuItem> */}
            </MenuList>
        </Menu>
    </HStack>
  )
}

export default ChatHeader
