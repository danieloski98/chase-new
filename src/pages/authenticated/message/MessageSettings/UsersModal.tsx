import React from 'react'
import { Modal, ModalOverlay, ModalBody, ModalContent, ModalCloseButton, ModalHeader, Heading, InputGroup, InputLeftElement, Input, HStack, VStack, Avatar, Text, Checkbox, Button } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import useDebounce from '../../../../hooks/useDebounce'
import httpService from '../../../../utils/httpService';
import { ADD_MEMBER, GET_USER_CONNECTION_LIST } from '../../../../constants/endpoints.constant';
import { useAuth } from '../../../../context/authContext';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IUser } from '../../../../models/User';
import CONFIG from '../../../../config';
import { COLORS } from '../../../../utils/colors';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// https://www.youtube.com/watch?v=spoqNuxwxFo

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    members: string[];
}


function UsersModal({ isOpen, onClose, members }: IProps) {
    const { userId } = useAuth();
    const { id } = useParams();
    const queryClient = useQueryClient();
    
    const [selected, setSelected] = React.useState<string[]>([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const search = useDebounce(searchQuery, 500);
    const [connections, setConnection] = React.useState<IUser[]>([]);

    React.useEffect(() => {
        return () => {
            setSelected([]);
        }
    }, [])


    const getConnections = useQuery(['getConnections', userId, search], () => httpService.get(`${GET_USER_CONNECTION_LIST}/${userId}`, {
        params: {
            searchText: search
        }
    }), {
        onSuccess: (data) => {
            setConnection(data.data);
        },
        onError: (error: any) => {
            console.log(error);
        },
    });

    const { isLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpService.post(`${ADD_MEMBER}`, data),
        onSuccess: (data) => {
            toast.success(`Users added to group chat`);
            queryClient.invalidateQueries(['getChatMembers'])
            onClose();
        },
        onError: (error: any) => {
            toast.error(JSON.stringify(error));
        }
    });

    const handleSelected = React.useCallback((id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((item) => item !== id));
        } else {
            setSelected([...selected, id]);
        }
    }, [selected]);

    const handleSubmit = React.useCallback(() => {
        if (selected.length < 1) {
            toast.warning('you have to select at least one userr');
            return;
        }
        const obj = {
            users: selected,
            chatID: id
        }
        mutate(obj)
    }, [id, mutate, selected])

    const close = React.useCallback(() => {
        setSelected([]);
        setSearchQuery('');
        onClose();
    }, [onClose])
  return (
    <Modal isOpen={isOpen} onClose={close} isCentered closeOnEsc size='xl'>
        <ModalOverlay />
        <ModalContent>
            <ModalCloseButton />
            <ModalHeader>
                <Heading size='md'>Add new user to the group chat</Heading>
            </ModalHeader>
            <ModalBody paddingBottom='20px'>
                <InputGroup width='100%' height='50px'>
                    <InputLeftElement paddingTop='10px'>
                        <FiSearch fontSize='20px' />
                    </InputLeftElement>
                    <Input value={searchQuery} placeholder='Search by username' onChange={(e) => setSearchQuery(e.target.value)} height='100%' />
                </InputGroup>

                {/* SELECTED USERS COLUMN */}
                {
                    selected.length > 0 && (
                        <HStack width='100%' height='90px' overflow={'auto'} alignItems='center' >
                            {
                            [...connections.filter((item) => selected.includes(item.userId))].map((item) => (
                                <HStack key={item.userId} marginLeft='20px' minWidth='210' height='50px' borderRadius='25px' backgroundColor='whitesmoke' padding='20px'>
                                    <Avatar 
                                        src={`${CONFIG.RESOURCE_URL}${item?.data?.imgMain?.value}`}
                                        name={`${item.firstName} ${item.lastName}`}
                                        size='sm'
                                    />
                                    <VStack  alignItems='flex-start' spacing={-2}>
                                            <Text>{item.firstName} {item.lastName}</Text>
                                            <Text size=''>@{item.username}</Text>
                                        </VStack>
                                </HStack>
                            ))
                            }
                        </HStack>
                    )
                }

                {/* USERS LIST */}
                <VStack alignItems='flex-start' width='100%' height={`300px`} overflow='auto' paddingBottom='30px'>
                    {connections.filter((item) => !members.includes(item.userId)) .map((item, index) => (
                        <HStack key={index.toString()} width='100%' paddingRight='20px' marginY='10px' justifyContent='space-between'>
                            <HStack>
                                <Avatar 
                                    src={`${CONFIG.RESOURCE_URL}${item?.data?.imgMain?.value}`}
                                    name={`${item.firstName} ${item.lastName}`}
                                    size='md'
                                />
                                <VStack  alignItems='flex-start' spacing={-2}>
                                    <Text>{item.firstName} {item.lastName}</Text>
                                    <Text>@{item.username}</Text>
                                </VStack>
                            </HStack>

                            <Checkbox checked={selected.includes(item.userId)} onChange={() => handleSelected(item.userId)} />
                        </HStack>
                    ))}
                </VStack>

                <Button isLoading={isLoading} onClick={handleSubmit} type='button' width='100%' height='50px' color='white' backgroundColor={COLORS.chasescrollBlue}>Submit</Button>

            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default UsersModal