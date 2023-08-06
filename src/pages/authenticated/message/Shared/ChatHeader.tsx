import React from 'react';
import { HStack, Heading, Text, VStack, Menu, MenuButton, MenuList, MenuItem, Spinner } from '@chakra-ui/react';
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
import { LEAVE_GROUP } from '../../../../constants/endpoints.constant';
import { toast } from 'react-toastify';
import { Chat } from 'src/models/Chat';


interface IProps {
    chat: Chat;
    setActive: (data: Chat| null) => void
}

const ChatHeader = ({ chat, setActive }: IProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { userId } = useAuth();
    const { isLoading, mutate } = useMutation({
        mutationFn: () => httpService.delete(`${LEAVE_GROUP}?groupID=${chat.id}&userID=${userId}`),
        onSuccess: () => {
            toast.success('Action successful');
            queryClient.invalidateQueries(['getJoinedGroups']);
            setActive(null);
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
            if (chat.image) {
                return `${CONFIG.RESOURCE_URL}${chat.image}`;
            }
            return `https://ui-avatars.com/api/?background=random&name=${chat?.name}&length=1`;

        }else {
            if (chat.otherUser.data.imgMain.value) {
                return `${chat.otherUser.firstName} ${chat.otherUser.lastName}`;
            }
            return `https://ui-avatars.com/api/?background=random&name=${chat?.name}&length=1`;
        }
    }, [chat]);

    const name = React.useCallback(() => {
        if (chat.type === 'GROUP') {
            return `${chat.name[0].toUpperCase()}${chat.name.substring(1, chat.name.length)}`
        }else {
            return `${chat.otherUser.username[0].toUpperCase()}${chat.otherUser.username.substring(1, chat.otherUser.username.length)}`;
        }
    }, [chat]);
  return (
    <HStack width='100%' height='100px' bg='white' shadow='sm' zIndex={5} paddingX='20px' justifyContent='space-between'>
        <HStack paddingRight='10px' spacing={[2, 6]}>
            <div className="block lg:hidden xl:hidden" onClick={() => setActive && setActive(null)}>
                <FiChevronLeft fontSize='30px' color='black' />
            </div>
            <ProfilePhoto image={url()} />

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
                    <Text size='xs' color='red.500'>Exit community</Text>
                    { isLoading && <Spinner size='sm' colorScheme='red' marginLeft='10px'/> }
                </MenuItem>
                <MenuItem height='50px'>
                    <Text size='xs' color='red.500'>Report community</Text>
                </MenuItem>
            </MenuList>
        </Menu>
    </HStack>
  )
}

export default ChatHeader
