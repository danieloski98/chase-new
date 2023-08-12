import { HStack, Text, VStack, Skeleton, Spacer, Avatar, Heading, InputGroup, InputLeftElement, Input, Spinner } from '@chakra-ui/react'
import React from 'react'
import PageWrapper from '../../../../components/PageWrapper'
import { useAuth } from '../../../../context/authContext'
import { FiChevronLeft, FiEdit, FiSearch, FiLogOut, FiPlus } from 'react-icons/fi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import httpService from '../../../../utils/httpService'
import { Chat, ChatMember } from '../../../../models/Chat'
import CONFIG from '../../../../config'
import { toast } from 'react-toastify'
import { COLORS } from '../../../../utils/colors'
import UsersModal from './UsersModal'
import useInfinteScroller from '../../../../hooks/useInfinteScroller'
import UserCard from './UserCard'
import EditModal from './EditModal'

const ActionChip = ({ icon, text, action, isLoading = false }: { icon: any, text: string, action: () => void, isLoading?: boolean }) => {

    return (
        <VStack onClick={() => action()} width='85px' height='85px' borderRadius='10px' bg='white' shadow='md' cursor='pointer' justifyContent='center' alignItems='center'>
            {icon}
            {!isLoading && <Text color={COLORS.chasescrollBlue} fontSize='md'>{text}</Text>}
            {isLoading && <Spinner />}
        </VStack>
    )
}


const MessageSettings = () => {
    const { userId } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [chat, setChat] = React.useState<Chat | null>(null);
    const [members, setMembers] = React.useState<ChatMember[]>([]);
    const [memberId, setMembersId] = React.useState<string[]>([]);
    const [creator, setCreator] = React.useState<ChatMember | null>(null);
    const [addUsers, setAddUsers] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [search, setSearch] = React.useState('');
    const [showEdit, setShowEdit] = React.useState(false);

    const { isLoading } = useQuery(['getGroupInfo', id], () => httpService.get(`/chat/chat`, {
        params: {
            chatID: id,
            page: 0,
        }
    }), {
        onSuccess: (data) => {
            setChat(data.data.content[0])
        }
    });

    const getMembers = useQuery(['getChatMembers', id], () => httpService.get(`/chat/chat-members`, {
        params: {
            chatID: id,
            type: 'GROUP',
        }
    }), {
        onSuccess: (data) => {
            setMembers(data.data.content);
            const members: ChatMember[] = data.data.content;
            const arr = [...memberId];
            data.data.content.map((item: ChatMember) => {
                arr.push(item.user.userId);
            });
            setMembersId(arr);
            const creatorArr = members.filter((item) => item.role === 'CREATOR');
            setCreator(creatorArr[0]);
        },
        onError: (error: any) => {
            toast.error(error.message);
        }
    });


    const { isLoading: deleteLoading, mutate } = useMutation({
        mutationFn: () => httpService.delete(`/chat/chat?chatID=${chat?.id}`),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['getGroupInfo'])
            navigate(-1);
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error.message);
        }
    });

    const { isLoading: lchatLoading, mutate: leaveChat } = useMutation({
        mutationFn: () => httpService.delete(`/chat/leave-chat?chatID=${chat?.id}`),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['getGroupInfo'])
            navigate(-1);
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error.message);
        }
    });

    const { results, lastChildRef, isLoading: membersIsLoading } = useInfinteScroller<ChatMember>({ url: `/chat/chat-members?chatID=${id}`, pageNumber: page, setPageNumber: setPage });

    const memmbers = results.filter((item) => {
        if (search === '') {
            return item;
        }
        if (item.user.firstName.toLowerCase().includes(search.toLowerCase()) || item.user.lastName.toLowerCase().includes(search.toLowerCase()) || item.user.username.toLowerCase().includes(search.toLowerCase())) {
            return item;
        }
    }).map((item, index) => {
        if (index === results.length - 1) {
            const user: string = userId as any;
            return (
                <UserCard ref={lastChildRef} item={item} dataLength={results.length} chatID={chat?.id as string} creator={creator as ChatMember} index={index} userId={user} key={index.toString()}  />
            )
        } else {
            const user: string = userId as any;
            return (
                <UserCard ref={lastChildRef} item={item} dataLength={results.length} chatID={chat?.id as string} creator={creator as ChatMember} index={index} userId={user} key={index.toString()}  />
            )
        }
    })

    return (
        <PageWrapper>
            {() => (
                <VStack width='100%' height='100%' overflow='auto' paddingBottom={100}>
                    {/* USER SELECTION MODAL */}
                    <UsersModal isOpen={addUsers} onClose={() => setAddUsers(false)} members={memberId} />

                    {/* CHAT MODAL */}
                    { chat && <EditModal isOpen={showEdit} onClose={() => setShowEdit(false)} chat={chat as Chat} /> }

                    {/* WIDTH  SETTING BOX */}
                    <HStack width={['100%', '50%']} height='auto' px={['20px', '0px']} alignItems='flex-start' paddingBottom='40px'>

                        {isLoading && (
                            <VStack width='100%' height='100%'>
                                <Skeleton width='100%' height='100px' />
                                <Spacer height='20px' />

                                <Skeleton width='100%' height='300px' />
                                <Spacer height='20px' />

                                <Skeleton width='100%' height='400px' />
                                <Spacer height='20px' />
                            </VStack>
                        )}

                        {!isLoading && (
                            <VStack width='100%' height='100%'>
                                {/* HEADER */}
                                <HStack alignItems='center' width='100%' height='100px' bg='white' justifyContent='space-between'>
                                    <HStack>
                                        <FiChevronLeft fontSize="30px" color='black' cursor='pointer' onClick={() => navigate(-1)} />
                                        <Text>Group info</Text>
                                    </HStack>

                                    {userId === chat?.createdBy.userId && (
                                        <FiEdit fontSize='30px' color="black" className='cursor-pointer' onClick={() => setShowEdit(true)} />
                                    )}
                                </HStack>

                                <VStack alignContent='center' alignItems='center' width='100%' >
                                    <Avatar
                                        src={`${CONFIG.RESOURCE_URL}${chat?.image}`}
                                        name={chat?.name !== undefined ? chat?.name : ''}
                                        size='2xl'
                                    />

                                    <Heading size='lg' color='black'>{chat?.name || ''}</Heading>
                                    {getMembers.isLoading && <Skeleton width='100%' height='150px' />}
                                    {!getMembers.isLoading && <HStack>
                                        <Text>{members.length} Member{members.length > 1 ? 's' : ''}</Text>
                                    </HStack>}

                                    {/* SEARCH BOX */}
                                    <InputGroup width={['100%', '60%']}>
                                        <InputLeftElement>
                                            <FiSearch color={COLORS.chasescrollBlue} fontSize='30px' />
                                        </InputLeftElement>
                                        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search by username' type='text' width='100%' height='45px' alignSelf='center' borderWidth='1px' borderColor='grey' />
                                    </InputGroup>

                                    {/* ACTIONS LISTS */}
                                    <HStack marginTop='20px'>
                                        <ActionChip text='Exit' action={() => leaveChat()} icon={<FiLogOut fontSize='20px' color={COLORS.chasescrollBlue} />} isLoading={lchatLoading} />
                                        <ActionChip text='Add User' action={() => setAddUsers(true)} icon={<FiPlus fontSize='20px' color={COLORS.chasescrollBlue} />} />
                                    </HStack>

                                    {/* MEMEBERS */}
                                    <VStack width={['100%', '60%']} height='300PX' maxH='300px' borderWidth='1px' borderColor='grey' borderRadius={10} marginTop='20px' overflow='auto' paddingX='20px' >
                                        { !membersIsLoading && memmbers.length > 0 && memmbers }
                                        { membersIsLoading && <VStack>
                                                <Spinner color='brand.chasescrollBlue' size='sm' />
                                                <Text>Loading More</Text>
                                            </VStack>}
                                        {/* {!getMembers.isLoading && members.length > 0 && [...members.filter((item) => item.role === 'CREATOR'), ...members.filter((item) => item.role === 'ADMIN'), ...members.filter((item) => item.role !== 'CREATOR')].map((item, i) => (
                                            <HStack borderBottomWidth={i === members.length - 1 ? 0 : 1} borderBottomColor='grey' paddingY='20px' key={i} width='100%' height='150px' justifyContent='space-between' alignItems='center' paddingX='20px'>
                                                <HStack>
                                                    <Avatar
                                                        src={`${CONFIG.RESOURCE_URL}${item?.user?.data.imgMain?.value}`}
                                                        name={`${item?.user?.firstName} ${item?.user?.lastName}`}
                                                        size='md'
                                                    />
                                                    <VStack>
                                                        <Text>{item?.user.firstName} {item?.user.lastName}</Text>
                                                        <Text>{item?.user.data.about?.value}</Text>
                                                    </VStack>
                                                </HStack>

                                                {item.role === 'CREATOR' || item.role === 'ADMIN' && (
                                                    <Text fontSize='sm' color='brand.chasescrollBlue'>{item.role !== 'ADMIN' ? item.role !== 'CREATOR' ? 'Member' : 'Creator' : 'Admin'}</Text>
                                                )}
                                                {
                                                    userId === creator?.user.userId && (
                                                        <>
                                                            {!memberLoading && <FiTrash color='red' fontSize={25} className='cursor-pointer' onClick={() => deleteMember(item.user.userId)} />}
                                                            {memberLoading && <Spinner />}
                                                        </>
                                                    )
                                                }
                                            </HStack>
                                        ))} */}
                                    </VStack>

                                    {/* OPTIONS */}
                                    <VStack width={['100%', '60%']} height='auto' maxH='300px' borderWidth='1px' borderColor='grey' borderRadius={10} marginTop='20px' overflow='auto' paddingX='20px' paddingY='20px'>

                                        {/* <HStack borderBottomWidth={1} borderBottomColor='grey' paddingY='20px' width='100%' height='30px' justifyContent='space-between' alignItems='center' paddingX='20px'>
                                        <HStack>
                                            <Text>Media Files</Text>
                                        </HStack>
                                    </HStack> */}

                                        {/* <HStack borderBottomWidth={1} borderBottomColor='grey' paddingY='20px' width='100%' height='30px' justifyContent='space-between' alignItems='center' paddingX='20px'>
                                        <HStack>
                                            <Text color='red'>Clear Chat</Text>
                                        </HStack>
                                    </HStack> */}

                                        <HStack borderBottomWidth={1} borderBottomColor='grey' paddingY='20px' width='100%' height='30px' justifyContent='space-between' alignItems='center' paddingX='20px'>
                                            <HStack cursor='pointer' onClick={() => navigate(`/home/report/${chat?.id}`)}>
                                                <Text color='red'>Report Group</Text>
                                            </HStack>
                                        </HStack>

                                        {
                                            userId === creator?.user.userId && (
                                                <HStack cursor='pointer' onClick={() => mutate()} paddingY='20px' width='100%' height='30px' justifyContent='space-between' alignItems='center' paddingX='20px'>
                                                    <HStack>
                                                        {!deleteLoading && <Text color='red'>Delete Group</Text>}
                                                        {deleteLoading && <Spinner />}
                                                    </HStack>
                                                </HStack>
                                            )
                                        }

                                    </VStack>


                                </VStack>
                            </VStack>
                        )}


                    </HStack>

                </VStack>
            )}
        </PageWrapper>
    )
}

export default MessageSettings
