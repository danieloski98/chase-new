import { HStack, VStack, Spinner, Text, Avatar } from '@chakra-ui/react';
import React from 'react'
import { FiTrash } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import CONFIG from '../../../../config';
import { ChatMember } from '../../../../models/Chat';
import httpService from '../../../../utils/httpService';
import { Link } from 'react-router-dom';

interface IProps {
    dataLength: number;
    item: ChatMember;
    index: number;
    userId: string;
    creator: ChatMember;
    chatID: string
}

const UserCard = React.forwardRef<any, IProps>(({index, item, dataLength, userId, creator, chatID}, ref) => {
    const queryClient = useQueryClient();
    const { isLoading: memberLoading, mutate: deleteMember } = useMutation({
        mutationFn: (data: string) => httpService.delete(`/chat/delete-chat-member`, {
            params: {
                chatID,
                chatMemberrs: [data],
            }
        }),
        onSuccess: (data) => {
            toast.success(`Member removed`);
            queryClient.invalidateQueries(['getChatMembers'])
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error.message);
        }
    });
    return (
        <HStack ref={ref} borderBottomWidth={index === dataLength - 1 ? 0 : 1} borderBottomColor='grey' paddingY='20px' key={index} width='100%' height='150px' justifyContent='space-between' alignItems='center' paddingX='20px'>
        <HStack>
            <Avatar
                src={`${CONFIG.RESOURCE_URL}${item?.user?.data.imgMain?.value}`}
                name={`${item?.user?.firstName} ${item?.user?.lastName}`}
                size='md'
            />
            <VStack>
               <Link to={`/profile/${item.user.userId}`}>
                <Text>{item?.user.firstName} {item?.user.lastName}</Text>
               </Link>
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
    )
});

export default UserCard