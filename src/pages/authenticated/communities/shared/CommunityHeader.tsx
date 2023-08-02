import { HStack, Heading, Text, VStack, Menu, MenuButton, MenuList, MenuItem, Spinner } from '@chakra-ui/react';
import ProfilePhoto from '../../../../components/ProfilePhoto';
import CONFIG from '../../../../config';
import { ICommunity } from '../../../../models/Communitty';
import { FiAlertCircle, FiChevronLeft } from 'react-icons/fi'
import { COLORS } from '../../../../utils/colors';
import { Link } from 'react-router-dom'
import { PATH_NAMES } from '../../../../constants/paths.constant';
import { useAuth } from '../../../../context/authContext';
import { useMutation, useQueryClient } from 'react-query';
import httpService from '../../../../utils/httpService';
import { LEAVE_GROUP } from '../../../../constants/endpoints.constant';
import { toast } from 'react-toastify';


interface IProps {
    community: ICommunity;
    setActive: (data: ICommunity| null) => void
}

const CommunityHeader = ({ community, setActive }: IProps) => {
    const queryClient = useQueryClient();
    const { userId } = useAuth();
    const { isLoading, mutate } = useMutation({
        mutationFn: () => httpService.delete(`${LEAVE_GROUP}?groupID=${community.id}&userID=${userId}`),
        onSuccess: () => {
            toast.success('Action successful');
            queryClient.invalidateQueries(['getJoinedGroups']);
            setActive(null);
        }
    });
  return (
    <HStack width='100%' height='100px' bg='white' shadow='sm' zIndex={5} paddingX='20px' justifyContent='space-between'>
        <HStack paddingRight='10px' spacing={[2, 6]}>
            <div className="block lg:hidden xl:hidden" onClick={() => setActive && setActive(null)}>
                <FiChevronLeft fontSize='30px' color='black' />
            </div>
            <ProfilePhoto image={community.data?.imgSrc === "string" || !community.data?.imgSrc ? `https://ui-avatars.com/api/?background=random&name=${community?.data?.name}&length=1` : `${CONFIG.RESOURCE_URL}${community?.data?.imgSrc}`} />

            <VStack alignItems='flex-start'>
                <Link
                    to={`${PATH_NAMES.communityInfo}/${community.id}`}
                >
                    <Heading size='md' as='h4'>{community.data.name}</Heading>
                </Link>
                <Text color='gray.400' size='md'>{community.data.memberCount} Members</Text>
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

export default CommunityHeader
