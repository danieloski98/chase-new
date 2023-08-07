import { HStack, Text, VStack, Skeleton, Spacer, Avatar, Heading, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import React from 'react'
import PageWrapper from '../../../../components/PageWrapper'
import { useAuth } from '../../../../context/authContext'
import { FiChevronLeft, FiEdit, FiSearch, FiLogOut, FiSettings } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import httpService from '../../../../utils/httpService'
import { Chat, ChatMember } from '../../../../models/Chat'
import CONFIG from '../../../../config'
import { toast } from 'react-toastify'
import { COLORS } from '../../../../utils/colors'

const ActionChip = ({ icon, text, action  }: { icon: any, text: string, action: () => void }) => {
    
    return (
        <VStack width='70px' height='70px' borderRadius='10px' bg='white' shadow='md' cursor='pointer' justifyContent='center' alignItems='center'>
            {icon}
            <Text color={COLORS.chasescrollBlue} fontSize='md'>{text}</Text>
        </VStack>
    )
}


const MessageSettings = () => {
    const { userId } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate()
    const [chat, setChat] = React.useState<Chat | null>(null);
    const [members, setMembers] = React.useState<ChatMember[]>([]) 

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
        },
        onError: (error: any) => {
            toast.error(error.message);
        }
    });

  return (
    <PageWrapper>
        {() => (
            <VStack width='100%' height='100%' overflow='auto' paddingBottom={100}>

                {/* WIDTH  SETTING BOX */}
                <HStack width={['100%', '50%']} height='auto' px={['20px', '0px']} alignItems='flex-start' paddingBottom='40px'>

                    { isLoading && (
                        <VStack width='100%' height='100%'>
                            <Skeleton width='100%' height='100px' />
                            <Spacer height='20px' />

                            <Skeleton width='100%' height='300px' />
                            <Spacer height='20px' />

                            <Skeleton width='100%' height='400px' />
                            <Spacer height='20px' />
                        </VStack>
                    )}

                    { !isLoading && (
                       <VStack width='100%' height='100%'>
                            {/* HEADER */}
                            <HStack alignItems='center' width='100%' height='100px' bg='white' justifyContent='space-between'>
                                <HStack>
                                    <FiChevronLeft fontSize="30px" color='black' cursor='pointer' onClick={() => navigate(-1)} />
                                    <Text>Group info</Text>
                                </HStack>

                                { userId === chat?.createdBy.userId && (
                                    <FiEdit fontSize='30px' color="black" />
                                )}
                            </HStack>

                            <VStack alignContent='center' alignItems='center' width='100%' >
                                <Avatar 
                                    src={`${CONFIG.RESOURCE_URL}${chat?.image}`}
                                    name={chat?.name !== undefined ? chat?.name : ''}
                                    size='2xl'
                                />

                                <Heading size='lg' color='black'>{chat?.name || ''}</Heading>
                                { getMembers.isLoading && <Skeleton width='100%' height='150px' /> }
                                { !getMembers.isLoading && <HStack>
                                    <Text>{members.length} Member{members.length > 1 ? 's' : ''}</Text>
                                </HStack>}
                                
                                {/* SEARCH BOX */}
                                <InputGroup width={['100%', '60%']}>
                                    <InputLeftElement>
                                        <FiSearch color={COLORS.chasescrollBlue} fontSize='30px' />
                                    </InputLeftElement>
                                    <Input type='text' width='100%' height='45px' alignSelf='center' borderWidth='1px' borderColor='grey' />
                                </InputGroup>

                                {/* ACTIONS LISTS */}
                                <HStack marginTop='20px'>
                                    <ActionChip text='Exit' action={() => null} icon={<FiLogOut fontSize='20px' color={COLORS.chasescrollBlue} />} />
                                    <ActionChip text='Settings' action={() => null} icon={<FiSettings fontSize='20px' color={COLORS.chasescrollBlue} />} />
                                </HStack>

                                {/* MEMEBERS */}
                                <VStack width={['100%', '60%']} height='300PX' maxH='300px' borderWidth='1px' borderColor='grey' borderRadius={10} marginTop='20px' overflow='auto' paddingX='20px' > 
                                    {!getMembers.isLoading && members.length > 0 && [...members.filter((item) => item.role === 'CREATOR'), ...members.filter((item) => item.role === 'ADMIN') , ...members.filter((item) => item.role !== 'CREATOR')].map((item, i) => (
                                        <HStack borderBottomWidth={i === members.length - 1 ? 0:1} borderBottomColor='grey' paddingY='20px' key={i} width='100%' height='150px' justifyContent='space-between' alignItems='center' paddingX='20px'>
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

                                            <Text fontSize='sm' color='brand.chasescrollBlue'>{ item.role !== 'ADMIN' ? item.role !== 'CREATOR' ? 'Member' : 'Creator' : 'Admin'}</Text>
                                        </HStack>
                                    ))}
                                </VStack>
                                
                                {/* OPTIONS */}
                                 <VStack width={['100%', '60%']} height='auto' maxH='300px' borderWidth='1px' borderColor='grey' borderRadius={10} marginTop='20px' overflow='auto' paddingX='20px'  paddingY='20px'> 

                                    <HStack borderBottomWidth={1} borderBottomColor='grey' paddingY='20px' width='100%' height='30px' justifyContent='space-between' alignItems='center' paddingX='20px'>
                                        <HStack>
                                            <Text>Media Files</Text>
                                        </HStack>
                                    </HStack>

                                    <HStack borderBottomWidth={1} borderBottomColor='grey' paddingY='20px' width='100%' height='30px' justifyContent='space-between' alignItems='center' paddingX='20px'>
                                        <HStack>
                                            <Text color='red'>Clear Chat</Text>
                                        </HStack>
                                    </HStack>

                                    <HStack borderBottomWidth={1} borderBottomColor='grey' paddingY='20px' width='100%' height='30px' justifyContent='space-between' alignItems='center' paddingX='20px'>
                                        <HStack>
                                            <Text color='red'>Report Group</Text>
                                        </HStack>
                                    </HStack>

                                    <HStack paddingY='20px' width='100%' height='30px' justifyContent='space-between' alignItems='center' paddingX='20px'>
                                        <HStack>
                                            <Text color='red'>Delete Group</Text>
                                        </HStack>
                                    </HStack>

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
