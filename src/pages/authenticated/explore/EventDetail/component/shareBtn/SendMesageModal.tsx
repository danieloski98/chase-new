import React from 'react'
import { Modal, ModalOverlay, ModalCloseButton, ModalBody, ModalContent, Text, InputGroup, InputLeftElement, Input, HStack, Avatar, VStack, Heading, Checkbox, Box, Button, Spinner } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import useDebounce from '../../../../../../hooks/useDebounce'
import { useMutation, useQuery } from 'react-query'
import { useAuth } from '../../../../../../context/authContext'
import httpService from '../../../../../../utils/httpService'
import { IUser } from '../../../../../../models/User'
import CONFIG from '../../../../../../config'
import { Chat } from 'src/models/Chat'

const UserCard = (props: IUser & { checked: boolean, handleCheck: (e: string) => void }) => {
    const { username, userId, data: { imgMain: { value: imgMain } }, firstName, lastName } = props;
    return (
        <HStack width='100%' height={'60px'} justifyContent={'space-between'} paddingX='20px'>
            <HStack>
                <Avatar src={`${CONFIG.RESOURCE_URL}${imgMain}`} size='sm' name={`${firstName} ${lastName}`} />
                <VStack alignItems={'flex-start'} spacing={0}>
                    <Heading fontSize={'16px'} color='black'>{firstName || ''}</Heading>
                    <Text color='grey' fontSize={'14px'}>@{username || ''}</Text>
                </VStack>
            </HStack>

            <Checkbox isChecked={props.checked} onChange={(e) => props.handleCheck(userId)} />
        </HStack>
    )
}

function SendMesageModal({ isOpen, onClose, id }: {
    isOpen: boolean,
    onClose: () => void,
    id: string
}) {
    const [search, setSearch] = React.useState('');
    const searchText = useDebounce(search, 1000);
    const [users, setUsers] = React.useState<IUser[]>([]);
    const [userIds, setUserIds] = React.useState<string[]>([]);

    const { userId } = useAuth();


    const { isLoading, isError } = useQuery(['getUserFriends', searchText, userId], () => httpService.get(`/user/get-users-connections/${userId}`, {
        params: {
            searchText
        }
    }), {
        onSuccess: (data) => {
            setUsers(data?.data);
            console.log(data?.data);
        }
    } );

    const { isLoading: chatCreationLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpService.post(`/chat/chat`, data),
        onSuccess: (data) => {
            const  chat = data?.data as Chat;
            const obj = {
                message: `${import.meta.env.VITE_DOMAIN}event/${id}`,
                chatID: chat?.id,
            }
            sendMessage.mutate(obj)
        }

    });

    const sendMessage = useMutation({
        mutationFn: (data: any) => httpService.post(`/chat/message`, data),
        onSuccess: (data) => {
            alert('done')
        }
    });

    const handleShare = () => {
        userIds.forEach((idd) => {
            mutate({ 
                type: 'ONE_TO_ONE',
                typeID: userId,
                name: idd,
                users: [
                    idd
                ]
             });
        })
    }

    const handleCheck = (iem: string) => {
        if (userIds.includes(iem)) {
            setUserIds(userIds.filter((id) => id !== iem));
        } else {
            setUserIds([...userIds, iem]);
        }
    }
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} closeOnEsc closeOnOverlayClick isCentered size='md'>
        <ModalOverlay />
        <ModalContent borderRadius={'10px'} overflow='hidden' background='white' padding='0px'>
            <ModalCloseButton />
            <ModalBody paddingX='0px' paddingY='0px'>
                <Text textAlign={'center'}>Share with friends</Text>
                <InputGroup marginY='20px' borderLeftWidth={'0px'} borderRightWidth={'0px'} borderRadius={'0px'} borderTopWidth='0.5px' borderBottomWidth={'0.5px'} borderTopColor={'lightgrey'} borderBottomColor='lightgrey' >
                    <InputLeftElement>
                        <FiSearch color='grey' fontSize='20px' />
                    </InputLeftElement>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} borderWidth={'0px'} borderRadius={'10px'} />
                </InputGroup>

                <Box width='100%' height='220px' overflowY='auto'>
                    {
                        isLoading && (
                            <VStack width='100%' justifyContent={'center'} alignItems={'center'}>
                                <Spinner size='md' colorScheme='blue' />
                            </VStack>
                        )
                    }
                    { !isLoading && !isError && users.length > 0 && users.map((item, index) => (
                        <UserCard {...item} checked={userIds.includes(item.userId)} handleCheck={(e) => handleCheck(e)} key={index.toString()} />
                    ))}
                    {
                        !isLoading && isError && (
                            <Text> An error occured while getting your friends list.</Text>
                        )
                    }
                    {
                        !isLoading && !isError && users.length === 0 && (
                            <VStack width='100%' justifyContent={'center'} alignItems={'center'}>
                                <Text>You have no friends to share with, start connecting now!</Text>
                            </VStack>
                        )
                    }
                </Box>
                <Box paddingX={'20px'} shadow='lg' bg='white' paddingTop={'20px'} zIndex={10} paddingBottom={'20px'} borderTopWidth={'0.5px'} borderTopColor={'lightgrey'}>
                    <Button onClick={handleShare} disabled={userIds.length === 0} isLoading={chatCreationLoading || sendMessage.isLoading} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'}>Share</Button>
                </Box>
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default SendMesageModal